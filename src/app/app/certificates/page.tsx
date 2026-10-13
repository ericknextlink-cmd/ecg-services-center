"use client"

import Link from "next/link"
import { toast } from "sonner"

import { StatusBadge } from "@/components/app-shell/status-badge"
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

export default function CertificatesPage() {
  const { workspace } = useSession()

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold sm:text-3xl">Certificates & Licences</h1>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        Issued after ECG review. Download and renewal actions stay on this device.
      </p>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <Summary label="Active" value={workspace.certificates.filter((item) => item.status === "active").length} />
        <Summary
          label="Expiring soon"
          value={workspace.certificates.filter((item) => item.status === "expiring-soon").length}
        />
        <Summary label="Expired" value={workspace.certificates.filter((item) => item.status === "expired").length} />
      </div>

      <div className="overflow-hidden rounded-2xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead>Certificate ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Class / Category</TableHead>
              <TableHead>Issue date</TableHead>
              <TableHead>Expiry date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workspace.certificates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-sm text-muted-foreground">
                  No certificates yet. Submit a classification or licence application to see one issued after review.
                </TableCell>
              </TableRow>
            ) : (
              workspace.certificates.map((certificate) => (
                <TableRow key={certificate.id}>
                  <TableCell className="font-medium">{certificate.number}</TableCell>
                  <TableCell className="capitalize">
                    {certificate.type.replace("-", " ")}
                  </TableCell>
                  <TableCell>{certificate.classLabel}</TableCell>
                  <TableCell>{new Date(certificate.issuedOn).toLocaleDateString("en-GB")}</TableCell>
                  <TableCell>{new Date(certificate.expiresOn).toLocaleDateString("en-GB")}</TableCell>
                  <TableCell>
                    <StatusBadge status={certificate.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => toast.success(`Downloading ${certificate.number}.pdf`)}
                    >
                      Download
                    </Button>
                    {certificate.status !== "active" ? (
                      <Button asChild size="sm" className="bg-ecg-blue text-white hover:bg-ecg-blue/90">
                        <Link href={`/app/applications/new/${certificate.type}?renewal=${certificate.id}`}>
                          Renew
                        </Link>
                      </Button>
                    ) : null}
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

function Summary({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border bg-card px-4 py-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  )
}
