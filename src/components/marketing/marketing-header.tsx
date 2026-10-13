"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu } from "lucide-react"

import { cn } from "cn"
import { EcgLogo } from "@/components/brand/ecg-logo"
import { ThemeSwitcher } from "@/components/theme/theme-switcher"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MARKETING_NAV } from "@/lib/data/navigation"

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

            if ("children" in item && item.children) {
              return (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger className="inline-flex items-center gap-1 text-white/80 outline-none hover:text-white">
                    {item.label}
                    <ChevronDown className="size-3.5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.label} asChild>
                        <Link href={child.href}>{child.label}</Link>
                      </DropdownMenuItem>
                    ))}
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
          <ThemeSwitcher variant="compact" className="text-white hover:bg-white/10 hover:text-white" />
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
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 lg:hidden"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(20rem,100vw)]">
              <div className="mt-10 flex flex-col gap-4">
                {MARKETING_NAV.map((item) => (
                  <Link key={item.label} href={item.href} className="text-base font-medium">
                    {item.label}
                  </Link>
                ))}
                <Button asChild className="mt-4">
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
