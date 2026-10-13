"use client"

import { Fragment } from "react"
import { Bell, Menu } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { AppSidebar } from "@/components/app-shell/app-sidebar"
import { usePageHeaderState } from "@/components/app-shell/page-header-context"
import { ThemeSwitcher } from "@/components/theme/theme-switcher"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
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
import { markNotificationsRead } from "@/lib/workspace"

export function AppHeader({ onSignOut }: { onSignOut: () => void }) {
  const { user, workspace } = useSession()
  const { header } = usePageHeaderState()
  const router = useRouter()
  const contactName = user?.contactName ?? "John Mensah"
  const designation = user?.designation ?? "Managing Director"
  const unread = workspace.notifications.filter((item) => !item.read).length

  return (
    <header className="flex h-14 min-w-0 items-center justify-between gap-2 border-b bg-white px-3 sm:h-16 sm:gap-3 sm:px-5 dark:bg-background">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
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
        {header.title ? (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ecg-navy sm:text-base dark:text-foreground">
              {header.title}
            </p>
            {header.breadcrumbs?.length ? (
              <Breadcrumb className="hidden sm:block">
                <BreadcrumbList className="gap-1 text-xs">
                  {header.breadcrumbs.map((crumb, index) => (
                    <Fragment key={`${crumb.label}-${index}`}>
                      {index > 0 ? <BreadcrumbSeparator /> : null}
                      <BreadcrumbItem>
                        {crumb.href && index < header.breadcrumbs!.length - 1 ? (
                          <BreadcrumbLink asChild>
                            <Link href={crumb.href}>{crumb.label}</Link>
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage className="text-ecg-blue">
                            {crumb.label}
                          </BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                    </Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="ml-auto flex min-w-0 items-center gap-1.5 sm:gap-3">
        <ThemeSwitcher className="hidden sm:flex" />
        <ThemeSwitcher variant="compact" className="sm:hidden" />
        <DropdownMenu
          onOpenChange={(open) => {
            if (open && unread > 0) {
              markNotificationsRead()
            }
          }}
        >
          <DropdownMenuTrigger className="relative inline-flex size-8 shrink-0 items-center justify-center rounded-full outline-none hover:bg-muted">
            <Bell className="size-4" />
            {unread > 0 ? (
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-ecg-blue dark:bg-ecg-gold" />
            ) : null}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            {workspace.notifications.length === 0 ? (
              <DropdownMenuItem disabled>No notifications</DropdownMenuItem>
            ) : (
              workspace.notifications.slice(0, 6).map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  className="flex-col items-start gap-0.5 whitespace-normal"
                  onClick={() => item.href && router.push(item.href)}
                >
                  <span className="text-sm font-medium">{item.title}</span>
                  <span className="text-xs text-muted-foreground">{item.body}</span>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
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
