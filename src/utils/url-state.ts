import type { ModalKind } from '../types';
import { PHOTOS } from '../data/photos';

const MODAL_PARAM = 'modal';
const MODAL_ITEM_PARAM = 'modalItem';
const LIGHTBOX_INDEX_OFFSET = 1000;
const MAX_LIGHTBOX_INDEX = PHOTOS.length - 1;

export interface NavState {
  modal: ModalKind | null;
  lightboxIndex: number | null;
}

function isModalKind(value: string): value is ModalKind {
  return value === 'PHOTO_TOUR_SCROLLABLE' || value === 'AMENITIES';
}

/**
 * Parses a `modalItem` query value into a 0-based lightbox index.
 * Only meaningful for the Photo Tour modal — `modalItem` alongside
 * `AMENITIES` (or any other future modal kind) is ignored, so those
 * modals can never accidentally inherit a stray lightbox index.
 * Only accepts values shaped like `1000`–`1042` (offset + a valid photo
 * index). Anything else — non-numeric, decimal, negative, out of range,
 * or `modalItem` present without the Photo Tour modal — resolves to
 * `null` rather than throwing, so a malformed or hand-edited URL never
 * crashes the app.
 */
function parseLightboxIndex(modalItemParam: string | null, modal: ModalKind | null): number | null {
  if (modal !== 'PHOTO_TOUR_SCROLLABLE' || modalItemParam === null) {
    return null;
  }
  if (!/^\d+$/.test(modalItemParam)) {
    return null;
  }
  const value = Number(modalItemParam);
  const index = value - LIGHTBOX_INDEX_OFFSET;
  if (index < 0 || index > MAX_LIGHTBOX_INDEX) {
    return null;
  }
  return index;
}

export function readNavState(search: string = window.location.search): NavState {
  const params = new URLSearchParams(search);
  const modalParam = params.get(MODAL_PARAM);
  const modal = modalParam && isModalKind(modalParam) ? modalParam : null;
  const lightboxIndex = parseLightboxIndex(params.get(MODAL_ITEM_PARAM), modal);

  return { modal, lightboxIndex };
}

function buildSearch(state: NavState): string {
  const params = new URLSearchParams();
  if (state.modal) {
    params.set(MODAL_PARAM, state.modal);
    if (
      state.modal === 'PHOTO_TOUR_SCROLLABLE' &&
      state.lightboxIndex !== null &&
      state.lightboxIndex >= 0 &&
      state.lightboxIndex <= MAX_LIGHTBOX_INDEX
    ) {
      params.set(MODAL_ITEM_PARAM, String(LIGHTBOX_INDEX_OFFSET + state.lightboxIndex));
    }
  }
  const query = params.toString();
  return query ? `?${query}` : window.location.pathname;
}

export function pushNavState(state: NavState): void {
  const url = buildSearch(state);
  window.history.pushState(state, '', url);
}

export function replaceNavState(state: NavState): void {
  const url = buildSearch(state);
  window.history.replaceState(state, '', url);
}

export function onPopState(handler: (state: NavState) => void): () => void {
  const listener = () => handler(readNavState());
  window.addEventListener('popstate', listener);
  return () => window.removeEventListener('popstate', listener);
}
