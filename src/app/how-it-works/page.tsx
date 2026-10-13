import { MarketingPage } from "@/components/marketing/marketing-page"

export default function HowItWorksPage() {
  return (
    <MarketingPage title="How it works">
      <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-6 text-muted-foreground">
        <li>Create a company account with your TIN and primary contact.</li>
        <li>Choose Supplier registration, Classification Certificate, or External Licence.</li>
        <li>Complete the form, attach required documents, and submit.</li>
        <li>ECG evaluates capacity. Classification uses the published category and class tables.</li>
        <li>Track status in real time and download the issued certificate or licence.</li>
      </ol>
    </MarketingPage>
  )
}
