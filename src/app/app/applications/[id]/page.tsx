"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

import { ReviewStep } from "@/components/applications/steps/review-step"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useSession } from "@/hooks/use-session"
import { applicationTypeById } from "@/lib/data/applications"
import type { WizardPayload } from "@/lib/data/wizard"

function isWizardPayload(value: unknown): value is WizardPayload {
  if (!value || typeof value !== "object") {
    return false
  }
  const candidate = value as WizardPayload
  return Boolean(candidate.company && candidate.directors && candidate.bank)
}

export default function ApplicationDetailPage() {
  const params = useParams<{ id: string }>()
  const { applications } = useSession()
  const application = applications.find((item) => item.id === params.id)
  const applicationType = application ? applicationTypeById(application.type) : undefined

  if (!application) {
    return (
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold">Application not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This record is not in your local workspace.
        </p>
        <Button asChild className="mt-4">
          <Link href="/app/applications">Back to applications</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Application</p>
          <h1 className="text-2xl font-bold sm:text-3xl">{application.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {applicationType?.title} · Updated{" "}
            {new Date(application.updatedAt).toLocaleString("en-GB")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="capitalize">
            {application.status.replace("-", " ")}
          </Badge>
          {application.status === "draft" ? (
            <Button asChild className="bg-ecg-blue text-white hover:bg-ecg-blue/90">
              <Link href={`/app/applications/new/${application.type}?draft=${application.id}`}>
                Continue
              </Link>
            </Button>
          ) : null}
        </div>
      </div>

      {isWizardPayload(application.payload) ? (
        <div className="rounded-2xl border bg-card p-4 sm:p-6">
          <ReviewStep type={application.type} payload={application.payload} readOnly />
        </div>
      ) : (
        <div className="rounded-3xl border bg-card p-6 text-sm">
          <p>
            <span className="font-medium">Type:</span> {applicationType?.title}
          </p>
          <p className="mt-2">
            <span className="font-medium">Submitted:</span>{" "}
            {new Date(application.createdAt).toLocaleString("en-GB")}
          </p>
        </div>
      )}
    </div>
  )
}
