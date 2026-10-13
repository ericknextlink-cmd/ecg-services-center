"use client"

import { FileUp } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSession } from "@/hooks/use-session"
import { addWorkspaceDocument } from "@/lib/workspace"

export default function DocumentsPage() {
  const { workspace } = useSession()

  function upload(file?: File) {
    if (!file) {
      return
    }
    addWorkspaceDocument({
      id: `doc-${Date.now()}`,
      name: file.name,
      category: "Supporting document",
      uploadedAt: new Date().toISOString(),
      sizeLabel: `${Math.max(1, Math.round(file.size / 1024))} KB`,
    })
    toast.success("File stored on this device. Nothing was uploaded to ECG.")
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Documents</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Files attached to applications and your company vault. Downloads are simulated.
          </p>
        </div>
        <label>
          <input
            type="file"
            className="sr-only"
            onChange={(event) => upload(event.target.files?.[0])}
          />
          <span className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-ecg-blue px-4 text-sm font-medium text-white">
            <FileUp className="size-4" />
            Upload document
          </span>
        </label>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead>File</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workspace.documents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                  No documents yet. Upload a file or start an application.
                </TableCell>
              </TableRow>
            ) : (
              workspace.documents.map((document) => (
                <TableRow key={document.id}>
                  <TableCell className="font-medium">{document.name}</TableCell>
                  <TableCell>{document.category}</TableCell>
                  <TableCell>{document.sizeLabel}</TableCell>
                  <TableCell>
                    {new Date(document.uploadedAt).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => toast.success(`Download started for ${document.name}.`)}
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
