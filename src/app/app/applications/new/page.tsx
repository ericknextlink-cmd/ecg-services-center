import { ApplicationTypeCards } from "@/components/app-shell/application-type-cards"

export default function NewApplicationPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold sm:text-3xl">Start a New Application</h1>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        Choose the type of application you want to start.
      </p>
      <ApplicationTypeCards />
    </div>
  )
}
