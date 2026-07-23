export function NoiseOverlay() {
  return (
    <svg
      className="fixed inset-0 z-[2] pointer-events-none"
      width="100%"
      height="100%"
      aria-hidden="true"
    >
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.025 0"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" opacity="0.5" />
    </svg>
  );
}
