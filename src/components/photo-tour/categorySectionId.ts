import type { PhotoCategory } from '../../types';

/** Stable DOM id for a category section, derived from the canonical category id. */
export function categorySectionId(category: PhotoCategory): string {
  return category;
}
