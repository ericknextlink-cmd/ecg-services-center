"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { FormEvent, useState } from "react"
import { toast } from "sonner"

import { AuthSplitLayout } from "@/components/auth/auth-split-layout"
import { SocialButtons } from "@/components/auth/social-buttons"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { DEMO_USER, writeSession } from "@/lib/session"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email || password.length < 8) {
      toast.error("Enter a valid email and a password of at least 8 characters.")
      return
    }

    setIsSubmitting(true)
    writeSession({
      ...DEMO_USER,
      email,
      contactName: email.startsWith("john") ? DEMO_USER.contactName : "John Mensah",
    })
    toast.success("All set! Welcome back.")
    router.push("/app/dashboard")
  }

  return (
    <AuthSplitLayout
      title={
        <>
          Powering progress.
          <br />
          Building trust.
        </>
      }
      description="A secure platform to register as a supplier and manage certification applications with confidence."
    >
      <div className="mb-8 w-full rounded-2xl bg-card p-4 shadow-xl ring-1 ring-foreground/5 sm:mb-0 sm:rounded-3xl sm:p-6 lg:p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-ecg-navy dark:text-foreground">
            Welcome back
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to continue to your account.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <InputGroup className="h-11">
              <InputGroupAddon>
                <Mail />
              </InputGroupAddon>
              <InputGroupInput
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </InputGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <InputGroup className="h-11">
              <InputGroupAddon>
                <Lock />
              </InputGroupAddon>
              <InputGroupInput
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
              />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-sm text-ecg-blue hover:underline">
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            className="h-11 w-full rounded-xl bg-ecg-navy text-white hover:bg-ecg-navy/90"
            disabled={isSubmitting}
          >
            Sign In
            <span aria-hidden>→</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full rounded-xl"
            onClick={() => {
              writeSession(DEMO_USER)
              toast.success("All set! Welcome back, John.")
              router.push("/app/dashboard")
            }}
          >
            Continue with demo account
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or continue with
          <span className="h-px flex-1 bg-border" />
        </div>
        <SocialButtons action="Continue" />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-ecg-navy hover:underline dark:text-ecg-gold">
            Sign up
          </Link>
        </p>
      </div>
    </AuthSplitLayout>
  )
}
