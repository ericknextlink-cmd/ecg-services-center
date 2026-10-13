import { MarketingPage } from "@/components/marketing/marketing-page"

export default function TermsPage() {
  return (
    <MarketingPage title="Terms & Conditions">
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        Use of the ECG Vendor Registration & Certification System is subject to ECG
        procurement rules, document authenticity requirements, and evaluation against the
        published classification schedule. Submitting an application does not create a right
        to award, engagement or payment.
      </p>
    </MarketingPage>
  )
}
