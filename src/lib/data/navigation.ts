import type { LucideIcon } from "lucide-react"
import {
  Building2,
  CircleHelp,
  FileText,
  FolderOpen,
  Headset,
  History,
  Home,
  PlusSquare,
  RefreshCw,
  Settings,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react"

export type AppNavItem = {
  label: string
  href: string
  icon: LucideIcon
}

export type AppNavGroup = {
  label?: string
  items: AppNavItem[]
}

export const APP_NAVIGATION: AppNavGroup[] = [
  {
    items: [{ label: "Dashboard", href: "/app/dashboard", icon: Home }],
  },
  {
    label: "Applications",
    items: [
      { label: "My Applications", href: "/app/applications", icon: FileText },
      { label: "New Application", href: "/app/applications/new", icon: PlusSquare },
      { label: "Documents", href: "/app/documents", icon: FolderOpen },
    ],
  },
  {
    label: "Certification",
    items: [
      {
        label: "Certificates & Licences",
        href: "/app/certificates",
        icon: ShieldCheck,
      },
      { label: "Renewals", href: "/app/renewals", icon: RefreshCw },
    ],
  },
  {
    label: "Finance",
    items: [
      { label: "Payments", href: "/app/payments", icon: Wallet },
      { label: "Payment History", href: "/app/payments/history", icon: History },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Company Profile", href: "/app/profile", icon: Building2 },
      { label: "Users & Access", href: "/app/users", icon: Users },
      { label: "Settings", href: "/app/settings", icon: Settings },
    ],
  },
  {
    label: "Support",
    items: [
      { label: "Help Centre", href: "/app/help", icon: CircleHelp },
      { label: "Contact Us", href: "/app/contact", icon: Headset },
    ],
  },
]

export const MARKETING_NAV = [
  { label: "Home", href: "/" },
  {
    label: "Applications",
    href: "/#applications",
    children: [
      { label: "Register as a Supplier", href: "/#applications" },
      { label: "Classification Certificate", href: "/#applications" },
      { label: "External Licence", href: "/#applications" },
    ],
  },
  { label: "How It Works", href: "/how-it-works" },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "User Guide", href: "/resources" },
      { label: "FAQs", href: "/help" },
      { label: "Policies", href: "/resources" },
      { label: "Terms & Conditions", href: "/legal/terms" },
    ],
  },
  { label: "Help & Support", href: "/help" },
] as const

export const FOOTER_QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Applications", href: "/#applications" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Resources", href: "/resources" },
  { label: "Help & Support", href: "/help" },
]

export const FOOTER_RESOURCES = [
  { label: "User Guide", href: "/resources" },
  { label: "FAQs", href: "/help" },
  { label: "Policies", href: "/resources" },
  { label: "Terms & Conditions", href: "/legal/terms" },
]

export const ECG_CONTACTS = {
  phone: "0302 611 611",
  email: "procurement@ecg.com.gh",
  address: "ECG Head Office, Accra, Ghana",
  website: "www.ecg.com.gh",
}
