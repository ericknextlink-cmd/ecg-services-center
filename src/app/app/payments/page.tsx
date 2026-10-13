import { PlaceholderPage } from "@/components/app-shell/placeholder-page"

export default function PaymentsPage() {
  return (
    <PlaceholderPage
      title="Payments"
      description="Application and certification fees will be collected here. No payment is due until ECG issues an invoice against a submitted application."
      actionHref="/app/payments/history"
      actionLabel="View payment history"
    />
  )
}
