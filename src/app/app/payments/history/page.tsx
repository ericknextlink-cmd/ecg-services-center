"use client"

import { StatusBadge } from "@/components/app-shell/status-badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSession } from "@/hooks/use-session"
import { formatCedis } from "@/lib/data/review"

export default function PaymentHistoryPage() {
  const { workspace } = useSession()
  const paid = workspace.payments.filter((item) => item.status === "paid")

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold sm:text-3xl">Payment History</h1>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        Receipts for invoices paid in this prototype.
      </p>
      <div className="overflow-hidden rounded-2xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead>Reference</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Paid on</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paid.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                  No payments yet.
                </TableCell>
              </TableRow>
            ) : (
              paid.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.reference}</TableCell>
                  <TableCell>{payment.description}</TableCell>
                  <TableCell>{formatCedis(payment.amount)}</TableCell>
                  <TableCell>
                    {payment.paidOn ? new Date(payment.paidOn).toLocaleString("en-GB") : "—"}
                  </TableCell>
                  <TableCell>{payment.method ?? "—"}</TableCell>
                  <TableCell>
                    <StatusBadge status={payment.status} />
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
