import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Clock3,
  Cloud,
  FileText,
  Headphones,
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
  { icon: ShieldCheck, title: "Secure & Trusted" },
  { icon: Clock3, title: "Track in Real Time" },
  { icon: FileText, title: "100% Digital Process" },
  { icon: Lock, title: "Data Privacy Assured" },
]

const FEATURE_STRIP = [
  {
    icon: ShieldCheck,
    title: "Trusted by Thousands Across Ghana",
    body: "Join over 10,000+ suppliers building a better tomorrow with ECG.",
  },
  {
    icon: Clock3,
    title: "Real-Time Tracking",
    body: "Track your application status at every step.",
  },
  {
    icon: Cloud,
    title: "Digital & Paperless",
    body: "Enjoy a faster, simpler and eco-friendly experience.",
  },
  {
    icon: Headphones,
    title: "Support When You Need It",
    body: "Our support team is here to help you succeed.",
  },
  {
    icon: Lock,
    title: "Secure & Compliant",
    body: "Your data is protected with industry-leading security.",
  },
]

const LANDING_ICONS = {
  supplier: UserPlus,
  classification: BadgeCheck,
  "external-license": UserPlus,
}

const TINT_STYLES = {
  blue: {
    card: "border-sky-100 bg-sky-50/70",
    icon: "bg-ecg-blue text-white",
    check: "text-ecg-blue",
    cta: "text-ecg-blue",
  },
  green: {
    card: "border-emerald-100 bg-emerald-50/80",
    icon: "bg-emerald-500 text-white",
    check: "text-emerald-600",
    cta: "text-emerald-700",
  },
  purple: {
    card: "border-violet-100 bg-violet-50/80",
    icon: "bg-violet-500 text-white",
    check: "text-violet-600",
    cta: "text-violet-700",
  },
}

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <MarketingHeader />

      <section className="relative overflow-hidden">
        <Image
          src="/hero-grid.jpg"
          alt="ECG transmission lines at dusk"
          fill
          priority
          className="object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/55 lg:via-white/92 lg:to-white/20" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="max-w-full text-[10px] font-semibold tracking-[0.12em] text-ecg-blue uppercase sm:text-xs sm:tracking-[0.18em]">
              ECG Vendor Registration & Certification System
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-balance text-ecg-navy sm:text-5xl lg:text-6xl">
              Get Certified.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
              A secure and transparent platform to register as a supplier and
              manage certification applications with efficiency and confidence.
            </p>
            <div className="mt-8 grid max-w-xl grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {TRUST_POINTS.map((point) => (
                <div key={point.title} className="flex items-center gap-2">
                  <point.icon className="size-5 shrink-0 text-slate-500" />
                  <p className="text-xs font-semibold leading-5 text-slate-700">
                    {point.title}
                  </p>
                </div>
              ))}
            </div>
            <Button
              asChild
              className="mt-8 h-11 rounded-full bg-ecg-blue px-6 text-white hover:bg-ecg-blue/90"
            >
              <Link href="#applications">
                Explore Applications
                <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="hidden justify-self-end lg:block">
            <blockquote className="max-w-sm rounded-2xl bg-white/90 p-6 shadow-xl backdrop-blur">
              <p className="text-3xl leading-none text-slate-300">“</p>
              <p className="text-xl font-semibold text-ecg-navy">
                Reliable Suppliers.
                <br />
                A Stronger ECG.
              </p>
              <p className="mt-3 text-sm text-slate-500">
                Building a sustainable future together.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      <section id="applications" className="bg-white py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center text-xl font-bold text-ecg-navy sm:text-2xl">
            Choose an Application
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
                  className={`relative overflow-hidden rounded-2xl border p-6 ${tint.card}`}
                >
                  <div className={`mb-4 flex size-11 items-center justify-center rounded-xl ${tint.icon}`}>
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-ecg-navy">
                    {applicationType.shortTitle}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {applicationType.landingDescription}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {applicationType.landingSteps.map((step) => (
                      <li key={step} className="flex items-start gap-2 text-sm text-slate-700">
                        <Check className={`mt-0.5 size-4 ${tint.check}`} />
                        {step}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/signup"
                    className={`mt-6 inline-flex items-center gap-1 text-sm font-semibold ${tint.cta}`}
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

      <section className="border-t bg-white pb-10 sm:pb-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-8 xl:grid-cols-5">
          {FEATURE_STRIP.map((feature) => (
            <div key={feature.title} className="rounded-2xl border bg-white p-5">
              <feature.icon className="size-8 text-slate-500" />
              <h3 className="mt-3 text-sm font-semibold text-ecg-navy">
                {feature.title}
              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
