import { useEffect } from 'react';

/**
 * Locks background scroll while the calling component is mounted. Safe to
 * use in nested overlays (e.g. Lightbox mounted over PhotoTour): each
 * instance captures whatever `overflow` value was already set when it
 * mounted and restores exactly that value on unmount, so an outer lock
 * stays in effect after an inner one unmounts.
 */
export function useBodyScrollLock(): void {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);
}
