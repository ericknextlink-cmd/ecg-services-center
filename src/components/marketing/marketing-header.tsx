"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"

import { cn } from "cn"
import { EcgLogo } from "@/components/brand/ecg-logo"
import { ThemeSwitcher } from "@/components/theme/theme-switcher"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  MARKETING_NAV,
  type MarketingNavChild,
  type MarketingNavTint,
} from "@/lib/data/navigation"

const TINT_TILE: Record<MarketingNavTint, string> = {
  blue: "bg-[#e8eef8] text-[#2f6fe4]",
  green: "bg-[#e7f6ed] text-[#22a45a]",
  purple: "bg-[#eee8f8] text-[#7b5fe0]",
  navy: "bg-slate-100 text-ecg-navy",
}

export function MarketingHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 bg-ecg-navy text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-[76px] lg:gap-6 lg:px-8">
        <Link href="/" className="min-w-0 shrink-0">
          <EcgLogo
            compact
            markClassName="size-9 sm:size-11"
            wordmarkClassName="text-white"
            taglineClassName="text-white/70"
          />
        </Link>

        <nav className="hidden min-w-0 items-center gap-4 text-sm font-medium lg:flex xl:gap-7">
          {MARKETING_NAV.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href.split("#")[0] || item.href)

            if (item.children) {
              return (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger className="group inline-flex items-center gap-1 text-white/80 outline-none hover:text-white data-[state=open]:text-white">
                    {item.label}
                    <ChevronDown className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    sideOffset={16}
                    className="w-[22rem] min-w-[22rem] overflow-hidden rounded-xl border-0 bg-white p-0 text-ecg-navy shadow-[0_18px_50px_rgba(7,18,42,0.18)] ring-1 ring-slate-200/90"
                  >
                    <div className="h-0.5 bg-ecg-gold" />
                    <p className="px-3.5 pt-3 pb-1 text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
                      {item.label}
                    </p>
                    <div className="flex flex-col gap-0.5 p-1.5 pb-2">
                      {item.children.map((child) => (
                        <NavDropdownItem key={child.label} child={child} />
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative py-1 text-white/80 hover:text-white",
                  isActive && "text-white",
                )}
              >
                {item.label}
                {isActive ? (
                  <span className="absolute -bottom-3 left-0 h-[3px] w-full rounded-full bg-ecg-gold" />
                ) : null}
              </Link>
            )
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <ThemeSwitcher
            variant="compact"
            className="text-white hover:bg-white/10 hover:text-white"
          />
          <Button
            asChild
            variant="outline"
            className="hidden h-9 rounded-full border-white/30 bg-transparent px-4 text-white hover:bg-white/10 hover:text-white lg:inline-flex"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            asChild
            className="h-8 rounded-full bg-ecg-gold px-3 text-xs text-ecg-gold-foreground hover:bg-ecg-gold/90 sm:h-9 sm:px-5 sm:text-sm"
          >
            <Link href="/signup">Sign Up</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 lg:hidden"
          aria-label="Open menu"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-[min(22rem,100vw)] gap-0 bg-white p-0 data-[side=right]:w-[min(22rem,100vw)] sm:max-w-[22rem]"
      >
        <div className="flex items-center justify-between bg-ecg-navy px-4 py-3.5 text-white">
          <EcgLogo
            markClassName="size-9"
            wordmarkClassName="text-white"
            taglineClassName="hidden"
          />
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-9 text-white hover:bg-white/10 hover:text-white"
              aria-label="Close menu"
            >
              <X className="size-5" />
            </Button>
          </SheetClose>
        </div>
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Site navigation
        </SheetDescription>

        <nav className="flex-1 overflow-y-auto px-3 py-2">
          {MARKETING_NAV.map((item) => {
            if (!item.children) {
              return (
                <SheetClose key={item.label} asChild>
                  <Link
                    href={item.href}
                    className="flex min-h-12 items-center rounded-lg px-3 text-[15px] font-semibold text-ecg-navy hover:bg-slate-50"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              )
            }

            return (
              <Accordion
                key={item.label}
                type="single"
                collapsible
                className="w-full"
              >
                <AccordionItem value={item.label} className="border-0">
                  <AccordionTrigger className="min-h-12 rounded-lg px-3 py-0 text-[15px] font-semibold text-ecg-navy hover:bg-slate-50 hover:no-underline">
                    {item.label}
                  </AccordionTrigger>
                  <AccordionContent className="h-auto pb-1 [&_a]:no-underline">
                    <div className="ml-2 flex flex-col gap-0.5 border-l-2 border-ecg-gold/70 pl-2">
                      {item.children.map((child) => (
                        <MobileNavChildLink key={child.label} child={child} />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          })}
        </nav>

        <SheetFooter className="border-t border-slate-100 p-4">
          <SheetClose asChild>
            <Button asChild variant="outline" className="h-10 w-full rounded-full">
              <Link href="/login">Login</Link>
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              asChild
              className="h-10 w-full rounded-full bg-ecg-gold text-ecg-gold-foreground hover:bg-ecg-gold/90"
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function MobileNavChildLink({ child }: { child: MarketingNavChild }) {
  const Icon = child.icon

  return (
    <SheetClose asChild>
      <Link
        href={child.href}
        className="flex items-start gap-3 rounded-lg px-2 py-2.5 hover:bg-slate-50"
      >
        <span
          className={cn(
            "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md",
            TINT_TILE[child.tint],
          )}
        >
          <Icon className="size-3.5" strokeWidth={2} />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-ecg-navy">
            {child.label}
          </span>
          <span className="mt-0.5 block text-[11px] leading-4 text-slate-500">
            {child.description}
          </span>
        </span>
      </Link>
    </SheetClose>
  )
}

function NavDropdownItem({ child }: { child: MarketingNavChild }) {
  const Icon = child.icon

  return (
    <DropdownMenuItem asChild className="rounded-lg p-0 focus:bg-transparent">
      <Link
        href={child.href}
        className="flex items-start gap-3 rounded-lg px-2.5 py-2.5 hover:bg-slate-50"
      >
        <span
          className={cn(
            "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg",
            TINT_TILE[child.tint],
          )}
        >
          <Icon className="size-4" strokeWidth={2} />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-ecg-navy">
            {child.label}
          </span>
          <span className="mt-0.5 block text-[12px] leading-4 text-slate-500">
            {child.description}
          </span>
        </span>
      </Link>
    </DropdownMenuItem>
  )
}
