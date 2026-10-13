import {
  Briefcase,
  Building2,
  FileBadge,
  FileText,
  Landmark,
  Pencil,
  Users,
} from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import type { ApplicationTypeId } from "@/lib/data/applications"
import {
  COMPLIANCE_DOCUMENTS,
  formatDisplayDate,
  type WizardPayload,
  type WizardStepId,
} from "@/lib/data/wizard"

function ReviewCard({
  icon: Icon,
  title,
  onEdit,
  children,
}: {
  icon: typeof Building2
  title: string
  onEdit?: () => void
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-slate-100 p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-slate-50 text-ecg-blue">
            <Icon className="size-4" />
          </span>
          <p className="text-sm font-semibold text-ecg-navy">{title}</p>
        </div>
        {onEdit ? (
          <button
            type="button"
            className="inline-flex items-center gap-1 text-sm font-medium text-ecg-blue"
            onClick={onEdit}
          >
            Edit
            <Pencil className="size-3.5" />
          </button>
        ) : null}
      </div>
      {children}
    </div>
  )
}

function Fact({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-800">{value || "—"}</p>
    </div>
  )
}

export function ReviewStep({
  type,
  payload,
  onEdit,
  onDeclaredChange,
  readOnly = false,
}: {
  type: ApplicationTypeId
  payload: WizardPayload
  onEdit?: (stepId: WizardStepId) => void
  onDeclaredChange?: (value: boolean) => void
  readOnly?: boolean
}) {
  const requiredDocs = COMPLIANCE_DOCUMENTS.filter((item) => item.required)
  const uploadedRequired = requiredDocs.filter((item) => payload.documents[item.id]).length
  const ownership = payload.directors.reduce(
    (sum, director) => sum + (Number(director.ownership) || 0),
    0,
  )

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">
        Please review all the information below before submitting your application.
      </p>

      <ReviewCard
        icon={Building2}
        title="Company Information"
        onEdit={readOnly ? undefined : () => onEdit?.("company")}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Fact label="Company Name" value={payload.company.companyName} />
          <Fact
            label="Date of Incorporation"
            value={formatDisplayDate(payload.company.dateOfIncorporation)}
          />
          <Fact label="Registration Number" value={payload.company.registrationNumber} />
          <Fact label="Company Type" value={payload.company.companyType} />
        </div>
      </ReviewCard>

      <ReviewCard
        icon={Users}
        title="Directors & Partners"
        onEdit={readOnly ? undefined : () => onEdit?.("directors")}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Fact label="Total Directors / Partners" value={String(payload.directors.length)} />
          <Fact label="Total Ownership" value={`${ownership}%`} />
        </div>
      </ReviewCard>

      <ReviewCard
        icon={FileText}
        title="Compliance Documents"
        onEdit={readOnly ? undefined : () => onEdit?.("documents")}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Fact label="Total Documents Uploaded" value={String(Object.keys(payload.documents).length)} />
          <Fact
            label="All Documents"
            value={
              <span className={uploadedRequired === requiredDocs.length ? "text-emerald-600" : "text-amber-600"}>
                {uploadedRequired === requiredDocs.length ? "Valid" : "Incomplete"}
              </span>
            }
          />
        </div>
      </ReviewCard>

      {type !== "supplier" ? (
        <ReviewCard
          icon={FileBadge}
          title="External License"
          onEdit={readOnly ? undefined : () => onEdit?.("license")}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Fact label="License Type" value={payload.license.licenseType} />
            <Fact label="License Number" value={payload.license.licenseNumber} />
            <Fact label="Class / Category" value={payload.license.licenseClass} />
            <Fact label="Issued By" value={payload.license.issuedBy} />
          </div>
        </ReviewCard>
      ) : null}

      {type === "classification" ? (
        <>
          <ReviewCard
            icon={Briefcase}
            title="Work Experience"
            onEdit={readOnly ? undefined : () => onEdit?.("experience")}
          >
            <Fact label="Projects added" value={String(payload.experience.length)} />
          </ReviewCard>
          <ReviewCard
            icon={Users}
            title="Work Personnel"
            onEdit={readOnly ? undefined : () => onEdit?.("personnel")}
          >
            <Fact label="Personnel added" value={String(payload.personnel.length)} />
          </ReviewCard>
        </>
      ) : null}

      <ReviewCard
        icon={Landmark}
        title="Bank Details"
        onEdit={readOnly ? undefined : () => onEdit?.("bank")}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Fact label="Bank Name" value={payload.bank.bankName} />
          <Fact label="Account Number" value={payload.bank.accountNumber} />
        </div>
      </ReviewCard>

      {readOnly ? null : (
        <label className="flex items-start gap-3 rounded-xl border border-slate-100 p-4 text-sm text-slate-600">
          <Checkbox
            checked={payload.declared}
            onCheckedChange={(checked) => onDeclaredChange?.(Boolean(checked))}
            className="mt-0.5"
          />
          <span>
            I hereby declare that the information provided in this application is true, complete and
            accurate to the best of my knowledge. I understand that any false information may lead to
            disqualification or legal action.
          </span>
        </label>
      )}
    </div>
  )
}
