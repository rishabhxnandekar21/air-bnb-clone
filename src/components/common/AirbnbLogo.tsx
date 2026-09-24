import type { SVGProps } from 'react';

/**
 * Brand mark for the header link.
 *
 * An original drawing in the same construction as the reference's mark — a
 * single rounded outline closing to a point at the top, with an open inner
 * loop — stroked rather than filled so the inner counter stays open at 32px.
 * The real logotype is a custom drawing and is not reproduced; the wordmark
 * beside this mark is set as type instead, which the header owns. Colour is
 * inherited via `currentColor`.
 */
export function AirbnbLogo(props: SVGProps<SVGSVGElement>) {
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
      <path d="M16 4.2c-1.5 0-2.4 1-3.3 2.7L5.2 21.4c-.7 1.4-1.1 2.4-1.1 3.3a3.9 3.9 0 0 0 6.9 2.4c1.6-1.9 3.3-4.2 5-6.8 1.7 2.6 3.4 4.9 5 6.8a3.9 3.9 0 0 0 6.9-2.4c0-.9-.4-1.9-1.1-3.3L19.3 6.9C18.4 5.2 17.5 4.2 16 4.2Z" />
      <path d="M16 20.3c-1.4-2.2-2.2-3.9-2.2-5.2 0-1.4.9-2.3 2.2-2.3s2.2.9 2.2 2.3c0 1.3-.8 3-2.2 5.2Z" />
    </svg>
  );
}
