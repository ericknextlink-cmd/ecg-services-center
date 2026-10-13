import { MarketingFooter } from "@/components/marketing/marketing-footer"
import { MarketingHeader } from "@/components/marketing/marketing-header"

export function MarketingPage({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:py-12 lg:px-8">
        <h1 className="text-3xl font-bold text-ecg-navy sm:text-4xl dark:text-foreground">{title}</h1>
        <div className="prose prose-slate mt-6 max-w-none dark:prose-invert">{children}</div>
      </main>
      <MarketingFooter />
    </div>
  )
}
