import { COMPLIANCE_DOCUMENTS, type WizardPayload } from "@/lib/data/wizard"
import { APPLICATION_FEES, REVIEW_STAGES } from "@/lib/data/review"
import {
  DEMO_USER,
  SESSION_EVENT,
  type SessionUser,
  type StoredApplication,
  normalizeApplication,
  readApplications,
  writeApplications,
} from "@/lib/session"

export const WORKSPACE_STORAGE_KEY = "ecg-vendor-workspace"

export type WorkspaceDocument = {
  id: string
  name: string
  category: string
  applicationId?: string
  uploadedAt: string
  sizeLabel: string
}

export type WorkspaceCertificate = {
  id: string
  applicationId: string
  type: "classification" | "external-license"
  number: string
  classLabel: string
  issuedOn: string
  expiresOn: string
  status: "active" | "expiring-soon" | "expired"
}

export type WorkspacePayment = {
  id: string
  applicationId: string
  reference: string
  description: string
  amount: number
  status: "due" | "paid"
  dueOn: string
  paidOn?: string
  method?: string
}

export type TeamMember = {
  id: string
  name: string
  email: string
  role: "Administrator" | "Preparer" | "Viewer"
  status: "active" | "invited"
}

export type WorkspaceNotification = {
  id: string
  title: string
  body: string
  href?: string
  read: boolean
  createdAt: string
}

export type WorkspaceSettings = {
  emailNotifications: boolean
  smsAlerts: boolean
}

export type Workspace = {
  seeded: boolean
  documents: WorkspaceDocument[]
  certificates: WorkspaceCertificate[]
  payments: WorkspacePayment[]
  team: TeamMember[]
  notifications: WorkspaceNotification[]
  settings: WorkspaceSettings
}

const EMPTY_WORKSPACE: Workspace = {
  seeded: false,
  documents: [],
  certificates: [],
  payments: [],
  team: [],
  notifications: [],
  settings: { emailNotifications: true, smsAlerts: false },
}

let cachedWorkspaceRaw: string | null | undefined
let cachedWorkspace: Workspace = EMPTY_WORKSPACE

export function readWorkspace(): Workspace {
  if (typeof window === "undefined") {
    return EMPTY_WORKSPACE
  }

  const raw = window.localStorage.getItem(WORKSPACE_STORAGE_KEY)
  if (raw === cachedWorkspaceRaw) {
    return cachedWorkspace
  }

  cachedWorkspaceRaw = raw
  if (!raw) {
    cachedWorkspace = EMPTY_WORKSPACE
    return cachedWorkspace
  }

  try {
    cachedWorkspace = { ...EMPTY_WORKSPACE, ...(JSON.parse(raw) as Workspace) }
  } catch {
    cachedWorkspace = EMPTY_WORKSPACE
  }

  return cachedWorkspace
}

export function writeWorkspace(workspace: Workspace) {
  cachedWorkspace = workspace
  cachedWorkspaceRaw = JSON.stringify(workspace)
  window.localStorage.setItem(WORKSPACE_STORAGE_KEY, cachedWorkspaceRaw)
  window.dispatchEvent(new Event(SESSION_EVENT))
}

function patchWorkspace(partial: Partial<Workspace>) {
  writeWorkspace({ ...readWorkspace(), ...partial, seeded: true })
}

export function nextApplicationReference() {
  const count = readApplications().length + 1240
  return `APP-2026-${String(count).padStart(4, "0")}`
}

export function loadDemoWorkspace(user: SessionUser) {
  writeApplications(buildDemoApplications(user))
  writeWorkspace(buildDemoWorkspace(user, readApplications()))
}

export function ensureDemoWorkspace(user: SessionUser | null) {
  const workspace = readWorkspace()
  if (workspace.seeded) {
    return
  }

  const account = user ?? DEMO_USER
  if (readApplications().length === 0) {
    writeApplications(buildDemoApplications(account))
    writeWorkspace(buildDemoWorkspace(account, readApplications()))
    return
  }

  writeWorkspace({
    ...EMPTY_WORKSPACE,
    seeded: true,
    team: [
      {
        id: "user-self",
        name: account.contactName,
        email: account.email,
        role: "Administrator",
        status: "active",
      },
    ],
  })
}

export function recordApplicationSubmission(application: StoredApplication) {
  const payload = application.payload as Partial<WizardPayload>
  const now = new Date().toISOString()
  const workspace = readWorkspace()
  const documents = Object.entries(payload.documents ?? {}).map(([key, fileName]) => {
    const meta = COMPLIANCE_DOCUMENTS.find((item) => item.id === key)
    return {
      id: `${application.id}-${key}`,
      name: fileName,
      category: meta?.title ?? key,
      applicationId: application.id,
      uploadedAt: now,
      sizeLabel: "1.2 MB",
    } satisfies WorkspaceDocument
  })
  const fee = APPLICATION_FEES[application.type] ?? 1500
  const payment: WorkspacePayment = {
    id: `pay-${application.id}`,
    applicationId: application.id,
    reference: `INV-${application.reference}`,
    description: `${application.title} processing fee`,
    amount: fee,
    status: "due",
    dueOn: now,
  }
  const notification: WorkspaceNotification = {
    id: `ntf-${application.id}`,
    title: "Application submitted",
    body: `${application.reference} is in the ECG review queue.`,
    href: `/app/applications/${application.id}`,
    read: false,
    createdAt: now,
  }

  patchWorkspace({
    documents: [...documents, ...workspace.documents.filter((item) => item.applicationId !== application.id)],
    payments: [payment, ...workspace.payments.filter((item) => item.applicationId !== application.id)],
    notifications: [notification, ...workspace.notifications],
  })
}

export function advanceApplicationReview(applicationId: string) {
  const applications = readApplications()
  const index = applications.findIndex((item) => item.id === applicationId)
  if (index < 0) {
    return null
  }

  const current = applications[index]
  if (current.status === "approved" || current.status === "rejected" || current.status === "draft") {
    return current
  }

  const nextStage = Math.min(current.reviewStage + 1, REVIEW_STAGES.length)
  const stage = REVIEW_STAGES[Math.min(nextStage, REVIEW_STAGES.length) - 1]
  const now = new Date().toISOString()
  const next: StoredApplication = {
    ...current,
    reviewStage: nextStage,
    status: nextStage >= REVIEW_STAGES.length ? "approved" : "under-review",
    updatedAt: now,
    reviewHistory: [
      ...current.reviewHistory,
      {
        title: stage.title,
        actor: nextStage >= 3 ? "ECG Technical Desk" : "ECG Registry",
        at: now,
        note: `${stage.title} completed in this prototype.`,
      },
    ],
  }

  applications[index] = next
  writeApplications(applications)

  if (next.status === "approved") {
    issueCertificate(next)
  } else {
    const workspace = readWorkspace()
    patchWorkspace({
      notifications: [
        {
          id: `ntf-stage-${next.id}-${nextStage}`,
          title: `${next.reference} moved to ${stage.title}`,
          body: stage.description,
          href: `/app/applications/${next.id}`,
          read: false,
          createdAt: now,
        },
        ...workspace.notifications,
      ],
    })
  }

  return next
}

function issueCertificate(application: StoredApplication) {
  if (application.type === "supplier") {
    const workspace = readWorkspace()
    patchWorkspace({
      notifications: [
        {
          id: `ntf-approved-${application.id}`,
          title: "Supplier registration approved",
          body: `${application.reference} is now on the ECG vendor list.`,
          href: `/app/applications/${application.id}`,
          read: false,
          createdAt: new Date().toISOString(),
        },
        ...workspace.notifications,
      ],
    })
    return
  }

  const issuedOn = new Date()
  const expiresOn = new Date(issuedOn)
  expiresOn.setFullYear(expiresOn.getFullYear() + 1)
  const numberPrefix = application.type === "classification" ? "CLF" : "EXT"
  const certificate: WorkspaceCertificate = {
    id: `cert-${application.id}`,
    applicationId: application.id,
    type: application.type,
    number: `${numberPrefix}-2026-${application.reference.slice(-4)}`,
    classLabel:
      application.type === "classification" ? "Class A / Electrical" : "External Electrical Licence",
    issuedOn: issuedOn.toISOString(),
    expiresOn: expiresOn.toISOString(),
    status: "active",
  }
  const workspace = readWorkspace()
  patchWorkspace({
    certificates: [certificate, ...workspace.certificates.filter((item) => item.applicationId !== application.id)],
    notifications: [
      {
        id: `ntf-cert-${application.id}`,
        title: "Certificate issued",
        body: `${certificate.number} is ready to download.`,
        href: "/app/certificates",
        read: false,
        createdAt: issuedOn.toISOString(),
      },
      ...workspace.notifications,
    ],
  })
}

export function addWorkspaceDocument(document: WorkspaceDocument) {
  const workspace = readWorkspace()
  patchWorkspace({ documents: [document, ...workspace.documents] })
}

export function payInvoice(paymentId: string, method: string) {
  const workspace = readWorkspace()
  const paidOn = new Date().toISOString()
  patchWorkspace({
    payments: workspace.payments.map((item) =>
      item.id === paymentId ? { ...item, status: "paid", paidOn, method } : item,
    ),
    notifications: [
      {
        id: `ntf-pay-${paymentId}`,
        title: "Payment received",
        body: "Your mocked invoice has been marked as paid.",
        href: "/app/payments/history",
        read: false,
        createdAt: paidOn,
      },
      ...workspace.notifications,
    ],
  })
}

export function inviteTeamMember(member: Omit<TeamMember, "id" | "status">) {
  const workspace = readWorkspace()
  patchWorkspace({
    team: [
      { ...member, id: `user-${Date.now()}`, status: "invited" },
      ...workspace.team,
    ],
  })
}

export function saveWorkspaceSettings(settings: WorkspaceSettings) {
  patchWorkspace({ settings })
}

export function markNotificationsRead() {
  const workspace = readWorkspace()
  patchWorkspace({
    notifications: workspace.notifications.map((item) => ({ ...item, read: true })),
  })
}

export function addNotification(notification: Omit<WorkspaceNotification, "id" | "read" | "createdAt">) {
  const workspace = readWorkspace()
  patchWorkspace({
    notifications: [
      {
        ...notification,
        id: `ntf-${Date.now()}`,
        read: false,
        createdAt: new Date().toISOString(),
      },
      ...workspace.notifications,
    ],
  })
}

function demoCompany(user: SessionUser): WizardPayload["company"] {
  return {
    companyName: user.companyName,
    email: user.email,
    registrationNumber: user.registrationNumber ?? "CS123456789",
    phone: user.phone.replace(/^\+233/, ""),
    dateOfIncorporation: "2018-03-15",
    website: "https://mensahpower.gh",
    natureOfBusiness: "Electrical installation and maintenance",
    companyType: "Private Limited Company",
  }
}

function demoPayload(user: SessionUser, extra: Partial<WizardPayload> = {}): WizardPayload {
  return {
    company: demoCompany(user),
    directors: [
      {
        id: "director-self",
        fullName: user.contactName,
        position: user.designation,
        nationality: "Ghanaian",
        idType: "Ghana Card",
        idNumber: "GHA-123456789-0",
        ownership: "60",
      },
      {
        id: "director-2",
        fullName: "Kwame Boateng",
        position: "Director",
        nationality: "Ghanaian",
        idType: "Ghana Card",
        idNumber: "GHA-987654321-0",
        ownership: "40",
      },
    ],
    documents: {
      incorporation: "certificate-of-incorporation.pdf",
      tax: "gra-tax-clearance.pdf",
      ssnit: "ssnit-clearance.pdf",
      financials: "audited-accounts-2025.pdf",
    },
    bank: {
      bankName: "Ghana Commercial Bank",
      accountName: user.companyName,
      accountNumber: "1234567890123",
      branch: "Accra High Street",
      accountType: "Current",
    },
    license: {
      licenseType: "External Electrical Licence",
      licenseNumber: "EXT-88421",
      dateOfIssue: "2024-06-01",
      dateOfExpiry: "2027-05-31",
      licenseClass: "Class A / Electrical",
      issuedBy: "Electricity Company of Ghana",
      documentName: "external-licence.pdf",
    },
    experience: [
      {
        id: "exp-1",
        description: "Electrical Installation Works — Tema Motorway Project",
        client: "Ghana Highways Authority",
        value: "1250000",
        completedOn: "2023-03-15",
      },
      {
        id: "exp-2",
        description: "Supply & Installation of 11kV Substation — Koforidua",
        client: "Koforidua Technical University",
        value: "850000",
        completedOn: "2022-11-20",
      },
      {
        id: "exp-3",
        description: "Electrical Works for Warehouse Facility",
        client: "Gold Coast Logistics Ltd.",
        value: "620000",
        completedOn: "2021-08-10",
      },
    ],
    personnel: [
      {
        id: "person-1",
        fullName: "Ama Darko",
        role: "Electrical Engineer",
        qualification: "BSc Electrical Engineering",
        years: "9",
      },
    ],
    declared: true,
    ...extra,
  }
}

function buildDemoApplications(user: SessionUser): StoredApplication[] {
  const approved = normalizeApplication({
    id: "app-approved-classification",
    reference: "APP-2026-1247",
    type: "classification",
    title: `Classification Certificate — ${user.companyName}`,
    status: "approved",
    reviewStage: 6,
    reviewHistory: [
      {
        title: "Submitted",
        actor: user.contactName,
        at: "2026-09-02T10:24:00.000Z",
        note: "Application received.",
      },
      {
        title: "Initial Review",
        actor: "Ama Darko",
        at: "2026-09-03T09:10:00.000Z",
        note: "Documents complete.",
      },
      {
        title: "AI Review",
        actor: "ECG AI Desk",
        at: "2026-09-03T11:30:00.000Z",
        note: "No adverse records found.",
      },
      {
        title: "Technical Review",
        actor: "Kofi Mensah",
        at: "2026-09-04T14:00:00.000Z",
        note: "Capacity matches Class A.",
      },
      {
        title: "Management Approval",
        actor: "Abena Gyasi",
        at: "2026-09-04T16:20:00.000Z",
        note: "Approved for issuance.",
      },
      {
        title: "Certificate Issuance",
        actor: "ECG Registry",
        at: "2026-09-05T09:00:00.000Z",
        note: "Certificate generated.",
      },
    ],
    createdAt: "2026-09-02T10:24:00.000Z",
    updatedAt: "2026-09-05T09:00:00.000Z",
    payload: demoPayload(user),
  })

  const reviewing = normalizeApplication({
    id: "app-review-supplier",
    reference: "APP-2026-1248",
    type: "supplier",
    title: `Register as a Supplier — ${user.companyName}`,
    status: "under-review",
    reviewStage: 3,
    reviewHistory: [
      {
        title: "Submitted",
        actor: user.contactName,
        at: "2026-10-08T08:12:00.000Z",
        note: "Application received.",
      },
      {
        title: "Initial Review",
        actor: "ECG Registry",
        at: "2026-10-09T11:00:00.000Z",
        note: "File is complete.",
      },
      {
        title: "AI Review",
        actor: "ECG AI Desk",
        at: "2026-10-10T09:40:00.000Z",
        note: "Supporting documents look valid.",
      },
    ],
    createdAt: "2026-10-08T08:12:00.000Z",
    updatedAt: "2026-10-10T09:40:00.000Z",
    payload: demoPayload(user, {
      license: {
        licenseType: "",
        licenseNumber: "",
        dateOfIssue: "",
        dateOfExpiry: "",
        licenseClass: "",
        issuedBy: "",
        documentName: "",
      },
      experience: [],
      personnel: [],
    }),
  })

  return [reviewing, approved]
}

function buildDemoWorkspace(user: SessionUser, applications: StoredApplication[]): Workspace {
  const approved = applications.find((item) => item.id === "app-approved-classification")
  const reviewing = applications.find((item) => item.id === "app-review-supplier")
  const now = "2026-10-13T08:00:00.000Z"

  const documents: WorkspaceDocument[] = [
    {
      id: "doc-incorporation",
      name: "certificate-of-incorporation.pdf",
      category: "Certificate of Incorporation / Registration",
      applicationId: approved?.id,
      uploadedAt: "2026-09-02T10:20:00.000Z",
      sizeLabel: "842 KB",
    },
    {
      id: "doc-tax",
      name: "gra-tax-clearance.pdf",
      category: "Tax Clearance Certificate",
      applicationId: approved?.id,
      uploadedAt: "2026-09-02T10:21:00.000Z",
      sizeLabel: "610 KB",
    },
    {
      id: "doc-profile",
      name: "company-profile.pdf",
      category: "Company Profile",
      uploadedAt: "2026-08-20T14:00:00.000Z",
      sizeLabel: "2.1 MB",
    },
  ]

  const certificates: WorkspaceCertificate[] = approved
    ? [
        {
          id: "cert-classification",
          applicationId: approved.id,
          type: "classification",
          number: "CLF-2026-0842",
          classLabel: "Class A / Electrical",
          issuedOn: "2026-09-05T09:00:00.000Z",
          expiresOn: "2027-09-04T09:00:00.000Z",
          status: "active",
        },
        {
          id: "cert-licence-expiring",
          applicationId: approved.id,
          type: "external-license",
          number: "EXT-2025-0406",
          classLabel: "External Electrical Licence",
          issuedOn: "2025-11-01T09:00:00.000Z",
          expiresOn: "2026-10-31T09:00:00.000Z",
          status: "expiring-soon",
        },
      ]
    : []

  const payments: WorkspacePayment[] = [
    reviewing
      ? {
          id: "pay-review-supplier",
          applicationId: reviewing.id,
          reference: "INV-APP-2026-1248",
          description: "Supplier registration processing fee",
          amount: APPLICATION_FEES.supplier,
          status: "due",
          dueOn: "2026-10-20T00:00:00.000Z",
        }
      : null,
    approved
      ? {
          id: "pay-approved-class",
          applicationId: approved.id,
          reference: "INV-APP-2026-1247",
          description: "Classification certificate fee",
          amount: APPLICATION_FEES.classification,
          status: "paid",
          dueOn: "2026-09-06T00:00:00.000Z",
          paidOn: "2026-09-06T12:14:00.000Z",
          method: "Visa •• 4242",
        }
      : null,
  ].filter(Boolean) as WorkspacePayment[]

  return {
    seeded: true,
    documents,
    certificates,
    payments,
    team: [
      {
        id: "user-self",
        name: user.contactName,
        email: user.email,
        role: "Administrator",
        status: "active",
      },
      {
        id: "user-ama",
        name: "Ama Darko",
        email: "ama.darko@example.com",
        role: "Preparer",
        status: "active",
      },
    ],
    notifications: [
      {
        id: "ntf-1",
        title: "External licence expiring",
        body: "EXT-2025-0406 expires on 31 Oct 2026. Start a renewal.",
        href: "/app/renewals",
        read: false,
        createdAt: now,
      },
      {
        id: "ntf-2",
        title: "Invoice awaiting payment",
        body: "INV-APP-2026-1248 is due.",
        href: "/app/payments",
        read: false,
        createdAt: "2026-10-10T09:45:00.000Z",
      },
      {
        id: "ntf-3",
        title: "Classification approved",
        body: "CLF-2026-0842 is available to download.",
        href: "/app/certificates",
        read: true,
        createdAt: "2026-09-05T09:05:00.000Z",
      },
    ],
    settings: { emailNotifications: true, smsAlerts: false },
  }
}
