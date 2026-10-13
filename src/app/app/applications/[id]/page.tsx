"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"
import { Check, Download, Printer } from "lucide-react"
import { toast } from "sonner"

import { ReviewStep } from "@/components/applications/steps/review-step"
import { StatusBadge } from "@/components/app-shell/status-badge"
import { PayInvoiceDialog } from "@/components/workspace/pay-invoice-dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSession } from "@/hooks/use-session"
import { applicationTypeById } from "@/lib/data/applications"
import { REVIEW_STAGES } from "@/lib/data/review"
import type { WizardPayload } from "@/lib/data/wizard"
import { cn } from "@/lib/utils"
import { advanceApplicationReview } from "@/lib/workspace"

function isWizardPayload(value: unknown): value is WizardPayload {
  if (!value || typeof value !== "object") {
    return false
  }
  const candidate = value as WizardPayload
  return Boolean(candidate.company && candidate.directors && candidate.bank)
}

export default function ApplicationDetailPage() {
  const params = useParams<{ id: string }>()
  const { applications, workspace } = useSession()
  const application = applications.find((item) => item.id === params.id)
  const applicationType = application ? applicationTypeById(application.type) : undefined
  const invoice = workspace.payments.find((item) => item.applicationId === params.id)
  const certificate = workspace.certificates.find((item) => item.applicationId === params.id)
  const documents = workspace.documents.filter((item) => item.applicationId === params.id)
  const [payOpen, setPayOpen] = useState(false)

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

  const currentStage = Math.min(application.reviewStage, REVIEW_STAGES.length)

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Button asChild variant="ghost" className="h-8 px-0 text-ecg-blue">
        <Link href="/app/applications">← Back to Applications</Link>
      </Button>

      <div className="flex flex-col gap-4 rounded-2xl border bg-card p-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {application.reference}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold">{applicationType?.title}</h1>
            <StatusBadge status={application.status} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Submitted {new Date(application.createdAt).toLocaleString("en-GB")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => toast.success("Print dialog is not connected in this prototype.")}
          >
            <Printer className="size-4" />
            Print
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => toast.success(`Downloading ${application.reference}.pdf`)}
          >
            <Download className="size-4" />
            Download PDF
          </Button>
          {application.status === "draft" ? (
            <Button asChild className="bg-ecg-blue text-white hover:bg-ecg-blue/90">
              <Link href={`/app/applications/new/${application.type}?draft=${application.id}`}>
                Continue
              </Link>
            </Button>
          ) : application.status === "submitted" || application.status === "under-review" ? (
            <Button
              type="button"
              className="bg-ecg-blue text-white hover:bg-ecg-blue/90"
              onClick={() => {
                const next = advanceApplicationReview(application.id)
                toast.success(
                  next?.status === "approved"
                    ? "Review complete. Certificate issued locally."
                    : `Moved to ${REVIEW_STAGES[Math.min((next?.reviewStage ?? 1) - 1, REVIEW_STAGES.length - 1)]?.title}.`,
                )
              }}
            >
              Continue review
            </Button>
          ) : null}
        </div>
      </div>

      {application.status !== "draft" ? (
        <div className="overflow-x-auto rounded-2xl border bg-card px-4 py-5">
          <ol className="flex min-w-max gap-0">
            {REVIEW_STAGES.map((stage, index) => {
              const complete = index < currentStage
              const current = index === currentStage && application.status !== "approved"
              const issued = application.status === "approved"
              return (
                <li key={stage.title} className="relative flex w-36 flex-col items-center px-2 text-center">
                  {index < REVIEW_STAGES.length - 1 ? (
                    <span
                      className={cn(
                        "absolute top-4 left-[calc(50%+16px)] h-px w-[calc(100%-32px)]",
                        complete || issued ? "bg-emerald-500" : "bg-slate-200",
                      )}
                    />
                  ) : null}
                  <span
                    className={cn(
                      "relative z-10 flex size-8 items-center justify-center rounded-full text-sm font-semibold",
                      (complete || issued) && "bg-emerald-500 text-white",
                      current && "bg-ecg-blue text-white",
                      !complete && !current && !issued && "border border-slate-200 text-slate-400",
                    )}
                  >
                    {complete || issued ? <Check className="size-4" /> : index + 1}
                  </span>
                  <p className="mt-2 text-xs font-semibold">{stage.title}</p>
                  <p className="text-[11px] text-muted-foreground">{stage.description}</p>
                </li>
              )
            })}
          </ol>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <Tabs defaultValue="overview" className="rounded-2xl border bg-card p-4 sm:p-5">
          <TabsList variant="line" className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="history">Review History</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="certificate">Certificate</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-5">
            {isWizardPayload(application.payload) ? (
              <ReviewStep type={application.type} payload={application.payload} readOnly />
            ) : (
              <p className="text-sm text-muted-foreground">No structured payload on this record.</p>
            )}
          </TabsContent>
          <TabsContent value="documents" className="mt-5 space-y-2">
            {documents.length === 0 ? (
              <p className="text-sm text-muted-foreground">No files attached to this application.</p>
            ) : (
              documents.map((document) => (
                <div
                  key={document.id}
                  className="flex items-center justify-between rounded-xl border px-4 py-3 text-sm"
                >
                  <div>
                    <p className="font-medium">{document.name}</p>
                    <p className="text-xs text-muted-foreground">{document.category}</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => toast.success(`Downloading ${document.name}`)}
                  >
                    Download
                  </Button>
                </div>
              ))
            )}
          </TabsContent>
          <TabsContent value="history" className="mt-5 space-y-3">
            {application.reviewHistory.length === 0 ? (
              <p className="text-sm text-muted-foreground">Review has not started.</p>
            ) : (
              application.reviewHistory.map((event) => (
                <div key={`${event.title}-${event.at}`} className="rounded-xl border px-4 py-3">
                  <p className="text-sm font-semibold">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {event.actor} · {new Date(event.at).toLocaleString("en-GB")}
                  </p>
                  <p className="mt-1 text-sm">{event.note}</p>
                </div>
              ))
            )}
          </TabsContent>
          <TabsContent value="payments" className="mt-5">
            {invoice ? (
              <div className="flex items-center justify-between rounded-xl border px-4 py-3">
                <div>
                  <p className="font-medium">{invoice.reference}</p>
                  <p className="text-sm text-muted-foreground">{invoice.description}</p>
                </div>
                <StatusBadge status={invoice.status} />
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No invoice for this application.</p>
            )}
          </TabsContent>
          <TabsContent value="certificate" className="mt-5">
            {certificate ? (
              <div className="rounded-xl border px-4 py-4">
                <p className="font-semibold">{certificate.number}</p>
                <p className="text-sm text-muted-foreground">{certificate.classLabel}</p>
                <Button
                  type="button"
                  className="mt-3 bg-ecg-blue text-white hover:bg-ecg-blue/90"
                  onClick={() => toast.success(`Downloading ${certificate.number}.pdf`)}
                >
                  Download certificate
                </Button>
              </div>
            ) : application.status === "approved" && application.type === "supplier" ? (
              <div className="rounded-xl border px-4 py-4">
                <p className="font-semibold">On the ECG vendor list</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Supplier registration does not issue a certificate. {application.reference} is
                  listed as an approved ECG vendor in this prototype.
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                A certificate is issued after the review pipeline completes.
              </p>
            )}
          </TabsContent>
        </Tabs>

        <aside className="space-y-4">
          {application.status === "under-review" || application.status === "approved" ? (
            <div className="rounded-2xl border bg-card p-5">
              <p className="text-sm font-semibold">AI Review</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Simulated analysis of the application file.
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-emerald-700">
                <li>Company details are valid</li>
                <li>Regulatory documents are in order</li>
                <li>No adverse records found</li>
              </ul>
            </div>
          ) : null}
          {invoice?.status === "due" ? (
            <div className="rounded-2xl border bg-card p-5">
              <p className="text-sm font-semibold">Invoice due</p>
              <p className="mt-1 text-xs text-muted-foreground">{invoice.reference}</p>
              <Button
                type="button"
                className="mt-3 w-full bg-ecg-blue text-white hover:bg-ecg-blue/90"
                onClick={() => setPayOpen(true)}
              >
                Pay now
              </Button>
            </div>
          ) : null}
        </aside>
      </div>

      <PayInvoiceDialog payment={invoice ?? null} open={payOpen} onOpenChange={setPayOpen} />
    </div>
  )
}
