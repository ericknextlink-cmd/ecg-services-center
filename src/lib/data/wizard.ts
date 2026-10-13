import type { LucideIcon } from "lucide-react"
import {
  FileBadge,
  FileStack,
  FileText,
  Landmark,
  ShieldCheck,
  UserRound,
} from "lucide-react"

import type { ApplicationTypeId } from "@/lib/data/applications"
import type { SessionUser } from "@/lib/session"

export type WizardStepId =
  | "company"
  | "directors"
  | "documents"
  | "license"
  | "experience"
  | "personnel"
  | "bank"
  | "review"

export type WizardStep = {
  id: WizardStepId
  title: string
  description: string
}

export type Director = {
  id: string
  fullName: string
  position: string
  nationality: string
  idType: string
  idNumber: string
  ownership: string
}

export type WorkExperience = {
  id: string
  description: string
  client: string
  value: string
  completedOn: string
}

export type WorkPersonnel = {
  id: string
  fullName: string
  role: string
  qualification: string
  years: string
}

export type CompanyInfo = {
  companyName: string
  email: string
  registrationNumber: string
  phone: string
  dateOfIncorporation: string
  website: string
  natureOfBusiness: string
  companyType: string
}

export type BankInfo = {
  bankName: string
  accountName: string
  accountNumber: string
  branch: string
  accountType: string
}

export type LicenseInfo = {
  licenseType: string
  licenseNumber: string
  dateOfIssue: string
  dateOfExpiry: string
  licenseClass: string
  issuedBy: string
  documentName: string
}

export type WizardPayload = {
  company: CompanyInfo
  directors: Director[]
  documents: Record<string, string>
  bank: BankInfo
  license: LicenseInfo
  experience: WorkExperience[]
  personnel: WorkPersonnel[]
  declared: boolean
}

export type ComplianceDocument = {
  id: string
  title: string
  description: string
  required: boolean
  accept: string
  icon: LucideIcon
  tone: string
}

const COMPANY_STEP: WizardStep = {
  id: "company",
  title: "Company Information",
  description: "Basic company details",
}

const DIRECTORS_STEP: WizardStep = {
  id: "directors",
  title: "Directors & Partners",
  description: "Add company directors",
}

const DOCUMENTS_STEP: WizardStep = {
  id: "documents",
  title: "Compliance Documents",
  description: "Upload statutory documents",
}

const LICENSE_STEP: WizardStep = {
  id: "license",
  title: "External License",
  description: "Provide license details",
}

const EXPERIENCE_STEP: WizardStep = {
  id: "experience",
  title: "Work Experience",
  description: "Add relevant projects",
}

const PERSONNEL_STEP: WizardStep = {
  id: "personnel",
  title: "Work Personnel",
  description: "Add technical staff",
}

const BANK_STEP: WizardStep = {
  id: "bank",
  title: "Bank Details",
  description: "Provide bank information",
}

const REVIEW_STEP: WizardStep = {
  id: "review",
  title: "Review & Submit",
  description: "Review and submit application",
}

export const WIZARD_STEPS: Record<ApplicationTypeId, WizardStep[]> = {
  supplier: [COMPANY_STEP, DIRECTORS_STEP, DOCUMENTS_STEP, BANK_STEP, REVIEW_STEP],
  classification: [
    COMPANY_STEP,
    DIRECTORS_STEP,
    DOCUMENTS_STEP,
    LICENSE_STEP,
    EXPERIENCE_STEP,
    PERSONNEL_STEP,
    BANK_STEP,
    REVIEW_STEP,
  ],
  "external-license": [
    COMPANY_STEP,
    DIRECTORS_STEP,
    DOCUMENTS_STEP,
    LICENSE_STEP,
    BANK_STEP,
    REVIEW_STEP,
  ],
}

export const WIZARD_PAGE_COPY: Record<
  ApplicationTypeId,
  { title: string; subtitle: string }
> = {
  supplier: {
    title: "Register as a Supplier",
    subtitle: "Follow the steps below to complete your supplier registration.",
  },
  classification: {
    title: "Classification Certificate Application",
    subtitle: "Apply for or renew your Contractor Classification Certificate with ECG.",
  },
  "external-license": {
    title: "External License Application",
    subtitle: "Apply for or renew your External License to undertake electrical works with ECG.",
  },
}

export const NATURE_OF_BUSINESS = [
  "Electrical installation and maintenance",
  "Supply of electrical materials",
  "Civil and building works",
  "Mechanical works",
  "ICT and telecommunications",
  "General goods and services",
]

export const COMPANY_TYPES = [
  "Private Limited Company",
  "Public Limited Company",
  "Partnership",
  "Sole Proprietorship",
  "Non-Governmental Organisation",
]

export const DIRECTOR_POSITIONS = [
  "Managing Director",
  "Director",
  "Partner",
  "Shareholder",
  "Company Secretary",
]

export const NATIONALITIES = ["Ghanaian", "Nigerian", "Ivorian", "Other"]

export const ID_TYPES = ["Ghana Card", "Passport", "Voter ID"]

export const LICENSE_TYPES = [
  "External Electrical Licence",
  "Installation Licence",
  "Contractor Licence",
]

export const LICENSE_CLASSES = [
  "Class A / Electrical",
  "Class B / Electrical",
  "Class C / Electrical",
  "Installation Licence",
]

export const ISSUED_BY = [
  "Electricity Company of Ghana",
  "Energy Commission",
  "Other regulatory body",
]

export const BANKS = [
  "Ghana Commercial Bank",
  "Ecobank Ghana",
  "Absa Bank Ghana",
  "Stanbic Bank",
  "Fidelity Bank",
  "CalBank",
]

export const ACCOUNT_TYPES = ["Current", "Savings"]

export const PERSONNEL_ROLES = [
  "Electrical Engineer",
  "Technician",
  "Project Manager",
  "Supervisor",
  "Safety Officer",
]

export const COMPLIANCE_DOCUMENTS: ComplianceDocument[] = [
  {
    id: "incorporation",
    title: "Certificate of Incorporation / Registration",
    description: "Upload your company registration certificate.",
    required: true,
    accept: "PDF, PNG, JPG (Max. 5MB)",
    icon: FileText,
    tone: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "tax",
    title: "Tax Clearance Certificate",
    description: "Upload valid Tax Clearance Certificate.",
    required: true,
    accept: "PDF, PNG, JPG (Max. 5MB)",
    icon: Landmark,
    tone: "bg-orange-50 text-orange-500",
  },
  {
    id: "ssnit",
    title: "SSNIT Clearance Certificate",
    description: "Upload valid SSNIT Clearance Certificate.",
    required: true,
    accept: "PDF, PNG, JPG (Max. 5MB)",
    icon: UserRound,
    tone: "bg-sky-50 text-sky-600",
  },
  {
    id: "financials",
    title: "Financial Statements / Bank Statement",
    description: "Upload audited accounts or last six (6) months bank statement.",
    required: true,
    accept: "PDF (Max. 10MB)",
    icon: FileStack,
    tone: "bg-violet-50 text-violet-600",
  },
  {
    id: "vat",
    title: "VAT Registration Certificate (If Applicable)",
    description: "Upload VAT registration certificate.",
    required: false,
    accept: "PDF, PNG, JPG (Max. 5MB)",
    icon: FileBadge,
    tone: "bg-amber-50 text-amber-600",
  },
  {
    id: "other",
    title: "Other Supporting Document (Optional)",
    description: "Add any other relevant document.",
    required: false,
    accept: "PDF, PNG, JPG (Max. 5MB)",
    icon: ShieldCheck,
    tone: "bg-teal-50 text-teal-600",
  },
]

export function createInitialPayload(user: SessionUser | null): WizardPayload {
  return {
    company: {
      companyName: user?.companyName ?? "",
      email: user?.email ?? "",
      registrationNumber: user?.registrationNumber ?? "",
      phone: (user?.phone ?? "").replace(/^\+233/, ""),
      dateOfIncorporation: "",
      website: "",
      natureOfBusiness: "",
      companyType: "",
    },
    directors: user
      ? [
          {
            id: "director-self",
            fullName: user.contactName,
            position: user.designation || "Managing Director",
            nationality: "Ghanaian",
            idType: "Ghana Card",
            idNumber: "GHA-123456789-0",
            ownership: "100",
          },
        ]
      : [],
    documents: {},
    bank: {
      bankName: "",
      accountName: user?.companyName ?? "",
      accountNumber: "",
      branch: "",
      accountType: "Current",
    },
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
    declared: false,
  }
}

export function isCompanyComplete(company: CompanyInfo) {
  return Boolean(
    company.companyName.trim() &&
      company.email.trim() &&
      company.registrationNumber.trim() &&
      company.phone.trim() &&
      company.dateOfIncorporation &&
      company.natureOfBusiness &&
      company.companyType,
  )
}

export function isDirectorComplete(director: Director) {
  return Boolean(
    director.fullName.trim() &&
      director.position &&
      director.nationality &&
      director.idType &&
      director.idNumber.trim() &&
      director.ownership.trim(),
  )
}

export function areDirectorsComplete(directors: Director[]) {
  return directors.length > 0 && directors.every(isDirectorComplete)
}

export function areDocumentsComplete(documents: Record<string, string>) {
  return COMPLIANCE_DOCUMENTS.filter((item) => item.required).every(
    (item) => Boolean(documents[item.id]),
  )
}

export function isBankComplete(bank: BankInfo) {
  return Boolean(
    bank.bankName &&
      bank.accountName.trim() &&
      bank.accountNumber.trim() &&
      bank.branch.trim() &&
      bank.accountType,
  )
}

export function isLicenseComplete(license: LicenseInfo) {
  return Boolean(
    license.licenseType &&
      license.licenseNumber.trim() &&
      license.dateOfIssue &&
      license.dateOfExpiry &&
      license.licenseClass &&
      license.issuedBy &&
      license.documentName,
  )
}

export function isExperienceComplete(experience: WorkExperience[]) {
  return experience.length >= 3
}

export function isPersonnelComplete(personnel: WorkPersonnel[]) {
  return personnel.length > 0
}

export function canAdvance(stepId: WizardStepId, payload: WizardPayload) {
  switch (stepId) {
    case "company":
      return isCompanyComplete(payload.company)
    case "directors":
      return areDirectorsComplete(payload.directors)
    case "documents":
      return areDocumentsComplete(payload.documents)
    case "license":
      return isLicenseComplete(payload.license)
    case "experience":
      return isExperienceComplete(payload.experience)
    case "personnel":
      return isPersonnelComplete(payload.personnel)
    case "bank":
      return isBankComplete(payload.bank)
    case "review":
      return payload.declared
    default:
      return true
  }
}

export function newId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`
}

export function formatDisplayDate(value: string) {
  if (!value) {
    return "—"
  }

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return value
  }

  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
