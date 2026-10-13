import { MarketingPage } from "@/components/marketing/marketing-page"
import { ECG_CONTACTS } from "@/lib/data/navigation"

export default function PublicHelpPage() {
  return (
    <MarketingPage title="Help & Support">
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        For application status, document requirements or account access, contact ECG
        procurement at {ECG_CONTACTS.email} or {ECG_CONTACTS.phone}.
      </p>
    </MarketingPage>
  )
}
