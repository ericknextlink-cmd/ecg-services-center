import Link from "next/link"

export function EmptyApplications() {
  return (
    <div className="mt-6 rounded-2xl border bg-card px-4 py-10 text-center sm:rounded-3xl sm:px-6 sm:py-16">
      <FolderArt />
      <h3 className="mt-4 text-lg font-semibold">No Applications Yet</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        You haven&apos;t submitted any applications.
      </p>
      <Link
        href="/app/applications/new"
        className="mt-3 inline-block text-sm font-medium text-ecg-blue dark:text-ecg-gold"
      >
        Get started by choosing an application above.
      </Link>
    </div>
  )
}

function FolderArt() {
  return (
    <svg viewBox="0 0 180 120" className="mx-auto h-24 w-40 text-sky-200 dark:text-muted">
      <rect x="28" y="42" width="124" height="62" rx="10" fill="currentColor" />
      <path d="M28 52c0-8 6-14 14-14h28l8 8h74c8 0 14 6 14 14v4H28z" fill="currentColor" />
      <rect x="58" y="28" width="52" height="64" rx="6" className="fill-sky-100 dark:fill-muted-foreground/20" />
      <rect x="70" y="22" width="52" height="64" rx="6" className="fill-white dark:fill-muted" />
      <path d="M78 38h28M78 48h22M78 58h26" stroke="currentColor" strokeWidth="3" className="text-sky-300 dark:text-muted-foreground" />
    </svg>
  )
}
