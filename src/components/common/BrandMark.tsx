import type { SVGProps } from 'react';

/**
 * The header brand mark.
 *
 * Deliberately **not** a reproduction of the reference's mark, and not a
 * near-variant of it either. The reference uses a rounded outline closing to
 * a point with a looping inner counter; this is a different figure — a
 * springing arch over a doorway on a common baseline, drawn as three open
 * strokes on a 32 grid.
 *
 * It occupies the same slot and optical weight as the mark it stands in for,
 * so the header's geometry is unchanged, but nothing about its construction
 * traces the original. The wordmark beside it is set as ordinary type for the
 * same reason — see DECISIONS.md §4.
 *
 * Colour is inherited via `currentColor`.
 */
export function BrandMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable={false}
      {...props}
    >
      {/* Outer arch, springing at y=15 over a 20-wide opening. */}
      <path d="M6 27.2V15a10 10 0 0 1 20 0v12.2" />
      {/* Inner doorway, concentric with the arch above it. */}
      <path d="M12.6 27.2v-7.4a3.4 3.4 0 0 1 6.8 0v7.4" />
      {/* Baseline both stand on. */}
      <path d="M2.8 27.2h26.4" />
    </svg>
  );
}
