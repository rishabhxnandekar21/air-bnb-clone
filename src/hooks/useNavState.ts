import { useCallback, useEffect, useState } from 'react';
import { readNavState, pushNavState, replaceNavState, onPopState, type NavState } from '../utils/url-state';

/**
 * Single source of truth for URL-driven modal state, shared between the
 * component that opens a modal (e.g. "Show all photos") and the component
 * that renders it (e.g. PhotoTour). `pushState`/`replaceState` never fire
 * `popstate`, so `navigate` updates React state directly instead of
 * waiting for a round trip through the browser; the `popstate` listener
 * only needs to handle actual back/forward navigation.
 */
export function useNavState() {
  const [navState, setNavState] = useState<NavState>(() => readNavState());

  useEffect(() => onPopState(setNavState), []);

  const navigate = useCallback((next: NavState, options?: { replace?: boolean }) => {
    if (options?.replace) {
      replaceNavState(next);
    } else {
      pushNavState(next);
    }
    setNavState(next);
  }, []);

  const goBack = useCallback(() => {
    window.history.back();
  }, []);

  return { navState, navigate, goBack };
}
