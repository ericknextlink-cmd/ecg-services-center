import { ECG_CONTACTS } from "@/lib/data/navigation"

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold sm:text-3xl">Contact Us</h1>
      <p className="mt-2 mb-6 text-muted-foreground">
        Our support team is here to help you succeed.
      </p>
      <div className="space-y-3 rounded-3xl border bg-card p-6 text-sm">
        <p>
          <span className="font-medium">Phone:</span> {ECG_CONTACTS.phone}
        </p>
        <p>
          <span className="font-medium">Email:</span> {ECG_CONTACTS.email}
        </p>
        <p>
          <span className="font-medium">Office:</span> {ECG_CONTACTS.address}
        </p>
        <p>
          <span className="font-medium">Web:</span> {ECG_CONTACTS.website}
        </p>
      </div>
    </div>
  )
}
