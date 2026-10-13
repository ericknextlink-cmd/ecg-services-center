import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  ChevronRight,
  CloudUpload,
  FileBadge,
  FileText,
  Headphones,
  History,
  IdCard,
  Laptop,
  Lock,
  ShieldCheck,
  UserPlus,
} from "lucide-react"

import { MarketingFooter } from "@/components/marketing/marketing-footer"
import { MarketingHeader } from "@/components/marketing/marketing-header"
import { Button } from "@/components/ui/button"
import {
  APPLICATION_TYPES,
  LANDING_APPLICATION_ORDER,
} from "@/lib/data/applications"

const TRUST_POINTS = [
  { icon: ShieldCheck, lines: ["Secure &", "Trusted"] },
  { icon: History, lines: ["Track in", "Real Time"] },
  { icon: FileText, lines: ["100% Digital", "Process"] },
  { icon: Lock, lines: ["Data Privacy", "Assured"] },
]

const FEATURE_STRIP = [
  {
    icon: ShieldCheck,
    title: "Trusted by Thousands Across Ghana",
    body: "Join over 10,000+ suppliers building a better tomorrow with ECG.",
    ring: "dashed" as const,
  },
  {
    icon: Laptop,
    title: "Real-Time Tracking",
    body: "Track your application status at every step.",
    ring: "solid" as const,
  },
  {
    icon: CloudUpload,
    title: "Digital & Paperless",
    body: "Enjoy a faster, simpler and eco-friendly experience.",
    ring: "solid" as const,
  },
  {
    icon: Headphones,
    title: "Support When You Need It",
    body: "Our support team is here to help you succeed.",
    ring: "solid" as const,
  },
  {
    icon: Lock,
    title: "Secure & Compliant",
    body: "Your data is protected with industry-leading security.",
    ring: "solid" as const,
  },
]

const LANDING_ICONS = {
  supplier: UserPlus,
  classification: FileBadge,
  "external-license": IdCard,
}

const TINT_STYLES = {
  blue: {
    tile: "bg-[#e8eef8] text-[#2f6fe4]",
    check: "bg-[#2f6fe4]",
    footer: "bg-[#e8eef8] text-[#2f6fe4] hover:bg-[#dce6f4]",
    chevron: "text-slate-300",
  },
  green: {
    tile: "bg-[#e7f6ed] text-[#22a45a]",
    check: "bg-[#22a45a]",
    footer: "bg-[#e7f6ed] text-[#22a45a] hover:bg-[#d8f0e2]",
    chevron: "text-slate-300",
  },
  purple: {
    tile: "bg-[#eee8f8] text-[#7b5fe0]",
    check: "bg-[#7b5fe0]",
    footer: "bg-[#eee8f8] text-[#7b5fe0] hover:bg-[#e4dcf4]",
    chevron: "text-slate-300",
  },
}

function GoldRule({ className = "" }: { className?: string }) {
  return (
    <span
      className={`block h-[3px] w-12 rounded-full bg-ecg-gold ${className}`}
    />
  )
}

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <MarketingHeader />

      <section className="relative overflow-hidden">
        <Image
          src="/hero-grid.jpg"
          alt="ECG transmission lines at dusk"
          fill
          priority
          className="object-cover object-[80%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white from-[22%] via-white/95 via-[58%] to-white/80 lg:from-[8%] lg:via-white/80 lg:via-[36%] lg:to-transparent lg:to-[60%]" />
        <div className="relative mx-auto flex min-h-[420px] max-w-7xl items-center px-4 py-12 sm:min-h-[480px] sm:py-16 lg:min-h-[540px] lg:px-8">
          <div className="relative z-10 max-w-xl">
            <p className="text-[11px] font-bold tracking-[0.16em] text-ecg-blue uppercase">
              ECG Vendor Registration & Certification System
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ecg-navy sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
              Get <span className="text-ecg-blue">Certified.</span>
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-6 text-slate-500 sm:text-[15px] sm:leading-7">
              A secure and transparent platform to register as a supplier and
              manage certification applications with efficiency and confidence.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:flex sm:flex-wrap sm:gap-x-8">
              {TRUST_POINTS.map((point) => (
                <div key={point.lines[0]} className="flex items-center gap-2.5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-ecg-blue/35 bg-transparent">
                    <point.icon
                      className="size-[18px] text-ecg-blue"
                      strokeWidth={1.75}
                    />
                  </span>
                  <p className="text-[12px] font-medium leading-4 text-slate-600">
                    {point.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
            <Button
              asChild
              className="mt-8 h-11 rounded-lg bg-ecg-blue px-6 text-sm font-semibold text-white shadow-none hover:bg-ecg-blue/90"
            >
              <Link href="#applications">
                Explore Applications
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <blockquote className="absolute top-[54%] right-4 z-10 hidden w-[240px] -translate-y-1/2 rounded-xl bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.16)] md:w-[250px] lg:right-12 lg:block lg:w-[260px] lg:p-6 xl:right-[max(3rem,calc((100%-80rem)/2+2.5rem))] xl:w-[280px] xl:p-7">
            <p className="-mt-3 text-[4.75rem] leading-none font-serif text-ecg-gold">
              “
            </p>
            <p className="mt-1 text-[1.35rem] leading-7 font-bold text-ecg-navy text-nowrap">
              Reliable Suppliers.
              <br />
              A Stronger ECG.
            </p>
            <p className="mt-2.5 text-[13px] leading-5 text-slate-500">
              Building a sustainable future together.
            </p>
            <GoldRule className="mt-3" />
          </blockquote>
        </div>
      </section>

      <section id="applications" className="bg-white pt-12 pb-8 sm:pt-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-ecg-navy">
              Choose an Application
            </h2>
            <GoldRule className="mt-2.5" />
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {LANDING_APPLICATION_ORDER.map((applicationTypeId) => {
              const applicationType = APPLICATION_TYPES.find(
                (item) => item.id === applicationTypeId,
              )
              if (!applicationType) {
                return null
              }
              const Icon = LANDING_ICONS[applicationType.id]
              const tint = TINT_STYLES[applicationType.landingTint]

              return (
                <article
                  key={applicationType.id}
                  className="relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] ring-1 ring-slate-100"
                >
                  <div className="relative flex flex-1 gap-3.5 p-5 pr-10 sm:p-6 sm:pr-11">
                    <div
                      className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg ${tint.tile}`}
                    >
                      <Icon className="size-[18px]" strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[16px] font-bold text-ecg-navy">
                        {applicationType.shortTitle}
                      </h3>
                      <p className="mt-1 text-[13px] leading-5 text-slate-500">
                        {applicationType.landingDescription}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {applicationType.landingSteps.map((step) => (
                          <li
                            key={step}
                            className="flex items-center gap-2 text-[13px] text-slate-600"
                          >
                            <span
                              className={`flex size-[15px] shrink-0 items-center justify-center rounded-full ${tint.check}`}
                            >
                              <Check
                                className="size-2.5 text-white"
                                strokeWidth={3.5}
                              />
                            </span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <ChevronRight
                      className={`absolute top-1/2 right-3 size-6 -translate-y-1/2 ${tint.chevron}`}
                      strokeWidth={1.75}
                    />
                  </div>
                  <Link
                    href="/signup"
                    className={`flex items-center justify-center gap-1.5 py-3 text-sm font-semibold transition-colors ${tint.footer}`}
                  >
                    Start Application
                    <ArrowRight className="size-4" />
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white pt-4 pb-14 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="rounded-2xl bg-white px-2 py-6 shadow-[0_16px_50px_rgba(15,23,42,0.1)] ring-1 ring-slate-200/70 sm:px-3 sm:py-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
              {FEATURE_STRIP.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-3 px-4 py-4 sm:px-5 lg:py-1 lg:not-last:border-r lg:not-last:border-slate-200"
                >
                  <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-full ${
                      feature.ring === "dashed"
                        ? "border border-dashed border-slate-300"
                        : "border border-slate-200"
                    }`}
                  >
                    <feature.icon
                      className="size-5 text-slate-500"
                      strokeWidth={1.6}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[13px] leading-4 font-bold text-ecg-navy">
                      {feature.title}
                    </h3>
                    <p className="mt-1.5 text-[11px] leading-4 text-slate-500">
                      {feature.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
