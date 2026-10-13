"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, Headset } from "lucide-react"

import { cn } from "cn"
import { EcgLogo } from "@/components/brand/ecg-logo"
import { APP_NAVIGATION } from "@/lib/data/navigation"

export function AppSidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "flex h-full min-h-0 w-full shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:w-60",
        className,
      )}
    >
      <div className="px-4 py-5">
        <Link href="/app/dashboard" className="flex min-w-0 items-center gap-2.5">
          <EcgLogo showWordmark={false} markClassName="size-10" />
          <span className="text-[11px] font-extrabold tracking-[0.12em] text-foreground uppercase">
            ECG
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 pb-4">
        {APP_NAVIGATION.map((group, groupIndex) => (
          <div key={group.label ?? `group-${groupIndex}`}>
            {group.label ? (
              <p className="mb-1 px-3 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                {group.label}
              </p>
            ) : null}
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive =
                  item.href === "/app/applications"
                    ? pathname === item.href ||
                      (pathname.startsWith("/app/applications/") &&
                        !pathname.startsWith("/app/applications/new"))
                    : item.href === "/app/dashboard"
                      ? pathname === item.href
                      : pathname.startsWith(item.href)
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                      isActive
                        ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                        : "hover:bg-sidebar-accent/60",
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3">
        <div className="rounded-2xl border border-sidebar-border bg-background p-4">
          <div className="mb-2 flex size-8 items-center justify-center rounded-full bg-sky-50 text-ecg-blue dark:bg-ecg-gold/15 dark:text-ecg-gold">
            <Headset className="size-4" />
          </div>
          <p className="text-sm font-semibold">Need Help?</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Our support team is here to assist you.
          </p>
          <Link
            href="/app/contact"
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-ecg-blue dark:text-ecg-gold"
          >
            Contact Support
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  )
}
