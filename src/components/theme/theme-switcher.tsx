"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"

import { cn } from "cn"
import { Button } from "@/components/ui/button"

type ThemeSwitcherProps = {
  variant?: "app" | "compact"
  className?: string
}

const THEMES = [
  { id: "light", label: "Light", icon: Sun },
  { id: "warm", label: "Warm", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
] as const

function subscribeToClient() {
  return () => {}
}

export function ThemeSwitcher({
  variant = "app",
  className,
}: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(subscribeToClient, () => true, () => false)

  if (variant === "compact") {
    const isDark = mounted && theme === "dark"

    return (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn("size-9 rounded-full", className)}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label="Toggle dark mode"
      >
        {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </Button>
    )
  }

  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-border bg-background p-1 shadow-sm",
        className,
      )}
    >
      {THEMES.map((item) => {
        const Icon = item.icon
        const isActive = mounted && theme === item.id

        return (
          <button
            key={item.id}
            type="button"
            aria-label={item.label}
            onClick={() => setTheme(item.id)}
            className={cn(
              "flex size-8 items-center justify-center rounded-full transition-colors",
              isActive
                ? "bg-ecg-gold text-ecg-navy shadow-sm"
                : "text-muted-foreground hover:text-foreground",
              item.id === "warm" && isActive && "bg-amber-400",
            )}
          >
            <Icon className={cn("size-4", item.id === "warm" && "fill-current")} />
          </button>
        )
      })}
    </div>
  )
}
