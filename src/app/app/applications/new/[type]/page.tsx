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

  return <ApplicationWizard type={type as ApplicationTypeId} />
}
