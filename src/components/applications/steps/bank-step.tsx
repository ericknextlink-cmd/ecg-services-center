import { ACCOUNT_TYPES, BANKS, type BankInfo } from "@/lib/data/wizard"
import {
  WizardField,
  WizardInput,
  WizardSelect,
} from "@/components/applications/wizard-fields"

export function BankStep({
  bank,
  onChange,
}: {
  bank: BankInfo
  onChange: (next: BankInfo) => void
}) {
  function update<K extends keyof BankInfo>(key: K, value: BankInfo[K]) {
    onChange({ ...bank, [key]: value })
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <WizardField label="Bank Name" required>
        <WizardSelect
          value={bank.bankName}
          placeholder="Select bank"
          options={BANKS}
          onValueChange={(value) => update("bankName", value)}
        />
      </WizardField>
      <WizardField label="Account Name" required>
        <WizardInput
          value={bank.accountName}
          placeholder="Enter account name"
          onChange={(event) => update("accountName", event.target.value)}
        />
      </WizardField>
      <WizardField label="Account Number" required>
        <WizardInput
          value={bank.accountNumber}
          placeholder="Enter account number"
          onChange={(event) => update("accountNumber", event.target.value)}
        />
      </WizardField>
      <WizardField label="Branch" required>
        <WizardInput
          value={bank.branch}
          placeholder="Enter branch"
          onChange={(event) => update("branch", event.target.value)}
        />
      </WizardField>
      <WizardField label="Account Type" required>
        <WizardSelect
          value={bank.accountType}
          placeholder="Select account type"
          options={ACCOUNT_TYPES}
          onValueChange={(value) => update("accountType", value)}
        />
      </WizardField>
    </div>
  )
}
