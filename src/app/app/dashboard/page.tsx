"use client"

import Link from "next/link"

import { ApplicationTypeCards } from "@/components/app-shell/application-type-cards"
import { EmptyApplications } from "@/components/app-shell/empty-applications"
import { StatusBadge } from "@/components/app-shell/status-badge"
import { useSession } from "@/hooks/use-session"
import { firstNameFromContact } from "@/lib/session"

export default function DashboardPage() {
  const { user, applications, workspace } = useSession()
  const firstName = firstNameFromContact(user?.contactName ?? "John")
  const duePayments = workspace.payments.filter((item) => item.status === "due").length
  const expiring = workspace.certificates.filter((item) => item.status === "expiring-soon").length

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Welcome back, {firstName}! <span aria-hidden>👏</span>
      </h1>
      <p className="mt-1 text-muted-foreground">What would you like to do today?</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Link href="/app/applications" className="rounded-2xl border bg-card px-4 py-4 hover:bg-muted/40">
          <p className="text-xs text-muted-foreground">Applications</p>
          <p className="mt-1 text-2xl font-semibold">{applications.length}</p>
        </Link>
        <Link href="/app/payments" className="rounded-2xl border bg-card px-4 py-4 hover:bg-muted/40">
          <p className="text-xs text-muted-foreground">Invoices due</p>
          <p className="mt-1 text-2xl font-semibold">{duePayments}</p>
        </Link>
        <Link href="/app/renewals" className="rounded-2xl border bg-card px-4 py-4 hover:bg-muted/40">
          <p className="text-xs text-muted-foreground">Renewals due</p>
          <p className="mt-1 text-2xl font-semibold">{expiring}</p>
        </Link>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Start a New Application</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Choose the type of application you want to start.
        </p>
        <ApplicationTypeCards />
      </section>

      {applications.length === 0 ? (
        <EmptyApplications />
      ) : (
        <section className="mt-6 rounded-3xl border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Applications</h2>
            <Link href="/app/applications" className="text-sm text-ecg-blue dark:text-ecg-gold">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {applications.slice(0, 4).map((application) => (
              <Link
                key={application.id}
                href={`/app/applications/${application.id}`}
                className="flex flex-col gap-2 rounded-2xl border px-4 py-3 hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-ecg-blue">{application.reference}</p>
                  <p className="font-medium break-words">{application.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(application.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <StatusBadge status={application.status} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
