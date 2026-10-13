import type { LucideIcon } from "lucide-react"
import {
  BookOpen,
  Building2,
  CircleHelp,
  FileBadge,
  FileText,
  FolderOpen,
  Headset,
  History,
  Home,
  IdCard,
  PlusSquare,
  RefreshCw,
  Scale,
  Settings,
  ShieldCheck,
  UserPlus,
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

export type MarketingNavTint = "blue" | "green" | "purple" | "navy"

export type MarketingNavChild = {
  label: string
  href: string
  description: string
  icon: LucideIcon
  tint: MarketingNavTint
}

export type MarketingNavItem = {
  label: string
  href: string
  children?: MarketingNavChild[]
}

export const MARKETING_NAV: MarketingNavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Applications",
    href: "/#applications",
    children: [
      {
        label: "Register as a Supplier",
        href: "/signup",
        description: "Onboard your company as an official ECG vendor.",
        icon: UserPlus,
        tint: "blue",
      },
      {
        label: "Classification Certificate",
        href: "/signup",
        description: "Apply for or manage an ECG classification certificate.",
        icon: FileBadge,
        tint: "green",
      },
      {
        label: "External Licence",
        href: "/signup",
        description: "Apply for or manage an external licence.",
        icon: IdCard,
        tint: "purple",
      },
    ],
  },
  { label: "How It Works", href: "/how-it-works" },
  {
    label: "Resources",
    href: "/resources",
    children: [
      {
        label: "User Guide",
        href: "/resources",
        description: "Step-by-step help for every application type.",
        icon: BookOpen,
        tint: "navy",
      },
      {
        label: "FAQs",
        href: "/help",
        description: "Answers to common registration questions.",
        icon: CircleHelp,
        tint: "blue",
      },
      {
        label: "Policies",
        href: "/resources",
        description: "Vendor rules, requirements, and compliance.",
        icon: ShieldCheck,
        tint: "green",
      },
      {
        label: "Terms & Conditions",
        href: "/legal/terms",
        description: "The legal terms that govern portal use.",
        icon: Scale,
        tint: "navy",
      },
    ],
  },
  { label: "Help & Support", href: "/help" },
]

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
