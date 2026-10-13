"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building2,
  FileBadge,
  Landmark,
  Send,
  ShieldCheck,
} from "lucide-react"
import { toast } from "sonner"

import { usePageHeader } from "@/components/app-shell/page-header-context"
import { BankStep } from "@/components/applications/steps/bank-step"
import { CompanyStep } from "@/components/applications/steps/company-step"
import { DirectorsStep } from "@/components/applications/steps/directors-step"
import { DocumentsStep } from "@/components/applications/steps/documents-step"
import { ExperienceStep } from "@/components/applications/steps/experience-step"
import { LicenseStep } from "@/components/applications/steps/license-step"
import { PersonnelStep } from "@/components/applications/steps/personnel-step"
import { ReviewStep } from "@/components/applications/steps/review-step"
import { WizardAside } from "@/components/applications/wizard-aside"
import { WizardStepper } from "@/components/applications/wizard-stepper"
import { Button } from "@/components/ui/button"
import { useSession } from "@/hooks/use-session"
import {
  applicationTypeById,
  type ApplicationTypeId,
} from "@/lib/data/applications"
import {
  LICENSE_CLASSES,
  WIZARD_PAGE_COPY,
  WIZARD_STEPS,
  canAdvance,
  createInitialPayload,
  type WizardPayload,
  type WizardStepId,
} from "@/lib/data/wizard"
import { upsertApplication, type StoredApplication } from "@/lib/session"
import {
  nextApplicationReference,
  recordApplicationSubmission,
} from "@/lib/workspace"

const STEP_ICONS: Record<WizardStepId, typeof Building2> = {
  company: Building2,
  directors: Building2,
  documents: FileBadge,
  license: FileBadge,
  experience: Briefcase,
  personnel: ShieldCheck,
  bank: Landmark,
  review: FileBadge,
}

function isWizardPayload(value: unknown): value is WizardPayload {
  if (!value || typeof value !== "object") {
    return false
  }
  const candidate = value as WizardPayload
  return Boolean(candidate.company && candidate.directors && candidate.bank)
}

export function ApplicationWizard({ type }: { type: ApplicationTypeId }) {
  const applicationType = applicationTypeById(type)
  const router = useRouter()
  const searchParams = useSearchParams()
  const draftId = searchParams.get("draft")
  const renewalId = searchParams.get("renewal")
  const { user, applications, workspace, saveApplications } = useSession()
  const steps = WIZARD_STEPS[type]
  const copy = WIZARD_PAGE_COPY[type]
  const [stepIndex, setStepIndex] = useState(0)
  const [applicationId, setApplicationId] = useState<string | null>(null)
  const [payload, setPayload] = useState<WizardPayload>(() => createInitialPayload(user))

  const didLoad = useRef(false)
  useEffect(() => {
    if (didLoad.current) {
      return
    }
    didLoad.current = true

    const existing = draftId
      ? applications.find((item) => item.id === draftId && item.type === type)
      : undefined

    if (existing && isWizardPayload(existing.payload)) {
      setApplicationId(existing.id)
      setPayload(existing.payload)
      const savedStep = existing.payload as WizardPayload & { stepIndex?: number }
      if (typeof savedStep.stepIndex === "number") {
        setStepIndex(Math.min(savedStep.stepIndex, steps.length - 1))
      }
      return
    }

    const certificate = renewalId
      ? workspace.certificates.find((item) => item.id === renewalId && item.type === type)
      : undefined
    const initial = createInitialPayload(user)

    if (certificate) {
      const source = applications.find((item) => item.id === certificate.applicationId)
      const base = source && isWizardPayload(source.payload) ? source.payload : initial
      setApplicationId(crypto.randomUUID())
      setPayload({
        ...base,
        declared: false,
        license: {
          ...base.license,
          licenseType:
            certificate.type === "external-license"
              ? "External Electrical Licence"
              : "Contractor Licence",
          licenseNumber: certificate.number,
          dateOfIssue: certificate.issuedOn.slice(0, 10),
          dateOfExpiry: certificate.expiresOn.slice(0, 10),
          licenseClass: LICENSE_CLASSES.includes(certificate.classLabel)
            ? certificate.classLabel
            : "Class A / Electrical",
          issuedBy: "Electricity Company of Ghana",
          documentName: `${certificate.number}.pdf`,
        },
      })
      return
    }

    setApplicationId(crypto.randomUUID())
    setPayload(initial)
  }, [applications, draftId, renewalId, steps.length, type, user, workspace.certificates])

  const current = steps[stepIndex]
  const PageIcon = STEP_ICONS[current.id]
  const pageTitle = current.id === "experience" ? current.title : copy.title
  const pageSubtitle =
    current.id === "experience"
      ? "Provide details of relevant work experience in electrical installations or related projects."
      : copy.subtitle

  usePageHeader({
    title: renewalId ? "Renewal" : "New Application",
    breadcrumbs: [
      { label: "Dashboard", href: "/app/dashboard" },
      {
        label: renewalId ? "Renewals" : "New Application",
        href: renewalId ? "/app/renewals" : "/app/applications/new",
      },
      { label: applicationType?.shortTitle ?? copy.title, href: `/app/applications/new/${type}` },
      { label: current.title },
    ],
  })

  const canContinue = useMemo(
    () => (current.id === "review" ? true : canAdvance(current.id, payload)),
    [current.id, payload],
  )

  function persist(status: StoredApplication["status"], nextPayload = payload) {
    if (!applicationId || !applicationType) {
      return null
    }

    const existing = applications.find((item) => item.id === applicationId)
    const now = new Date().toISOString()
    const submittedNow = status === "submitted" && existing?.status !== "submitted"
    const application: StoredApplication = {
      id: applicationId,
      reference: existing?.reference ?? nextApplicationReference(),
      type,
      title: `${renewalId ? "Renewal" : applicationType.title} — ${nextPayload.company.companyName || user?.companyName || "New application"}`,
      status,
      reviewStage: submittedNow ? 1 : existing?.reviewStage ?? 0,
      reviewHistory: submittedNow
        ? [
            ...(existing?.reviewHistory ?? []),
            {
              title: "Submitted",
              actor: user?.contactName ?? "Applicant",
              at: now,
              note: "Application received.",
            },
          ]
        : existing?.reviewHistory ?? [],
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
      payload: { ...nextPayload, stepIndex },
    }
    upsertApplication(application)
    saveApplications([
      application,
      ...applications.filter((item) => item.id !== application.id),
    ])
    return application
  }

  function saveAndExit() {
    persist("draft")
    toast.success("Draft saved. You can continue later.")
    router.push("/app/applications")
  }

  function submit() {
    if (!payload.declared) {
      toast.error("Please accept the declaration before submitting.")
      return
    }
    const application = persist("submitted")
    if (application) {
      recordApplicationSubmission(application)
      toast.success("Application submitted. ECG will review it shortly.")
      router.push(`/app/applications/${application.id}`)
    }
  }

  if (!applicationType) {
    return <p>Unknown application type.</p>
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-ecg-blue">
          <PageIcon className="size-5" />
        </span>
        <div>
          <h1 className="text-xl font-bold text-ecg-navy sm:text-2xl">{pageTitle}</h1>
          <p className="mt-1 text-sm text-slate-500">{pageSubtitle}</p>
        </div>
      </div>

      <div className="mb-6 overflow-x-auto rounded-2xl border border-slate-100 bg-white px-3 py-5 sm:px-6">
        <WizardStepper steps={steps} currentIndex={stepIndex} />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-ecg-navy">{current.title}</h2>
            {current.id === "company" ? (
              <p className="mt-1 text-sm text-slate-500">
                Provide basic information about your company.
              </p>
            ) : null}
          </div>

          {current.id === "company" ? (
            <CompanyStep
              company={payload.company}
              onChange={(company) => setPayload((currentPayload) => ({ ...currentPayload, company }))}
            />
          ) : null}
          {current.id === "directors" ? (
            <DirectorsStep
              directors={payload.directors}
              onChange={(directors) =>
                setPayload((currentPayload) => ({ ...currentPayload, directors }))
              }
            />
          ) : null}
          {current.id === "documents" ? (
            <DocumentsStep
              documents={payload.documents}
              onChange={(documents) =>
                setPayload((currentPayload) => ({ ...currentPayload, documents }))
              }
            />
          ) : null}
          {current.id === "license" ? (
            <LicenseStep
              license={payload.license}
              onChange={(license) => setPayload((currentPayload) => ({ ...currentPayload, license }))}
            />
          ) : null}
          {current.id === "experience" ? (
            <ExperienceStep
              experience={payload.experience}
              onChange={(experience) =>
                setPayload((currentPayload) => ({ ...currentPayload, experience }))
              }
            />
          ) : null}
          {current.id === "personnel" ? (
            <PersonnelStep
              personnel={payload.personnel}
              onChange={(personnel) =>
                setPayload((currentPayload) => ({ ...currentPayload, personnel }))
              }
            />
          ) : null}
          {current.id === "bank" ? (
            <BankStep
              bank={payload.bank}
              onChange={(bank) => setPayload((currentPayload) => ({ ...currentPayload, bank }))}
            />
          ) : null}
          {current.id === "review" ? (
            <ReviewStep
              type={type}
              payload={payload}
              onEdit={(stepId) => {
                const index = steps.findIndex((step) => step.id === stepId)
                if (index >= 0) {
                  setStepIndex(index)
                }
              }}
              onDeclaredChange={(declared) =>
                setPayload((currentPayload) => ({ ...currentPayload, declared }))
              }
            />
          ) : null}

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
            {stepIndex === 0 ? (
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-lg px-5"
                onClick={saveAndExit}
              >
                Save & Exit
              </Button>
            ) : (
              <Button
                type="button"
                variant="ghost"
                className="h-11 w-fit px-2 text-slate-600"
                onClick={() => setStepIndex((currentStep) => currentStep - 1)}
              >
                <ArrowLeft className="size-4" />
                Previous Step
              </Button>
            )}

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              {stepIndex === 0 ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="h-11 text-slate-500"
                  onClick={() => router.push("/app/applications/new")}
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 rounded-lg px-5"
                  onClick={saveAndExit}
                >
                  Save & Exit
                </Button>
              )}
              {current.id === "review" ? (
                <Button
                  type="button"
                  className="h-11 rounded-lg bg-ecg-blue px-5 text-white hover:bg-ecg-blue/90"
                  onClick={submit}
                >
                  Submit Application
                  <Send className="size-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  className="h-11 rounded-lg bg-ecg-blue px-5 text-white hover:bg-ecg-blue/90"
                  disabled={!canContinue}
                  onClick={() => setStepIndex((currentStep) => currentStep + 1)}
                >
                  Next Step
                  <ArrowRight className="size-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <WizardAside
          steps={steps}
          currentIndex={stepIndex}
          variant={current.id === "review" ? "declaration" : "help"}
          declaration={
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <span className="mb-3 flex size-10 items-center justify-center rounded-full bg-sky-50 text-ecg-blue">
                <ShieldCheck className="size-4" />
              </span>
              <p className="text-sm font-semibold text-ecg-navy">Declaration</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                By submitting this application, you confirm that all information and documents
                provided are true and correct.
              </p>
              <p className="mt-3 text-xs leading-5 text-slate-500">
                You may be contacted for verification if further information is required.
              </p>
            </div>
          }
        />
      </div>
    </div>
  )
}
