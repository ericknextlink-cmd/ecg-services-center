import { MarketingPage } from "@/components/marketing/marketing-page"

export default function PrivacyPage() {
  return (
    <MarketingPage title="Privacy Policy">
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        Company and personal data collected in this portal is used to process vendor
        registration, classification and licensing. Data is stored securely and is not sold
        to third parties.
      </p>
    </MarketingPage>
  )
}
