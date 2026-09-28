import { useEffect, type RefObject } from 'react';

const FOCUSABLE_SELECTOR =
  'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface OverlayFocusOptions {
  /**
   * False while a higher overlay is stacked on top of this one. A covered
   * overlay keeps its focus bookkeeping but stops answering Escape and stops
   * trapping Tab, so the topmost layer alone owns the keyboard.
   *
   * Without this, two overlays both listening on `window` each call their own
   * `onEscape`, and a single Escape unwinds two history entries instead of
   * one — closing the Photo Tour and the Lightbox together.
   */
  isTopmost?: boolean;
  onEscape?: () => void;
}

/**
 * Focus management for a modal overlay: moves focus in on open, keeps Tab
 * inside it, restores focus to whatever opened it on close, and answers
 * Escape while this overlay is the topmost one.
 *
 * Focus capture and restore run once per mount regardless of `isTopmost` —
 * an overlay is always topmost at the moment it mounts, and the layer above
 * restores focus to this one on its way out.
 */
export function useOverlayFocus(
  containerRef: RefObject<HTMLElement | null>,
  initialFocusRef: RefObject<HTMLElement | null>,
  { isTopmost = true, onEscape }: OverlayFocusOptions = {},
): void {
  useEffect(() => {
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    // Focus the requested control, falling back to the container so the
    // overlay is never left with focus stranded on the page behind it.
    const initial = initialFocusRef.current ?? containerRef.current;
    initial?.focus();

    return () => {
      // `preventScroll` matters: focus() scrolls its target into view by
      // default, which would undo the scroll position the page behind has
      // just restored.
      previouslyFocused?.focus({ preventScroll: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isTopmost) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onEscape?.();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const container = containerRef.current;
      if (!container) {
        return;
      }

      const focusable = [...container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)].filter(
        (element) => element.offsetParent !== null || element === container,
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) {
        // Nothing focusable inside: keep focus on the container rather than
        // letting Tab walk out into the page underneath.
        event.preventDefault();
        container.focus();
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [containerRef, isTopmost, onEscape]);
}
