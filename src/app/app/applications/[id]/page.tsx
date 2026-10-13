"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

import { ClassificationTables } from "@/components/classification/classification-tables"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useSession } from "@/hooks/use-session"
import { CLASSIFICATION_CATEGORIES } from "@/lib/data/classification"

export default function ApplicationDetailPage() {
  const params = useParams<{ id: string }>()
  const { applications } = useSession()
  const application = applications.find((item) => item.id === params.id)

  if (!application) {
    return (
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold">Application not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This record is not in your local workspace.
        </p>
        <Button asChild className="mt-4">
          <Link href="/app/applications">Back to applications</Link>
        </Button>
      </div>
    )
  }

  const selectedCategories = (application.payload.selectedCategories as string[]) ?? []

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Application</p>
          <h1 className="text-2xl font-bold sm:text-3xl">{application.title}</h1>
        </div>
        <Badge variant="outline" className="capitalize">
          {application.status.replace("-", " ")}
        </Badge>
      </div>
      <div className="rounded-3xl border bg-card p-6 text-sm">
        <p>
          <span className="font-medium">Type:</span> {application.type}
        </p>
        <p className="mt-2">
          <span className="font-medium">Submitted:</span>{" "}
          {new Date(application.createdAt).toLocaleString("en-GB")}
        </p>
        {selectedCategories.length > 0 ? (
          <p className="mt-2">
            <span className="font-medium">Categories:</span>{" "}
            {selectedCategories
              .map(
                (id) =>
                  CLASSIFICATION_CATEGORIES.find((category) => category.id === id)?.title,
              )
              .join("; ")}
          </p>
        ) : null}
      </div>
      {application.type === "classification" ? (
        <ClassificationTables selectedCategoryIds={selectedCategories} />
      ) : null}
    </div>
  )
}
