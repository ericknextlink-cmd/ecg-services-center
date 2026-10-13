"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export function SocialButtons({ action }: { action: "Continue" | "Sign up" }) {
  function announce(provider: string) {
    toast.info(`${provider} ${action.toLowerCase()} will be connected in a later phase.`)
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Button
        type="button"
        variant="outline"
        className="h-11 rounded-xl text-sm"
        onClick={() => announce("Google")}
      >
        <GoogleMark />
        {action} with Google
      </Button>
      <Button
        type="button"
        variant="outline"
        className="h-11 rounded-xl text-sm"
        onClick={() => announce("Microsoft")}
      >
        <MicrosoftMark />
        {action} with Microsoft
      </Button>
    </div>
  )
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4">
      <path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.2-1.5 3.6-5.1 3.6-3.1 0-5.6-2.5-5.6-5.6S8.9 6.2 12 6.2c1.7 0 2.9.7 3.6 1.3l2.4-2.4C16.5 3.7 14.5 2.8 12 2.8 6.9 2.8 2.8 6.9 2.8 12S6.9 21.2 12 21.2c5.3 0 8.8-3.7 8.8-8.9 0-.6 0-1-.1-1.5H12z" />
    </svg>
  )
}

function MicrosoftMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4">
      <path fill="#F25022" d="M3 3h8.5v8.5H3z" />
      <path fill="#7FBA00" d="M12.5 3H21v8.5h-8.5z" />
      <path fill="#00A4EF" d="M3 12.5h8.5V21H3z" />
      <path fill="#FFB900" d="M12.5 12.5H21V21h-8.5z" />
    </svg>
  )
}
