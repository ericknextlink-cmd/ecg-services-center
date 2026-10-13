import { Suspense } from "react"
import { notFound } from "next/navigation"

import { ApplicationWizard } from "@/components/applications/application-wizard"
import {
  applicationTypeById,
  type ApplicationTypeId,
} from "@/lib/data/applications"

export default async function NewTypedApplicationPage({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  const { type } = await params
  const applicationType = applicationTypeById(type)

  if (!applicationType) {
    notFound()
  }

  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading application...</p>}>
      <ApplicationWizard type={type as ApplicationTypeId} />
    </Suspense>
  )
}
