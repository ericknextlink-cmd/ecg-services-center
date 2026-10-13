"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

export type PageBreadcrumb = {
  label: string
  href?: string
}

export type PageHeaderState = {
  title?: string
  breadcrumbs?: PageBreadcrumb[]
}

type PageHeaderContextValue = {
  header: PageHeaderState
  setHeader: (next: PageHeaderState) => void
}

const PageHeaderContext = createContext<PageHeaderContextValue | null>(null)

export function PageHeaderProvider({ children }: { children: React.ReactNode }) {
  const [header, setHeaderState] = useState<PageHeaderState>({})
  const setHeader = useCallback((next: PageHeaderState) => {
    setHeaderState(next)
  }, [])
  const value = useMemo(() => ({ header, setHeader }), [header, setHeader])

  return (
    <PageHeaderContext.Provider value={value}>{children}</PageHeaderContext.Provider>
  )
}

export function usePageHeaderState() {
  const context = useContext(PageHeaderContext)
  if (!context) {
    throw new Error("usePageHeaderState must be used within PageHeaderProvider")
  }
  return context
}

export function usePageHeader(header: PageHeaderState) {
  const context = useContext(PageHeaderContext)
  const setHeader = context?.setHeader
  const title = header.title ?? ""
  const crumbs =
    header.breadcrumbs?.map((item) => `${item.label}:${item.href ?? ""}`).join("|") ?? ""

  useEffect(() => {
    if (!setHeader) {
      return
    }
    setHeader({
      title,
      breadcrumbs: crumbs
        ? crumbs.split("|").map((item) => {
            const [label, href] = item.split(":")
            return { label, href: href || undefined }
          })
        : undefined,
    })
    return () => setHeader({})
  }, [setHeader, title, crumbs])
}