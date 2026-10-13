import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { EcgLogo } from "@/components/brand/ecg-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ECG_CONTACTS,
  FOOTER_QUICK_LINKS,
  FOOTER_RESOURCES,
} from "@/lib/data/navigation"

export function MarketingFooter() {
  return (
    <footer className="bg-ecg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:gap-10 sm:py-12 lg:grid-cols-5 lg:px-8">
        <div className="space-y-4">
          <EcgLogo
            markClassName="size-11"
            wordmarkClassName="text-white"
            taglineClassName="text-white/70"
          />
          <p className="max-w-xs text-sm leading-6 text-white/75">
            Reliable Suppliers. A Stronger ECG. Building a sustainable future
            together.
          </p>
          <div className="flex items-center gap-3 text-white/80">
            <SocialGlyph label="Facebook">
              <path d="M15 8h-2a2 2 0 0 0-2 2v2H9v3h2v7h3v-7h2.2l.8-3H14v-1.5c0-.3.2-.5.5-.5H16V8z" />
            </SocialGlyph>
            <SocialGlyph label="X">
              <path d="M4 5h3.3l3.6 4.8L15.2 5H20l-5.7 6.7L20 19h-3.3l-4-5.3L7 19H2.8l6-7.1L4 5z" />
            </SocialGlyph>
            <SocialGlyph label="LinkedIn">
              <path d="M6 9H3v12h3V9zm.2-4.5A1.8 1.8 0 1 1 4.4 2.7a1.8 1.8 0 0 1 1.8 1.8zM21 15.4c0-3.4-1.8-5-4.2-5-1.9 0-2.8 1-3.3 1.8V9H10.5c0 1.6 0 12 0 12H13.5v-6.7c0-.4 0-.7.1-1 .3-.7.9-1.4 2-1.4 1.4 0 2 1.1 2 2.7V21H21v-5.6z" />
            </SocialGlyph>
            <SocialGlyph label="YouTube">
              <path d="M21 8.2a3 3 0 0 0-2.1-2.1C17.2 5.7 12 5.7 12 5.7s-5.2 0-6.9.4A3 3 0 0 0 3 8.2 31 31 0 0 0 2.6 12a31 31 0 0 0 .4 3.8 3 3 0 0 0 2.1 2.1c1.7.4 6.9.4 6.9.4s5.2 0 6.9-.4a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-3.8 31 31 0 0 0-.4-3.8zM10 15.2V8.8L15.2 12 10 15.2z" />
            </SocialGlyph>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-sm text-white/70">
            {FOOTER_QUICK_LINKS.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Resources</h3>
          <ul className="space-y-2 text-sm text-white/70">
            {FOOTER_RESOURCES.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Contact Us</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>{ECG_CONTACTS.phone}</li>
            <li>{ECG_CONTACTS.email}</li>
            <li>{ECG_CONTACTS.address}</li>
            <li>{ECG_CONTACTS.website}</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Stay Updated</h3>
          <p className="mb-3 text-sm text-white/70">
            Subscribe to receive updates and essential updates from ECG.
          </p>
          <form className="flex min-w-0 overflow-hidden rounded-md bg-white">
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-10 min-w-0 flex-1 rounded-none border-0 text-foreground shadow-none focus-visible:ring-0"
            />
            <Button
              type="button"
              className="h-10 rounded-none bg-ecg-gold px-3 text-ecg-gold-foreground hover:bg-ecg-gold/90"
            >
              <ArrowRight />
            </Button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 Electricity Company of Ghana. All rights reserved.</p>
          <p className="text-ecg-gold">Reliable Power for a Brighter Ghana.</p>
        </div>
      </div>
    </footer>
  )
}

function SocialGlyph({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-label={label}>
      {children}
    </svg>
  )
}
