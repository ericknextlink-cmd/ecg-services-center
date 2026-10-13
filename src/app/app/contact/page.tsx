"use client"

import { FormEvent, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ECG_CONTACTS } from "@/lib/data/navigation"
import { addNotification } from "@/lib/workspace"

export default function ContactPage() {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  function submit(event: FormEvent) {
    event.preventDefault()
    addNotification({
      title: "Support request logged",
      body: subject || "ECG support will reply in this prototype inbox.",
      href: "/app/help",
    })
    toast.success("Message saved locally. No email was sent.")
    setSubject("")
    setMessage("")
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold sm:text-3xl">Contact Us</h1>
      <p className="mt-2 mb-6 text-muted-foreground">
        Our support team is here to help you succeed.
      </p>
      <div className="mb-6 space-y-3 rounded-3xl border bg-card p-6 text-sm">
        <p>
          <span className="font-medium">Phone:</span> {ECG_CONTACTS.phone}
        </p>
        <p>
          <span className="font-medium">Email:</span> {ECG_CONTACTS.email}
        </p>
        <p>
          <span className="font-medium">Office:</span> {ECG_CONTACTS.address}
        </p>
      </div>
      <form className="space-y-4 rounded-3xl border bg-card p-6" onSubmit={submit}>
        <div className="space-y-1.5">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            value={subject}
            placeholder="What do you need help with?"
            onChange={(event) => setSubject(event.target.value)}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={message}
            placeholder="Describe the issue"
            onChange={(event) => setMessage(event.target.value)}
            required
          />
        </div>
        <Button type="submit" className="bg-ecg-blue text-white hover:bg-ecg-blue/90">
          Send message
        </Button>
      </form>
    </div>
  )
}
