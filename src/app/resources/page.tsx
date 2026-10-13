import { ClassificationTables } from "@/components/classification/classification-tables"
import { MarketingFooter } from "@/components/marketing/marketing-footer"
import { MarketingHeader } from "@/components/marketing/marketing-header"

export default function ResourcesPage() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:py-12 lg:px-8">
        <h1 className="text-3xl font-bold sm:text-4xl">Resources</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          ECG contractor classification categories and score bands used during evaluation.
        </p>
        <div className="mt-8">
          <ClassificationTables />
        </div>
      </main>
      <MarketingFooter />
    </div>
  )
}
