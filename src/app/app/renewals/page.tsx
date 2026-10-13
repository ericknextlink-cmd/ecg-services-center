"use client"

import Link from "next/link"

import { StatusBadge } from "@/components/app-shell/status-badge"
import { Button } from "@/components/ui/button"
import { useSession } from "@/hooks/use-session"

export default function RenewalsPage() {
  const { workspace } = useSession()
  const due = workspace.certificates.filter((item) => item.status !== "active")

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-bold sm:text-3xl">Renewals</h1>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        Certificates nearing expiry can be renewed with a pre-filled application.
      </p>

      {due.length === 0 ? (
        <div className="rounded-2xl border bg-card px-5 py-10 text-center">
          <p className="font-medium">Nothing due for renewal</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Active certificates will appear here 60 days before expiry.
          </p>
          <Button asChild className="mt-4 bg-ecg-blue text-white hover:bg-ecg-blue/90">
            <Link href="/app/certificates">View certificates</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {due.map((certificate) => (
            <div
              key={certificate.id}
              className="flex flex-col gap-3 rounded-2xl border bg-card px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium">{certificate.number}</p>
                <p className="text-sm text-muted-foreground">
                  {certificate.classLabel} · Expires{" "}
                  {new Date(certificate.expiresOn).toLocaleDateString("en-GB")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={certificate.status} />
                <Button asChild className="bg-ecg-blue text-white hover:bg-ecg-blue/90">
                  <Link href={`/app/applications/new/${certificate.type}?renewal=${certificate.id}`}>
                    Start renewal
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
