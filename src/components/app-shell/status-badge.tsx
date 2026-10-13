import { cn } from "cn"
import { Badge } from "@/components/ui/badge"

const TONES: Record<string, string> = {
  draft: "border-slate-200 bg-slate-50 text-slate-600",
  submitted: "border-amber-200 bg-amber-50 text-amber-700",
  "under-review": "border-sky-200 bg-sky-50 text-sky-700",
  "pending-review": "border-amber-200 bg-amber-50 text-amber-700",
  approved: "border-emerald-200 bg-emerald-50 text-emerald-700",
  rejected: "border-red-200 bg-red-50 text-red-700",
  active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "expiring-soon": "border-amber-200 bg-amber-50 text-amber-700",
  expired: "border-red-200 bg-red-50 text-red-700",
  due: "border-amber-200 bg-amber-50 text-amber-700",
  paid: "border-emerald-200 bg-emerald-50 text-emerald-700",
  invited: "border-sky-200 bg-sky-50 text-sky-700",
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="outline"
      className={cn("capitalize", TONES[status] ?? "border-slate-200 bg-slate-50 text-slate-600")}
    >
      {status.replace(/-/g, " ")}
    </Badge>
  )
}
