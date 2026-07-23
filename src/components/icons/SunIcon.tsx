export function SunIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 1.5v3" />
      <path d="M12 19.5v3" />
      <path d="M3.26 3.26l2.12 2.12" />
      <path d="M18.62 18.62l2.12 2.12" />
      <path d="M1.5 12h3" />
      <path d="M19.5 12h3" />
      <path d="M5.38 5.38l-2.12-2.12" />
      <path d="M20.74 3.26l-2.12 2.12" />
    </svg>
  );
}
