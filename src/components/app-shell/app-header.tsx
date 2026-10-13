"use client"

import { Bell, Menu } from "lucide-react"
import { useRouter } from "next/navigation"

import { AppSidebar } from "@/components/app-shell/app-sidebar"
import { ThemeSwitcher } from "@/components/theme/theme-switcher"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useSession } from "@/hooks/use-session"
import { initialsFromContact } from "@/lib/session"

export function AppHeader({ onSignOut }: { onSignOut: () => void }) {
  const { user } = useSession()
  const router = useRouter()
  const contactName = user?.contactName ?? "John Mensah"
  const designation = user?.designation ?? "Managing Director"

  return (
    <header className="flex h-14 min-w-0 items-center justify-between gap-2 border-b bg-background px-3 sm:h-16 sm:gap-3 sm:px-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0 lg:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[min(16rem,100vw)] gap-0 p-0">
          <AppSidebar />
        </SheetContent>
      </Sheet>
      <Button variant="ghost" size="icon" className="hidden shrink-0 lg:inline-flex">
        <Menu />
      </Button>

      <div className="ml-auto flex min-w-0 items-center gap-1.5 sm:gap-3">
        <ThemeSwitcher className="hidden sm:flex" />
        <ThemeSwitcher variant="compact" className="sm:hidden" />
        <Button variant="ghost" size="icon" className="relative shrink-0 rounded-full">
          <Bell />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-ecg-blue dark:bg-ecg-gold" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex min-w-0 items-center gap-2 rounded-full py-1 pr-1 pl-1 outline-none hover:bg-muted sm:gap-3 sm:pr-2">
            <Avatar className="size-8 sm:size-9">
              <AvatarFallback className="bg-slate-100 text-xs font-semibold text-slate-700 sm:text-sm">
                {initialsFromContact(contactName)}
              </AvatarFallback>
            </Avatar>
            <span className="hidden min-w-0 text-left md:block">
              <span className="block truncate text-sm font-semibold leading-4">{contactName}</span>
              <span className="block truncate text-xs text-muted-foreground">{designation}</span>
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem onClick={() => router.push("/app/profile")}>
              Company Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/app/settings")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSignOut}>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
