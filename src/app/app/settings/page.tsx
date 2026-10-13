"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold sm:text-3xl">Settings</h1>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        Appearance follows the light, warm and dark controls in the header.
      </p>
      <div className="space-y-4 rounded-3xl border bg-card p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Label>Email notifications</Label>
            <p className="text-sm text-muted-foreground">
              Application status updates from ECG.
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <Label>SMS alerts</Label>
            <p className="text-sm text-muted-foreground">
              Send review decisions to the primary contact number.
            </p>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  )
}
