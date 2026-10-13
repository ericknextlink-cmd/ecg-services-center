export type SessionUser = {
  companyName: string
  tin: string
  registrationNumber?: string
  email: string
  phone: string
  contactName: string
  designation: string
}

export type ApplicationStatus =
  | "draft"
  | "submitted"
  | "under-review"
  | "approved"
  | "rejected"

export type StoredApplication = {
  id: string
  type: "external-license" | "classification" | "supplier"
  title: string
  status: ApplicationStatus
  createdAt: string
  updatedAt: string
  payload: Record<string, unknown>
}

export const SESSION_STORAGE_KEY = "ecg-vendor-session"
export const APPLICATIONS_STORAGE_KEY = "ecg-vendor-applications"
export const SESSION_EVENT = "ecg-session-changed"

export const DEMO_USER: SessionUser = {
  companyName: "Mensah Power Systems Ltd",
  tin: "C0001234567",
  registrationNumber: "CS123456789",
  email: "john.mensah@example.com",
  phone: "+233244000000",
  contactName: "John Mensah",
  designation: "Managing Director",
}

const EMPTY_APPLICATIONS: StoredApplication[] = []

let cachedSessionRaw: string | null | undefined
let cachedSession: SessionUser | null = null
let cachedApplicationsRaw: string | null | undefined
let cachedApplications: StoredApplication[] = EMPTY_APPLICATIONS

export function firstNameFromContact(contactName: string) {
  return contactName.split(" ")[0] || contactName
}

export function initialsFromContact(contactName: string) {
  return contactName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export function readSession(): SessionUser | null {
  if (typeof window === "undefined") {
    return null
  }

  const rawSession = window.localStorage.getItem(SESSION_STORAGE_KEY)
  if (rawSession === cachedSessionRaw) {
    return cachedSession
  }

  cachedSessionRaw = rawSession
  if (!rawSession) {
    cachedSession = null
    return null
  }

  try {
    cachedSession = JSON.parse(rawSession) as SessionUser
  } catch {
    cachedSession = null
  }

  return cachedSession
}

export function writeSession(user: SessionUser) {
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user))
  window.dispatchEvent(new Event(SESSION_EVENT))
}

export function clearSession() {
  window.localStorage.removeItem(SESSION_STORAGE_KEY)
  window.dispatchEvent(new Event(SESSION_EVENT))
}

export function readApplications(): StoredApplication[] {
  if (typeof window === "undefined") {
    return EMPTY_APPLICATIONS
  }

  const rawApplications = window.localStorage.getItem(APPLICATIONS_STORAGE_KEY)
  if (rawApplications === cachedApplicationsRaw) {
    return cachedApplications
  }

  cachedApplicationsRaw = rawApplications
  if (!rawApplications) {
    cachedApplications = EMPTY_APPLICATIONS
    return cachedApplications
  }

  try {
    cachedApplications = JSON.parse(rawApplications) as StoredApplication[]
  } catch {
    cachedApplications = EMPTY_APPLICATIONS
  }

  return cachedApplications
}

export function writeApplications(applications: StoredApplication[]) {
  window.localStorage.setItem(
    APPLICATIONS_STORAGE_KEY,
    JSON.stringify(applications),
  )
  window.dispatchEvent(new Event(SESSION_EVENT))
}

export function upsertApplication(application: StoredApplication) {
  const applications = [...readApplications()]
  const existingIndex = applications.findIndex(
    (item) => item.id === application.id,
  )

  if (existingIndex >= 0) {
    applications[existingIndex] = application
  } else {
    applications.unshift(application)
  }

  writeApplications(applications)
}
