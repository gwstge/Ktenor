/**
 * Decorative exposed-pipe line art. Purely atmospheric — an industrial
 * detail in the margins, not a literal illustration of anything.
 */
export function PipeAccent({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 160" fill="none" className={className} aria-hidden>
      <path
        d="M0 24h96a14 14 0 0 1 14 14v0a14 14 0 0 0 14 14h116"
        stroke="url(#pipe-grad)"
        strokeWidth="3"
      />
      <circle cx="96" cy="24" r="6" stroke="url(#pipe-grad)" strokeWidth="2" />
      <circle cx="124" cy="52" r="6" stroke="url(#pipe-grad)" strokeWidth="2" />
      <path
        d="M20 140h60a10 10 0 0 0 10-10v-20"
        stroke="url(#pipe-grad)"
        strokeWidth="3"
        opacity="0.6"
      />
      <defs>
        <linearGradient id="pipe-grad" x1="0" y1="0" x2="240" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--copper)" />
          <stop offset="1" stopColor="var(--copper-deep)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
