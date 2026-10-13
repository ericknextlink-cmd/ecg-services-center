"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSession } from "@/hooks/use-session"

export default function CompanyProfilePage() {
  const { user } = useSession()

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold sm:text-3xl">Company Profile</h1>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        This profile is reused across supplier, classification and licence applications.
      </p>
      <div className="grid gap-4 rounded-3xl border bg-card p-6 sm:grid-cols-2">
        <Field label="Company" value={user?.companyName} />
        <Field label="TIN" value={user?.tin} />
        <Field label="Registration number" value={user?.registrationNumber} />
        <Field label="Email" value={user?.email} />
        <Field label="Phone" value={user?.phone} />
        <Field label="Primary contact" value={user?.contactName} />
        <Field label="Designation" value={user?.designation} />
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input value={value ?? ""} readOnly />
    </div>
  )
}
