"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Building2,
  Check,
  Eye,
  EyeOff,
  FileBadge,
  Hash,
  Lock,
  Mail,
  Phone,
  User,
  UserPlus,
} from "lucide-react"
import { FormEvent, useMemo, useState } from "react"
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
  InputGroupText,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { writeSession } from "@/lib/session"

const PASSWORD_RULES = [
  { id: "length", label: "At least 8 characters", test: (value: string) => value.length >= 8 },
  { id: "upper", label: "One uppercase letter", test: (value: string) => /[A-Z]/.test(value) },
  { id: "number", label: "One number", test: (value: string) => /\d/.test(value) },
  { id: "special", label: "One special character", test: (value: string) => /[^A-Za-z0-9]/.test(value) },
]

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    companyName: "",
    tin: "",
    registrationNumber: "",
    email: "",
    phone: "",
    contactName: "",
    designation: "",
    password: "",
    confirmPassword: "",
  })

  const passwordChecks = useMemo(
    () => PASSWORD_RULES.map((rule) => ({ ...rule, passed: rule.test(form.password) })),
    [form.password],
  )

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const allPassed = passwordChecks.every((rule) => rule.passed)
    if (!allPassed) {
      toast.error("Please meet all password requirements.")
      return
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.")
      return
    }
    if (!acceptedTerms) {
      toast.error("Please agree to the Terms & Conditions and Privacy Policy.")
      return
    }

    setIsSubmitting(true)
    writeSession({
      companyName: form.companyName,
      tin: form.tin,
      registrationNumber: form.registrationNumber,
      email: form.email,
      phone: `+233${form.phone.replace(/\s/g, "")}`,
      contactName: form.contactName,
      designation: form.designation,
    })
    toast.success("All set! Your account is ready.")
    router.push("/app/dashboard")
  }

  return (
    <AuthSplitLayout
      title={
        <>
          Join. Register.
          <br />
          <span className="text-ecg-blue">Get Certified.</span>
        </>
      }
      description="Create an account to register as a supplier and manage your certification applications with ECG."
    >
      <div className="mb-8 w-full rounded-2xl bg-card p-4 shadow-xl ring-1 ring-foreground/5 sm:mb-0 sm:rounded-3xl sm:p-6 lg:p-8">
        <div className="flex flex-col items-center text-center">
          <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-sky-50 text-ecg-blue">
            <UserPlus className="size-5" />
          </span>
          <h2 className="text-2xl font-bold">Create your account</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign up to get started with ECG.
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <Field label="Name of Company *" htmlFor="companyName">
            <IconInput
              id="companyName"
              icon={<Building2 />}
              placeholder="Enter your company name"
              value={form.companyName}
              onChange={(value) => updateField("companyName", value)}
              required
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="TIN *" htmlFor="tin">
              <IconInput
                id="tin"
                icon={<Hash />}
                placeholder="Enter your TIN"
                value={form.tin}
                onChange={(value) => updateField("tin", value)}
                required
              />
            </Field>
            <Field label="Registration Number (Optional)" htmlFor="registrationNumber">
              <IconInput
                id="registrationNumber"
                icon={<FileBadge />}
                placeholder="Enter registration number"
                value={form.registrationNumber}
                onChange={(value) => updateField("registrationNumber", value)}
              />
            </Field>
            <Field label="Email Address *" htmlFor="email">
              <IconInput
                id="email"
                type="email"
                icon={<Mail />}
                placeholder="Enter your email address"
                value={form.email}
                onChange={(value) => updateField("email", value)}
                required
              />
            </Field>
            <Field label="Phone Number *" htmlFor="phone">
              <InputGroup className="h-11 min-w-0">
                <InputGroupAddon>
                  <Phone />
                </InputGroupAddon>
                <InputGroupText className="shrink-0 pr-0 text-xs">🇬🇭 +233</InputGroupText>
                <InputGroupInput
                  id="phone"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  required
                />
              </InputGroup>
            </Field>
            <Field label="Primary Contact Name *" htmlFor="contactName">
              <IconInput
                id="contactName"
                icon={<User />}
                placeholder="Enter full name"
                value={form.contactName}
                onChange={(value) => updateField("contactName", value)}
                required
              />
            </Field>
            <Field label="Designation *" htmlFor="designation">
              <IconInput
                id="designation"
                icon={<FileBadge />}
                placeholder="Enter your designation"
                value={form.designation}
                onChange={(value) => updateField("designation", value)}
                required
              />
            </Field>
            <Field label="Password *" htmlFor="password">
              <IconInput
                id="password"
                type={showPassword ? "text" : "password"}
                icon={<Lock />}
                placeholder="Create a password"
                value={form.password}
                onChange={(value) => updateField("password", value)}
                required
                trailing={
                  <InputGroupButton onClick={() => setShowPassword((current) => !current)}>
                    {showPassword ? <EyeOff /> : <Eye />}
                  </InputGroupButton>
                }
              />
            </Field>
            <Field label="Confirm Password *" htmlFor="confirmPassword">
              <IconInput
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                icon={<Lock />}
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={(value) => updateField("confirmPassword", value)}
                required
                trailing={
                  <InputGroupButton onClick={() => setShowConfirmPassword((current) => !current)}>
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </InputGroupButton>
                }
              />
            </Field>
          </div>

          <div>
            <p className="mb-2 text-xs text-muted-foreground">Password must contain:</p>
            <ul className="grid gap-1 sm:grid-cols-2">
              {passwordChecks.map((rule) => (
                <li key={rule.id} className="flex items-center gap-2 text-xs">
                  <Check className={rule.passed ? "size-3.5 text-emerald-500" : "size-3.5 text-muted-foreground"} />
                  <span className={rule.passed ? "text-emerald-600" : "text-muted-foreground"}>
                    {rule.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <label className="flex items-start gap-2 text-sm">
            <Checkbox
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(Boolean(checked))}
              className="mt-0.5"
            />
            <span>
              I agree to the{" "}
              <Link href="/legal/terms" className="text-ecg-blue hover:underline">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="/legal/privacy" className="text-ecg-blue hover:underline">
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          <Button
            type="submit"
            className="h-11 w-full rounded-xl bg-ecg-navy text-white hover:bg-ecg-navy/90"
            disabled={isSubmitting}
          >
            Create Account
            <span aria-hidden>→</span>
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or sign up with
          <span className="h-px flex-1 bg-border" />
        </div>
        <SocialButtons action="Sign up" />
        <p className="mt-5 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-ecg-navy hover:underline dark:text-ecg-gold">
            Sign in
          </Link>
        </p>
      </div>
    </AuthSplitLayout>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  )
}

function IconInput({
  id,
  icon,
  trailing,
  onChange,
  ...props
}: {
  id: string
  icon: React.ReactNode
  trailing?: React.ReactNode
  onChange: (value: string) => void
} & Omit<React.ComponentProps<"input">, "onChange">) {
  return (
    <InputGroup className="h-11">
      <InputGroupAddon>{icon}</InputGroupAddon>
      <InputGroupInput
        id={id}
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
      {trailing ? <InputGroupAddon align="inline-end">{trailing}</InputGroupAddon> : null}
    </InputGroup>
  )
}
