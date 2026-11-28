interface CalibrationMarkProps {
  className?: string;
}

export function CalibrationMark({ className = "size-4" }: CalibrationMarkProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Corner registration brackets */}
      <path
        d="M1 4.5V1H4.5M11.5 1H15V4.5M1 11.5V15H4.5M11.5 15H15V11.5"
        stroke="currentColor"
        strokeWidth="1"
      />
      {/* Vernier crosshair axes */}
      <path
        d="M8 2.5V5.5M8 10.5V13.5M2.5 8H5.5M10.5 8H13.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.6"
      />
      {/* Single terracotta datum tick */}
      <rect x="7" y="7" width="2" height="2" fill="#c95b3c" />
    </svg>
  );
}
