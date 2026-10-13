"use client"

import { useCallback, useSyncExternalStore } from "react"

import {
  SESSION_EVENT,
  type SessionUser,
  type StoredApplication,
  clearSession,
  readApplications,
  readSession,
  writeApplications,
  writeSession,
} from "@/lib/session"
import { type Workspace, readWorkspace } from "@/lib/workspace"

function subscribeToSession(onStoreChange: () => void) {
  window.addEventListener(SESSION_EVENT, onStoreChange)
  window.addEventListener("storage", onStoreChange)
  return () => {
    window.removeEventListener(SESSION_EVENT, onStoreChange)
    window.removeEventListener("storage", onStoreChange)
  }
}

const EMPTY_APPLICATIONS: StoredApplication[] = []
const EMPTY_WORKSPACE: Workspace = {
  seeded: false,
  documents: [],
  certificates: [],
  payments: [],
  team: [],
  notifications: [],
  settings: { emailNotifications: true, smsAlerts: false },
}

function subscribeToClient() {
  return () => {}
}

export function useSession() {
  const isClient = useSyncExternalStore(
    subscribeToClient,
    () => true,
    () => false,
  )
  const user = useSyncExternalStore(subscribeToSession, readSession, () => null)
  const applications = useSyncExternalStore(
    subscribeToSession,
    readApplications,
    () => EMPTY_APPLICATIONS,
  )
  const workspace = useSyncExternalStore(
    subscribeToSession,
    readWorkspace,
    () => EMPTY_WORKSPACE,
  )

  const signIn = useCallback((nextUser: SessionUser) => {
    writeSession(nextUser)
  }, [])

  const signOut = useCallback(() => {
    clearSession()
  }, [])

  const saveApplications = useCallback((nextApplications: StoredApplication[]) => {
    writeApplications(nextApplications)
  }, [])

  return {
    user,
    applications,
    workspace,
    isReady: isClient,
    signIn,
    signOut,
    saveApplications,
  }
}
