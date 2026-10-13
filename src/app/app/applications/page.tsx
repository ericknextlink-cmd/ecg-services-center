"use client"

import Link from "next/link"

import { EmptyApplications } from "@/components/app-shell/empty-applications"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useSession } from "@/hooks/use-session"

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
        <Button asChild className="w-full sm:w-auto">
          <Link href="/app/applications/new">New Application</Link>
        </Button>
      </div>

      {applications.length === 0 ? (
        <EmptyApplications />
      ) : (
        <div className="mt-6 space-y-3">
          {applications.map((application) => (
            <Link
              key={application.id}
              href={`/app/applications/${application.id}`}
              className="flex flex-col gap-2 rounded-2xl border bg-card px-4 py-4 hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between sm:px-5"
            >
              <div className="min-w-0">
                <p className="font-medium break-words">{application.title}</p>
                <p className="text-xs text-muted-foreground">
                  Updated {new Date(application.updatedAt).toLocaleString("en-GB")}
                </p>
              </div>
              <Badge variant="outline" className="w-fit shrink-0 capitalize">
                {application.status.replace("-", " ")}
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
