import { CalendarDays } from "lucide-react"

import { cn } from "cn"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function WizardField({
  label,
  required,
  className,
  children,
}: {
  label: string
  required?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-[13px] text-slate-700">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </Label>
      {children}
    </div>
  )
}

export function WizardInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return <Input className={cn("h-11 rounded-lg bg-white", className)} {...props} />
}

export function WizardSelect({
  value,
  onValueChange,
  placeholder,
  options,
}: {
  value: string
  onValueChange: (value: string) => void
  placeholder: string
  options: string[]
}) {
  return (
    <Select value={value || undefined} onValueChange={onValueChange}>
      <SelectTrigger className="h-11 w-full rounded-lg bg-white">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function WizardDateInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return (
    <div className="relative">
      <Input
        type="date"
        className={cn("h-11 rounded-lg bg-white pr-10", className)}
        {...props}
      />
      <CalendarDays className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-slate-400" />
    </div>
  )
}

export function WizardNotice({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex gap-2 rounded-lg border border-sky-100 bg-sky-50 px-3 py-2.5 text-sm text-sky-800",
        className,
      )}
    >
      {children}
    </div>
  )
}
