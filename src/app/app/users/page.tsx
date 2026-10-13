"use client"

import { FormEvent, useState } from "react"
import { toast } from "sonner"

import { StatusBadge } from "@/components/app-shell/status-badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSession } from "@/hooks/use-session"
import { inviteTeamMember } from "@/lib/workspace"

export default function UsersPage() {
  const { workspace } = useSession()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<"Preparer" | "Viewer">("Preparer")

  function invite(event: FormEvent) {
    event.preventDefault()
    if (!name.trim() || !email.trim()) {
      toast.error("Enter a name and email.")
      return
    }
    inviteTeamMember({ name, email, role })
    toast.success(`Invite sent to ${email}. No email is actually delivered.`)
    setName("")
    setEmail("")
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold sm:text-3xl">Users & Access</h1>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        Invite colleagues to prepare applications. Invites stay in this browser.
      </p>

      <form className="mb-6 grid gap-3 rounded-2xl border bg-card p-5 sm:grid-cols-[1fr_1fr_8rem_auto]" onSubmit={invite}>
        <div className="space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} placeholder="Full name" onChange={(event) => setName(event.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            placeholder="work@company.com"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Role</Label>
          <Select value={role} onValueChange={(value) => setRole(value as "Preparer" | "Viewer")}>
            <SelectTrigger className="h-8 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Preparer">Preparer</SelectItem>
              <SelectItem value="Viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button type="submit" className="w-full bg-ecg-blue text-white hover:bg-ecg-blue/90">
            Invite
          </Button>
        </div>
      </form>

      <div className="space-y-3">
        {workspace.team.map((member) => (
          <div key={member.id} className="flex items-center justify-between rounded-2xl border bg-card px-5 py-4">
            <div>
              <p className="font-medium">{member.name}</p>
              <p className="text-sm text-muted-foreground">
                {member.email} · {member.role}
              </p>
            </div>
            <StatusBadge status={member.status} />
          </div>
        ))}
      </div>
    </div>
  )
}
