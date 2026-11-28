interface CalibrationMarkProps {
  className?: string;
}

export function CalibrationMark({ className = "size-4" }: CalibrationMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M2 20V2H30V20H24V8H8V20H2Z" fill="currentColor" />
      <circle cx="16" cy="14" r="3.5" fill="currentColor" />
      <rect x="2" y="24" width="18" height="6" fill="currentColor" />
      <rect x="24" y="24" width="6" height="6" fill="#c95b3c" />
    </svg>
  );
}
