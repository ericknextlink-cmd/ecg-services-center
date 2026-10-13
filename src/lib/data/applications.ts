export type ApplicationTypeId =
  | "external-license"
  | "classification"
  | "supplier"

export type ApplicationType = {
  id: ApplicationTypeId
  title: string
  shortTitle: string
  dashboardDescription: string
  landingDescription: string
  landingSteps: string[]
  href: string
  accent: "red" | "blue" | "gold"
  landingTint: "blue" | "green" | "purple"
}

export const LANDING_APPLICATION_ORDER: ApplicationTypeId[] = [
  "supplier",
  "classification",
  "external-license",
]

export const APPLICATION_TYPES: ApplicationType[] = [
  {
    id: "external-license",
    title: "External License",
    shortTitle: "External Licence",
    dashboardDescription:
      "Apply for or renew your External License to undertake electrical works with ECG.",
    landingDescription: "Apply for or manage an external licence.",
    landingSteps: [
      "Submit application",
      "Provide supporting documents",
      "Verification and approval",
      "Receive your licence",
    ],
    href: "/app/applications/new/external-license",
    accent: "red",
    landingTint: "purple",
  },
  {
    id: "classification",
    title: "Classification Certificate",
    shortTitle: "Classification Certificate",
    dashboardDescription:
      "Apply for or renew your Contractor Classification Certificate with ECG.",
    landingDescription: "Apply for or manage an ECG classification certificate.",
    landingSteps: [
      "Submit application",
      "Provide relevant documents",
      "Assessment and evaluation",
      "Get certified",
    ],
    href: "/app/applications/new/classification",
    accent: "blue",
    landingTint: "green",
  },
  {
    id: "supplier",
    title: "Register as a Supplier",
    shortTitle: "Register as a Supplier",
    dashboardDescription:
      "Register your company as a supplier with ECG to participate in tenders and supply opportunities.",
    landingDescription: "Onboard your company as an official ECG vendor/supplier.",
    landingSteps: [
      "Create supplier profile",
      "Provide company details",
      "Upload required documents",
      "Get verified by ECG",
    ],
    href: "/app/applications/new/supplier",
    accent: "gold",
    landingTint: "blue",
  },
]

export function applicationTypeById(id: string) {
  return APPLICATION_TYPES.find((applicationType) => applicationType.id === id)
}

export const REQUIRED_DOCUMENTS: Record<ApplicationTypeId, string[]> = {
  "external-license": [
    "Certificate of Incorporation",
    "GRA Tax Clearance Certificate",
    "SSNIT Clearance Certificate",
    "Company Profile",
    "Evidence of similar electrical works",
    "Insurance cover",
  ],
  classification: [
    "Certificate of Incorporation",
    "GRA Tax Clearance Certificate",
    "SSNIT Clearance Certificate",
    "CV of technical staff",
    "Equipment list and ownership evidence",
    "Audited accounts (last 2 years)",
    "Evidence of completed ECG or similar works",
  ],
  supplier: [
    "Certificate of Incorporation",
    "GRA TIN certificate",
    "Company profile and product catalogue",
    "Bank reference letter",
    "Quality certifications (if any)",
  ],
}
