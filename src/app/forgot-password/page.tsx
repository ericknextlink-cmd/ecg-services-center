"use client"

import Link from "next/link"
import { Mail } from "lucide-react"
import { FormEvent, useState } from "react"
import { toast } from "sonner"

import { AuthSplitLayout } from "@/components/auth/auth-split-layout"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
    toast.success("If that email is registered, a reset link is on its way.")
  }

  return (
    <AuthSplitLayout
      title="Reset your password"
      description="We'll send a secure reset link to the email on your company account."
    >
      <div className="mb-8 w-full rounded-2xl bg-card p-4 shadow-xl ring-1 ring-foreground/5 sm:mb-0 sm:rounded-3xl sm:p-8">
        <h2 className="text-2xl font-bold">Forgot password</h2>
        {sent ? (
          <p className="mt-4 text-sm text-muted-foreground">
            Check your inbox. In this prototype no email is sent — return to sign in when you are ready.
          </p>
        ) : null}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <InputGroup className="h-11">
              <InputGroupAddon>
                <Mail />
              </InputGroupAddon>
              <InputGroupInput id="email" type="email" required placeholder="Enter your email address" />
            </InputGroup>
          </div>
          <Button type="submit" className="h-11 w-full rounded-xl">
            Send reset link
          </Button>
        </form>
        <p className="mt-6 text-center text-sm">
          <Link href="/login" className="font-medium hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </AuthSplitLayout>
  )
}
