import Link from "next/link"
import {
  Clock3,
  FileText,
  Headphones,
  ShieldCheck,
} from "lucide-react"

import { EcgLogo } from "@/components/brand/ecg-logo"
import { ThemeSwitcher } from "@/components/theme/theme-switcher"

type AuthSplitLayoutProps = {
  title: React.ReactNode
  description: string
  children: React.ReactNode
}

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: "Secure & Trusted",
    body: "Your data is protected with enterprise-grade security.",
  },
  {
    icon: Clock3,
    title: "Track in Real Time",
    body: "Track your applications and receive updates in real time.",
  },
  {
    icon: FileText,
    title: "100% Digital Process",
    body: "Simple, transparent and paperless from start to finish.",
  },
  {
    icon: Headphones,
    title: "We're Here to Help",
    body: "Get support whenever you need it from our dedicated team.",
  },
]

export function AuthSplitLayout({
  title,
  description,
  children,
}: AuthSplitLayoutProps) {
  return (
    <div className="grid min-h-svh overflow-x-clip lg:grid-cols-[0.92fr_1.08fr]">
      <aside className="relative hidden overflow-hidden bg-[#f4f7fb] px-8 py-8 lg:flex lg:flex-col xl:px-10">
        <Link href="/">
          <EcgLogo
            wordmarkClassName="text-ecg-navy"
            taglineClassName="text-slate-500"
          />
        </Link>
        <div className="relative z-10 mt-12 max-w-md xl:mt-16">
          <h1 className="text-3xl font-extrabold tracking-tight text-ecg-navy xl:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>
          <ul className="mt-10 space-y-5">
            {HIGHLIGHTS.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                  <item.icon className="size-4 text-slate-500" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ecg-navy">{item.title}</p>
                  <p className="text-sm text-slate-500">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <GridIllustration />
        <p className="relative z-10 mt-auto text-xs text-slate-400">
          © 2026 Electricity Company of Ghana. All rights reserved.
        </p>
      </aside>
      <main className="relative flex min-w-0 flex-col bg-muted/40 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between lg:justify-end">
          <Link href="/" className="lg:hidden">
            <EcgLogo compact markClassName="size-10" />
          </Link>
          <ThemeSwitcher variant="compact" />
        </div>
        <div className="mx-auto flex w-full max-w-[560px] flex-1 items-start lg:items-center">
          {children}
        </div>
      </main>
    </div>
  )
}

function GridIllustration() {
  return (
    <svg
      viewBox="0 0 520 360"
      className="pointer-events-none absolute right-[-40px] bottom-8 hidden w-[min(520px,90%)] text-slate-300 xl:block"
      fill="none"
    >
      <path
        d="M80 300 L180 120 L240 180 L320 40 L400 140 L470 80"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M180 120 V300" stroke="currentColor" strokeWidth="6" />
      <path d="M320 40 V300" stroke="currentColor" strokeWidth="8" />
      <path d="M400 140 V300" stroke="currentColor" strokeWidth="5" />
      <rect x="250" y="230" width="90" height="70" rx="4" stroke="currentColor" />
      <path d="M250 230 L295 190 L340 230" stroke="currentColor" />
    </svg>
  )
}
