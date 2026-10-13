import { Check } from "lucide-react"

import { cn } from "cn"
import type { WizardStep } from "@/lib/data/wizard"

export function WizardStepper({
  steps,
  currentIndex,
}: {
  steps: WizardStep[]
  currentIndex: number
}) {
  return (
    <ol className="flex min-w-max gap-0 overflow-x-auto pb-2 sm:min-w-0 sm:overflow-visible">
      {steps.map((step, index) => {
        const complete = index < currentIndex
        const current = index === currentIndex
        const last = index === steps.length - 1

        return (
          <li
            key={step.id}
            className={cn(
              "relative flex min-w-[7.5rem] flex-1 flex-col items-center px-1 text-center sm:min-w-0",
              steps.length > 5 && "min-w-[6.5rem]",
            )}
          >
            {!last ? (
              <span
                className={cn(
                  "absolute top-4 left-[calc(50%+18px)] h-px w-[calc(100%-36px)]",
                  complete ? "bg-emerald-500" : current ? "bg-gradient-to-r from-ecg-blue to-slate-200" : "bg-slate-200",
                )}
                aria-hidden
              />
            ) : null}
            <span
              className={cn(
                "relative z-10 flex size-8 items-center justify-center rounded-full text-sm font-semibold",
                complete && "bg-emerald-500 text-white",
                current && "bg-ecg-blue text-white",
                !complete && !current && "border border-slate-200 bg-white text-slate-400",
              )}
            >
              {complete ? <Check className="size-4" strokeWidth={2.5} /> : index + 1}
            </span>
            <p
              className={cn(
                "mt-2 text-[13px] font-semibold",
                current && "text-ecg-blue",
                complete && "text-slate-800",
                !complete && !current && "text-slate-400",
              )}
            >
              {step.title}
            </p>
            <p
              className={cn(
                "mt-0.5 text-[11px]",
                complete && "text-emerald-600",
                current && "text-ecg-blue",
                !complete && !current && "text-slate-400",
              )}
            >
              {complete ? "Completed" : current ? step.description : step.description}
            </p>
          </li>
        )
      })}
    </ol>
  )
}
