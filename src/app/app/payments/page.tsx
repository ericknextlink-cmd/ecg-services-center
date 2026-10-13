"use client"

import { useState } from "react"
import Link from "next/link"

import { StatusBadge } from "@/components/app-shell/status-badge"
import { PayInvoiceDialog } from "@/components/workspace/pay-invoice-dialog"
import { Button } from "@/components/ui/button"
import { useSession } from "@/hooks/use-session"
import { formatCedis } from "@/lib/data/review"
import type { WorkspacePayment } from "@/lib/workspace"

export default function PaymentsPage() {
  const { workspace } = useSession()
  const due = workspace.payments.filter((item) => item.status === "due")
  const [selected, setSelected] = useState<WorkspacePayment | null>(null)

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Payments</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Outstanding invoices for submitted applications. Checkout is mocked.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/app/payments/history">Payment history</Link>
        </Button>
      </div>

      <div className="mt-6 space-y-3">
        {due.length === 0 ? (
          <div className="rounded-2xl border bg-card px-5 py-10 text-center text-sm text-muted-foreground">
            No invoices are due. Submit an application to generate a processing fee.
          </div>
        ) : (
          due.map((payment) => (
            <div
              key={payment.id}
              className="flex flex-col gap-3 rounded-2xl border bg-card px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium">{payment.reference}</p>
                <p className="text-sm text-muted-foreground">{payment.description}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Due {new Date(payment.dueOn).toLocaleDateString("en-GB")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold">{formatCedis(payment.amount)}</span>
                <StatusBadge status={payment.status} />
                <Button
                  type="button"
                  className="bg-ecg-blue text-white hover:bg-ecg-blue/90"
                  onClick={() => setSelected(payment)}
                >
                  Pay now
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <PayInvoiceDialog
        payment={selected}
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) {
            setSelected(null)
          }
        }}
      />
    </div>
  )
}
