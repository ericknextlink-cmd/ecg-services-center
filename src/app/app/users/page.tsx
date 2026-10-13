"use client"

import { Badge } from "@/components/ui/badge"
import { useSession } from "@/hooks/use-session"

export default function UsersPage() {
  const { user } = useSession()

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold sm:text-3xl">Users & Access</h1>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        Invite colleagues to prepare applications. Role-based access will be connected later.
      </p>
      <div className="rounded-3xl border bg-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">{user?.contactName}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <Badge>Administrator</Badge>
        </div>
      </div>
    </div>
  )
}
