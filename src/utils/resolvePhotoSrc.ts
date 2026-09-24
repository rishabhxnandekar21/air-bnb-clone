const PLACEHOLDER_SCHEME = 'placeholder://';

/**
 * The single point of contact between the canonical photo manifest and the
 * rendered DOM. All 43 slots now carry real assets, so in practice this
 * returns the src unchanged; it stays as the single gate that decides
 * whether a `src` is renderable, so callers never point an `<img>` at a
 * URL that cannot resolve. `PhotoTile` still falls back to the placeholder
 * tile on a load error, which keeps a missing file from rendering as a
 * broken image.
 */
export function resolvePhotoSrc(src: string): string | null {
  return src.startsWith(PLACEHOLDER_SCHEME) ? null : src;
}
