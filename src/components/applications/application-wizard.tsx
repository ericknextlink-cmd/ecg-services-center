"use client"

import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { toast } from "sonner"

import { ClassificationTables } from "@/components/classification/classification-tables"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "@/hooks/use-session"
import {
  applicationTypeById,
  REQUIRED_DOCUMENTS,
  type ApplicationTypeId,
} from "@/lib/data/applications"
import { CLASSIFICATION_CATEGORIES } from "@/lib/data/classification"
import { upsertApplication } from "@/lib/session"

const STEPS = ["Details", "Scope", "Documents", "Review"] as const

export function ApplicationWizard({ type }: { type: ApplicationTypeId }) {
  const applicationType = applicationTypeById(type)
  const router = useRouter()
  const { user, applications, saveApplications } = useSession()
  const [step, setStep] = useState(0)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([])
  const [notes, setNotes] = useState("")
  const [yearsInOperation, setYearsInOperation] = useState("5")
  const [technicalStaff, setTechnicalStaff] = useState("8")
  const [region, setRegion] = useState("Greater Accra")

  const documents = REQUIRED_DOCUMENTS[type]
  const progress = ((step + 1) / STEPS.length) * 100

  const canContinue = useMemo(() => {
    if (step === 1 && type === "classification") {
      return selectedCategories.length > 0
    }
    if (step === 2) {
      return uploadedDocuments.length === documents.length
    }
    return true
  }, [documents.length, selectedCategories.length, step, type, uploadedDocuments.length])

  if (!applicationType) {
    return <p>Unknown application type.</p>
  }

  function toggleCategory(categoryId: string) {
    setSelectedCategories((current) =>
      current.includes(categoryId)
        ? current.filter((id) => id !== categoryId)
        : [...current, categoryId],
    )
  }

  function toggleDocument(documentName: string) {
    setUploadedDocuments((current) =>
      current.includes(documentName)
        ? current.filter((name) => name !== documentName)
        : [...current, documentName],
    )
  }

  function submit(status: "draft" | "submitted") {
    const application = {
      id: crypto.randomUUID(),
      type,
      title: `${applicationType!.title} — ${user?.companyName ?? "New application"}`,
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      payload: {
        selectedCategories,
        uploadedDocuments,
        notes,
        yearsInOperation,
        technicalStaff,
        region,
        companyName: user?.companyName,
      },
    }
    upsertApplication(application)
    saveApplications([application, ...applications.filter((item) => item.id !== application.id)])
    toast.success(
      status === "draft"
        ? "Draft saved. You can continue later."
        : "Application submitted. ECG will review it shortly.",
    )
    router.push("/app/applications")
  }

  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-sm font-medium text-ecg-blue dark:text-ecg-gold">New application</p>
      <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{applicationType.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">{applicationType.dashboardDescription}</p>
      <div className="mt-6">
        <div className="mb-2 flex justify-between gap-2 text-xs font-medium text-muted-foreground">
          {STEPS.map((label, index) => (
            <span key={label} className={index <= step ? "text-foreground" : undefined}>
              {index + 1}
              <span className="hidden sm:inline">. {label}</span>
            </span>
          ))}
        </div>
        <Progress value={progress} />
      </div>

      <div className="mt-6 rounded-2xl border bg-card p-4 sm:mt-8 sm:rounded-3xl sm:p-6">
        {step === 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Company">
              <Input value={user?.companyName ?? ""} readOnly />
            </Field>
            <Field label="Primary contact">
              <Input value={user?.contactName ?? ""} readOnly />
            </Field>
            <Field label="Region of operation">
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="h-10 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Greater Accra",
                    "Ashanti",
                    "Western",
                    "Eastern",
                    "Central",
                    "Northern",
                    "Volta",
                  ].map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Years in operation">
              <Input
                value={yearsInOperation}
                onChange={(event) => setYearsInOperation(event.target.value)}
              />
            </Field>
            <Field label="Technical staff count">
              <Input
                value={technicalStaff}
                onChange={(event) => setTechnicalStaff(event.target.value)}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Notes for ECG reviewers">
                <Textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Share relevant project experience, equipment, or specialisations."
                />
              </Field>
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          type === "classification" ? (
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Select one or more work categories from ECG&apos;s classification schedule.
                Your class is assigned after evaluation against the score bands below.
              </p>
              <div className="space-y-3">
                {CLASSIFICATION_CATEGORIES.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-start gap-3 rounded-2xl border p-4"
                  >
                    <Checkbox
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => toggleCategory(category.id)}
                      className="mt-1"
                    />
                    <span>
                      <span className="block text-xs font-semibold text-muted-foreground">
                        Category {category.code}
                      </span>
                      <span className="text-sm">{category.title}</span>
                    </span>
                  </label>
                ))}
              </div>
              <ClassificationTables selectedCategoryIds={selectedCategories} />
            </div>
          ) : (
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                {type === "supplier"
                  ? "Tell ECG the goods or services you can supply. This profile is used for tender invitations."
                  : "Describe the electrical works you intend to undertake under an External Licence."}
              </p>
              <Field label="Scope summary">
                <Textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Summarise your scope of work or supply."
                />
              </Field>
            </div>
          )
        ) : null}

        {step === 2 ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Mark each required document as uploaded. File storage will be connected in a later phase.
            </p>
            {documents.map((documentName) => (
              <label key={documentName} className="flex items-center gap-3 rounded-2xl border p-4">
                <Checkbox
                  checked={uploadedDocuments.includes(documentName)}
                  onCheckedChange={() => toggleDocument(documentName)}
                />
                <span className="text-sm">{documentName}</span>
              </label>
            ))}
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-4 text-sm">
            <p>
              <span className="font-medium">Company:</span> {user?.companyName}
            </p>
            <p>
              <span className="font-medium">Type:</span> {applicationType.title}
            </p>
            <p>
              <span className="font-medium">Region:</span> {region}
            </p>
            {type === "classification" ? (
              <p>
                <span className="font-medium">Categories:</span>{" "}
                {selectedCategories
                  .map(
                    (id) =>
                      CLASSIFICATION_CATEGORIES.find((category) => category.id === id)?.code,
                  )
                  .join(", ")}
              </p>
            ) : null}
            <p>
              <span className="font-medium">Documents attached:</span> {uploadedDocuments.length}/
              {documents.length}
            </p>
            <p className="text-muted-foreground">
              Submitting this application does not guarantee certification. ECG will evaluate
              capacity, documents and, for classification, assign a class using the published score bands.
            </p>
          </div>
        ) : null}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:flex-wrap sm:justify-between">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => (step === 0 ? router.back() : setStep((current) => current - 1))}
          >
            Back
          </Button>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button type="button" variant="ghost" className="w-full sm:w-auto" onClick={() => submit("draft")}>
              Save draft
            </Button>
            {step < STEPS.length - 1 ? (
              <Button
                type="button"
                className="w-full sm:w-auto"
                disabled={!canContinue}
                onClick={() => setStep((current) => current + 1)}
              >
                Continue
              </Button>
            ) : (
              <Button type="button" className="w-full sm:w-auto" onClick={() => submit("submitted")}>
                Submit application
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  )
}
