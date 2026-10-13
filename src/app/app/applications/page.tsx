"use client"

import Link from "next/link"

import { EmptyApplications } from "@/components/app-shell/empty-applications"
import { StatusBadge } from "@/components/app-shell/status-badge"
import { Button } from "@/components/ui/button"
import { useSession } from "@/hooks/use-session"
import { applicationTypeById } from "@/lib/data/applications"

export default function ApplicationsPage() {
  const { applications } = useSession()

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">My Applications</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track drafts, submissions and ECG review status.
          </p>
        </div>
        <Button asChild className="w-full bg-ecg-blue text-white hover:bg-ecg-blue/90 sm:w-auto">
          <Link href="/app/applications/new">New Application</Link>
        </Button>
      </div>

      {applications.length === 0 ? (
        <EmptyApplications />
      ) : (
        <div className="mt-6 space-y-3">
          {applications.map((application) => {
            const applicationType = applicationTypeById(application.type)
            return (
              <div
                key={application.id}
                className="flex flex-col gap-3 rounded-2xl border bg-card px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
              >
                <Link href={`/app/applications/${application.id}`} className="min-w-0">
                  <p className="text-xs font-semibold text-ecg-blue">{application.reference}</p>
                  <p className="font-medium break-words">{application.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {applicationType?.title} · Updated{" "}
                    {new Date(application.updatedAt).toLocaleString("en-GB")}
                  </p>
                </Link>
                <div className="flex items-center gap-2">
                  <StatusBadge status={application.status} />
                  {application.status === "draft" ? (
                    <Button asChild size="sm" className="bg-ecg-blue text-white hover:bg-ecg-blue/90">
                      <Link href={`/app/applications/new/${application.type}?draft=${application.id}`}>
                        Continue
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/app/applications/${application.id}`}>View</Link>
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
