import Image from "next/image"
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
  highlightCount?: 3 | 4
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
  highlightCount = 4,
}: AuthSplitLayoutProps) {
  const highlights = HIGHLIGHTS.slice(0, highlightCount)

  return (
    <div className="grid min-h-svh overflow-x-clip lg:grid-cols-[0.92fr_1.08fr]">
      <aside className="relative hidden overflow-hidden bg-[#f4f7fb] px-8 py-8 lg:flex lg:flex-col xl:px-10">
        <Link href="/" className="relative z-10">
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
            {highlights.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200/90 bg-white/70">
                  <item.icon className="size-4 text-slate-500" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ecg-navy">{item.title}</p>
                  <p className="text-sm text-slate-500">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%]">
          <Image
            src="/auth-grid.jpg"
            alt=""
            fill
            priority
            sizes="50vw"
            className="object-cover object-[center_bottom]"
          />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#f4f7fb] to-transparent" />
        </div>
        <p className="relative z-10 mt-auto text-xs text-slate-400">
          © 2026 Electricity Company of Ghana. All rights reserved.
        </p>
      </aside>
      <main className="relative flex min-w-0 flex-col bg-[#f7f9fc] px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
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
