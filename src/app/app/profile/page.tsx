"use client"

import { FormEvent, useEffect, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSession } from "@/hooks/use-session"
import { writeSession } from "@/lib/session"

export default function CompanyProfilePage() {
  const { user } = useSession()
  const [form, setForm] = useState({
    companyName: "",
    tin: "",
    registrationNumber: "",
    email: "",
    phone: "",
    contactName: "",
    designation: "",
  })

  useEffect(() => {
    if (!user) {
      return
    }
    setForm({
      companyName: user.companyName,
      tin: user.tin,
      registrationNumber: user.registrationNumber ?? "",
      email: user.email,
      phone: user.phone,
      contactName: user.contactName,
      designation: user.designation,
    })
  }, [user])

  function save(event: FormEvent) {
    event.preventDefault()
    writeSession(form)
    toast.success("Company profile saved on this device.")
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold sm:text-3xl">Company Profile</h1>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        This profile is reused across supplier, classification and licence applications.
      </p>
      <form className="grid gap-4 rounded-3xl border bg-card p-6 sm:grid-cols-2" onSubmit={save}>
        <Field
          label="Company"
          value={form.companyName}
          onChange={(value) => setForm((current) => ({ ...current, companyName: value }))}
        />
        <Field
          label="TIN"
          value={form.tin}
          onChange={(value) => setForm((current) => ({ ...current, tin: value }))}
        />
        <Field
          label="Registration number"
          value={form.registrationNumber}
          onChange={(value) => setForm((current) => ({ ...current, registrationNumber: value }))}
        />
        <Field
          label="Email"
          value={form.email}
          onChange={(value) => setForm((current) => ({ ...current, email: value }))}
        />
        <Field
          label="Phone"
          value={form.phone}
          onChange={(value) => setForm((current) => ({ ...current, phone: value }))}
        />
        <Field
          label="Primary contact"
          value={form.contactName}
          onChange={(value) => setForm((current) => ({ ...current, contactName: value }))}
        />
        <Field
          label="Designation"
          value={form.designation}
          onChange={(value) => setForm((current) => ({ ...current, designation: value }))}
        />
        <div className="sm:col-span-2">
          <Button type="submit" className="bg-ecg-blue text-white hover:bg-ecg-blue/90">
            Save profile
          </Button>
        </div>
      </form>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  )
}
