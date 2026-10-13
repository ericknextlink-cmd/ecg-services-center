import Link from "next/link"
import { ArrowRight, BadgeCheck, FileBadge, Users } from "lucide-react"

import { cn } from "cn"
import { APPLICATION_TYPES } from "@/lib/data/applications"

const ACCENT = {
  red: "from-[#f0434a] to-[#e11d48]",
  blue: "from-[#2563eb] to-[#1d4ed8]",
  gold: "from-[#f5b400] to-[#f59e0b]",
}

const ICONS = {
  "external-license": FileBadge,
  classification: BadgeCheck,
  supplier: Users,
}

export function ApplicationTypeCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {APPLICATION_TYPES.map((applicationType) => {
        const Icon = ICONS[applicationType.id]
        return (
          <article
            key={applicationType.id}
            className={cn(
              "relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl bg-gradient-to-br p-5 text-white shadow-lg sm:min-h-[250px] sm:rounded-3xl sm:p-6",
              ACCENT[applicationType.accent],
            )}
          >
            <span
              className="lightning-watermark pointer-events-none absolute inset-0"
              aria-hidden
            />
            <span className="relative flex size-12 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30">
              <Icon className="size-5" />
            </span>
            <h3 className="relative mt-8 text-xl font-semibold">{applicationType.title}</h3>
            <p className="relative mt-2 text-sm leading-6 text-white/90">
              {applicationType.dashboardDescription}
            </p>
            <Link
              href={applicationType.href}
              className="relative mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-800"
            >
              Start Application
              <ArrowRight className="size-4" />
            </Link>
          </article>
        )
      })}
    </div>
  )
}
