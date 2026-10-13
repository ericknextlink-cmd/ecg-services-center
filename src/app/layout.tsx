import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/components/providers/theme-provider"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const SITE_TITLE = "ECG Vendor Registration & Certification System"
const SITE_DESCRIPTION =
  "A secure and transparent platform to register as a supplier and manage certification applications with the Electricity Company of Ghana."

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s | ECG Vendor Portal",
  },
  description: SITE_DESCRIPTION,
  applicationName: "ECG Vendor Portal",
  keywords: [
    "ECG",
    "Electricity Company of Ghana",
    "vendor registration",
    "supplier certification",
    "classification certificate",
    "external licence",
  ],
  icons: {
    icon: "/ecg-logo.png",
    apple: "/ecg-logo.png",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_GH",
    siteName: "ECG Vendor Portal",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} h-full`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <TooltipProvider>
            {children}
            <Toaster position="bottom-right" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
