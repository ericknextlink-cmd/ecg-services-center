"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

import { AppHeader } from "@/components/app-shell/app-header"
import { AppSidebar } from "@/components/app-shell/app-sidebar"
import { useSession } from "@/hooks/use-session"
import { clearSession } from "@/lib/session"

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, isReady } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (isReady && !user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`)
    }
  }, [isReady, pathname, router, user])

  function signOut() {
    clearSession()
    router.replace("/login")
  }

  if (!isReady || !user) {
    return (
      <div className="flex min-h-svh items-center justify-center px-4 text-sm text-muted-foreground">
        Loading your workspace...
      </div>
    )
  }

  return (
    <div className="flex min-h-svh min-w-0 overflow-x-clip bg-background">
      <div className="hidden lg:flex">
        <AppSidebar />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader onSignOut={signOut} />
        <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
