import Image from "next/image"

import { cn } from "cn"

type EcgLogoProps = {
  className?: string
  markClassName?: string
  showWordmark?: boolean
  wordmarkClassName?: string
  taglineClassName?: string
  compact?: boolean
}

export function EcgLogo({
  className,
  markClassName,
  showWordmark = true,
  wordmarkClassName,
  taglineClassName,
  compact = false,
}: EcgLogoProps) {
  return (
    <div className={cn("flex min-w-0 items-center gap-2.5", className)}>
      <Image
        src="/ecg-logo.png"
        alt="Electricity Company of Ghana"
        width={59}
        height={58}
        className={cn("size-11 shrink-0 object-contain", markClassName)}
        priority
      />
      {showWordmark ? (
        <div className={cn("min-w-0 leading-tight", compact && "hidden sm:block")}>
          <p
            className={cn(
              "text-[10px] font-extrabold tracking-[0.12em] uppercase sm:text-[11px]",
              wordmarkClassName,
            )}
          >
            Electricity
            <br />
            Company of Ghana
          </p>
          <p
            className={cn(
              "mt-0.5 hidden text-[10px] font-medium tracking-wide text-current/70 xl:block",
              taglineClassName,
            )}
          >
            Powering Communities. Enriching Lives.
          </p>
        </div>
      ) : null}
    </div>
  )
}
