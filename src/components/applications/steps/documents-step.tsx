import { Info, Upload } from "lucide-react"

import { cn } from "cn"
import { COMPLIANCE_DOCUMENTS } from "@/lib/data/wizard"
import { WizardNotice } from "@/components/applications/wizard-fields"

export function DocumentsStep({
  documents,
  onChange,
}: {
  documents: Record<string, string>
  onChange: (next: Record<string, string>) => void
}) {
  function handleFile(id: string, file?: File) {
    if (!file) {
      return
    }
    onChange({ ...documents, [id]: file.name })
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500">
        Upload the required statutory documents. All documents must be clear and valid.
      </p>
      {COMPLIANCE_DOCUMENTS.map((document) => {
        const uploaded = documents[document.id]
        const Icon = document.icon
        return (
          <div
            key={document.id}
            className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 sm:flex-row sm:items-center"
          >
            <span
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-lg",
                document.tone,
              )}
            >
              <Icon className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ecg-navy">
                {document.title}
                {document.required ? <span className="text-red-500"> *</span> : null}
              </p>
              <p className="text-xs text-slate-500">
                {uploaded ? `Uploaded: ${uploaded}` : document.description}
              </p>
            </div>
            <div className="flex items-center gap-3 sm:shrink-0">
              <label className="inline-flex">
                <input
                  type="file"
                  className="sr-only"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(event) => handleFile(document.id, event.target.files?.[0])}
                />
                <span className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  <Upload className="size-3.5" />
                  {uploaded ? "Replace File" : "Upload File"}
                </span>
              </label>
              <p className="hidden text-xs text-slate-400 lg:block">{document.accept}</p>
            </div>
          </div>
        )
      })}
      <WizardNotice className="mt-4">
        <Info className="mt-0.5 size-4 shrink-0" />
        <span>
          Ensure all documents are valid and not expired. Incomplete or invalid documents may
          delay the review of your application.
        </span>
      </WizardNotice>
    </div>
  )
}
