"use client"

import { toast } from "sonner"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useSession } from "@/hooks/use-session"
import { saveWorkspaceSettings } from "@/lib/workspace"

export default function SettingsPage() {
  const { workspace } = useSession()

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
          <Switch
            checked={workspace.settings.emailNotifications}
            onCheckedChange={(checked) => {
              saveWorkspaceSettings({ ...workspace.settings, emailNotifications: Boolean(checked) })
              toast.success("Notification preference saved.")
            }}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <Label>SMS alerts</Label>
            <p className="text-sm text-muted-foreground">
              Send review decisions to the primary contact number.
            </p>
          </div>
          <Switch
            checked={workspace.settings.smsAlerts}
            onCheckedChange={(checked) => {
              saveWorkspaceSettings({ ...workspace.settings, smsAlerts: Boolean(checked) })
              toast.success("SMS preference saved.")
            }}
          />
        </div>
      </div>
    </div>
  )
}
