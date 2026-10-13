"use client"

import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatCedis } from "@/lib/data/review"
import { payInvoice, type WorkspacePayment } from "@/lib/workspace"

export function PayInvoiceDialog({
  payment,
  open,
  onOpenChange,
}: {
  payment: WorkspacePayment | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [card, setCard] = useState("4242 4242 4242 4242")

  function submit() {
    if (!payment) {
      return
    }
    payInvoice(payment.id, `Card •• ${card.slice(-4)}`)
    toast.success("Payment recorded. This prototype does not charge a live card.")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pay invoice</DialogTitle>
          <DialogDescription>
            {payment
              ? `${payment.reference} · ${formatCedis(payment.amount)}. Card details stay on this device.`
              : "Select an invoice to pay."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="card">Card number</Label>
            <Input id="card" value={card} onChange={(event) => setCard(event.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="expiry">Expiry</Label>
              <Input id="expiry" defaultValue="12 / 28" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" defaultValue="123" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            className="bg-ecg-blue text-white hover:bg-ecg-blue/90"
            onClick={submit}
            disabled={!payment}
          >
            Pay {payment ? formatCedis(payment.amount) : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
