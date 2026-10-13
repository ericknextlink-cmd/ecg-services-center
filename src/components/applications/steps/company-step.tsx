import {
  COMPANY_TYPES,
  NATURE_OF_BUSINESS,
  type CompanyInfo,
} from "@/lib/data/wizard"
import {
  WizardDateInput,
  WizardField,
  WizardInput,
  WizardSelect,
} from "@/components/applications/wizard-fields"

export function CompanyStep({
  company,
  onChange,
}: {
  company: CompanyInfo
  onChange: (next: CompanyInfo) => void
}) {
  function update<K extends keyof CompanyInfo>(key: K, value: CompanyInfo[K]) {
    onChange({ ...company, [key]: value })
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <WizardField label="Company Name" required>
        <WizardInput
          value={company.companyName}
          placeholder="Enter company name"
          onChange={(event) => update("companyName", event.target.value)}
        />
      </WizardField>
      <WizardField label="Email Address" required>
        <WizardInput
          type="email"
          value={company.email}
          placeholder="Enter email address"
          onChange={(event) => update("email", event.target.value)}
        />
      </WizardField>
      <WizardField label="Company Registration Number" required>
        <WizardInput
          value={company.registrationNumber}
          placeholder="Enter registration number"
          onChange={(event) => update("registrationNumber", event.target.value)}
        />
      </WizardField>
      <WizardField label="Phone Number" required>
        <div className="flex gap-2">
          <div className="flex h-11 items-center gap-1.5 rounded-lg border border-input bg-white px-3 text-sm">
            <span aria-hidden>🇬🇭</span>
            <span className="text-slate-600">+233</span>
          </div>
          <WizardInput
            value={company.phone}
            placeholder="Enter phone number"
            className="flex-1"
            onChange={(event) => update("phone", event.target.value)}
          />
        </div>
      </WizardField>
      <WizardField label="Date of Incorporation" required>
        <WizardDateInput
          value={company.dateOfIncorporation}
          onChange={(event) => update("dateOfIncorporation", event.target.value)}
        />
      </WizardField>
      <WizardField label="Website (Optional)">
        <WizardInput
          value={company.website}
          placeholder="Enter website address"
          onChange={(event) => update("website", event.target.value)}
        />
      </WizardField>
      <WizardField label="Nature of Business" required>
        <WizardSelect
          value={company.natureOfBusiness}
          placeholder="Select nature of business"
          options={NATURE_OF_BUSINESS}
          onValueChange={(value) => update("natureOfBusiness", value)}
        />
      </WizardField>
      <WizardField label="Company Type" required>
        <WizardSelect
          value={company.companyType}
          placeholder="Select company type"
          options={COMPANY_TYPES}
          onValueChange={(value) => update("companyType", value)}
        />
      </WizardField>
    </div>
  )
}
