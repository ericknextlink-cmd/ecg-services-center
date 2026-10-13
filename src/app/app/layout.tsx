import { AuthGate } from "@/components/app-shell/auth-gate"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthGate>{children}</AuthGate>
}
