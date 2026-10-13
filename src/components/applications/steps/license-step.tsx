import { CloudUpload, Info } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  ISSUED_BY,
  LICENSE_CLASSES,
  LICENSE_TYPES,
  type LicenseInfo,
} from "@/lib/data/wizard"
import {
  WizardDateInput,
  WizardField,
  WizardInput,
  WizardNotice,
  WizardSelect,
} from "@/components/applications/wizard-fields"

export function LicenseStep({
  license,
  onChange,
}: {
  license: LicenseInfo
  onChange: (next: LicenseInfo) => void
}) {
  function update<K extends keyof LicenseInfo>(key: K, value: LicenseInfo[K]) {
    onChange({ ...license, [key]: value })
  }

  return (
    <div className="space-y-6">
      <WizardNotice>
        <Info className="mt-0.5 size-4 shrink-0" />
        <span>
          Your External License is required before you can proceed to add work experience and
          work personnel.
        </span>
      </WizardNotice>

      <div>
        <div className="mb-4 flex items-center gap-2">
          <p className="text-sm font-semibold text-ecg-navy">Existing External License</p>
          <Badge className="rounded-md bg-red-500 px-2 py-0 text-[10px] text-white">
            Required
          </Badge>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          <WizardField label="License Type" required>
            <WizardSelect
              value={license.licenseType}
              placeholder="Select license type"
              options={LICENSE_TYPES}
              onValueChange={(value) => update("licenseType", value)}
            />
          </WizardField>
          <WizardField label="License Number" required>
            <WizardInput
              value={license.licenseNumber}
              placeholder="Enter license number"
              onChange={(event) => update("licenseNumber", event.target.value)}
            />
          </WizardField>
          <WizardField label="Date of Issue" required>
            <WizardDateInput
              value={license.dateOfIssue}
              onChange={(event) => update("dateOfIssue", event.target.value)}
            />
          </WizardField>
          <WizardField label="Date of Expiry" required>
            <WizardDateInput
              value={license.dateOfExpiry}
              onChange={(event) => update("dateOfExpiry", event.target.value)}
            />
          </WizardField>
          <WizardField label="License Class / Category" required>
            <WizardSelect
              value={license.licenseClass}
              placeholder="Select class / category"
              options={LICENSE_CLASSES}
              onValueChange={(value) => update("licenseClass", value)}
            />
          </WizardField>
          <WizardField label="Issued By" required>
            <WizardSelect
              value={license.issuedBy}
              placeholder="Select issuing body"
              options={ISSUED_BY}
              onValueChange={(value) => update("issuedBy", value)}
            />
          </WizardField>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-semibold text-ecg-navy">
            Upload External License Document <span className="text-red-500">*</span>
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Upload a clear copy of your valid External License certificate.
          </p>
          <label className="mt-3 flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-4 text-center">
            <input
              type="file"
              className="sr-only"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(event) =>
                update("documentName", event.target.files?.[0]?.name ?? license.documentName)
              }
            />
            <CloudUpload className="size-8 text-ecg-blue" />
            <p className="mt-2 text-sm text-slate-600">
              Drag and drop file here or{" "}
              <span className="font-semibold text-ecg-blue">browse</span>
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {license.documentName || "PDF, PNG, JPG (Max. 10MB)"}
            </p>
          </label>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-sm font-semibold text-ecg-navy">Tips</p>
          <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-500">
            <li>License must be valid at the time of application.</li>
            <li>Ensure all details are clearly visible.</li>
            <li>File size should not exceed 10MB.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
