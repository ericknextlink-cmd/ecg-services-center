import Link from "next/link"
import { ArrowRight, Check, CircleHelp, Headset } from "lucide-react"

import { cn } from "cn"
import { Progress } from "@/components/ui/progress"
import type { WizardStep } from "@/lib/data/wizard"

export function WizardAside({
  steps,
  currentIndex,
  variant = "help",
  declaration,
}: {
  steps: WizardStep[]
  currentIndex: number
  variant?: "help" | "declaration"
  declaration?: React.ReactNode
}) {
  const current = steps[currentIndex]
  const progress = ((currentIndex + 1) / steps.length) * 100

  return (
    <aside className="space-y-4 lg:w-[280px] lg:shrink-0">
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-semibold text-ecg-navy">Application Progress</p>
          <p className="text-xs text-slate-400">
            Step {currentIndex + 1} of {steps.length}
          </p>
        </div>
        <Progress
          value={progress}
          className="mt-3 h-1.5 bg-slate-100 [&_[data-slot=progress-indicator]]:bg-ecg-blue"
        />

        {currentIndex === 0 ? (
          <div className="mt-5">
            <p className="text-sm font-semibold text-ecg-navy">{current.title}</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Please provide accurate information. This will be used to verify your company.
            </p>
          </div>
        ) : (
          <ol className="mt-5 space-y-3">
            {steps.map((step, index) => {
              const complete = index < currentIndex
              const active = index === currentIndex
              return (
                <li key={step.id} className="flex items-start gap-2.5">
                  <span
                    className={cn(
                      "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                      complete && "bg-emerald-500 text-white",
                      active && "bg-ecg-blue text-white",
                      !complete && !active && "border border-slate-200 text-slate-400",
                    )}
                  >
                    {complete ? <Check className="size-3" strokeWidth={2.5} /> : index + 1}
                  </span>
                  <div>
                    <p
                      className={cn(
                        "text-sm font-medium",
                        active && "text-ecg-blue",
                        complete && "text-slate-800",
                        !complete && !active && "text-slate-400",
                      )}
                    >
                      {step.title}
                    </p>
                    <p
                      className={cn(
                        "text-xs",
                        complete && "text-emerald-600",
                        active && "text-ecg-blue",
                        !complete && !active && "text-slate-400",
                      )}
                    >
                      {complete ? "Completed" : active ? "In Progress" : "Pending"}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        )}
      </div>

      {variant === "declaration" && declaration ? (
        declaration
      ) : (
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <span className="mb-3 flex size-10 items-center justify-center rounded-full bg-sky-50 text-ecg-blue">
            {currentIndex >= 2 ? <CircleHelp className="size-4" /> : <Headset className="size-4" />}
          </span>
          <p className="text-sm font-semibold text-ecg-navy">Need Help?</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            If you need any assistance, our support team is ready to help.
          </p>
          <Link
            href="/app/contact"
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-ecg-blue"
          >
            Contact Support
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      )}
    </aside>
  )
}
