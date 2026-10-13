import { PlaceholderPage } from "@/components/app-shell/placeholder-page"

export default function DocumentsPage() {
  return (
    <PlaceholderPage
      title="Documents"
      description="Company documents uploaded across applications will live here. Start an application to attach the required files."
      actionHref="/app/applications/new"
      actionLabel="Start Application"
    />
  )
}
