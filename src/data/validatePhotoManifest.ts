import type { Photo } from '../types';
import { PHOTO_CATEGORIES, TOTAL_PHOTO_COUNT } from './photoCategories';

/**
 * Development-time integrity check for the canonical photo manifest.
 * Throws a descriptive error the moment the manifest drifts from the
 * verified shape, instead of letting a bad manifest silently reach the UI.
 */
export function validatePhotoManifest(photos: readonly Photo[]): void {
  const errors: string[] = [];

  if (photos.length !== TOTAL_PHOTO_COUNT) {
    errors.push(`Expected exactly ${TOTAL_PHOTO_COUNT} photos, found ${photos.length}.`);
  }

  const seenIds = new Set<string>();
  const seenIndices = new Set<number>();
  const validCategoryIds = new Set(PHOTO_CATEGORIES.map((category) => category.id));
  const countsByCategory = new Map<string, number>();

  photos.forEach((photo, position) => {
    if (photo.index !== position) {
      errors.push(`Photo at position ${position} has index ${photo.index}, expected ${position}.`);
    }

    if (seenIds.has(photo.id)) {
      errors.push(`Duplicate photo id: "${photo.id}".`);
    }
    seenIds.add(photo.id);

    if (seenIndices.has(photo.index)) {
      errors.push(`Duplicate photo index: ${photo.index}.`);
    }
    seenIndices.add(photo.index);

    if (!validCategoryIds.has(photo.category)) {
      errors.push(`Photo "${photo.id}" has invalid category "${photo.category}".`);
    }

    countsByCategory.set(photo.category, (countsByCategory.get(photo.category) ?? 0) + 1);
  });

  for (let i = 0; i < TOTAL_PHOTO_COUNT; i++) {
    if (!seenIndices.has(i)) {
      errors.push(`Missing photo index: ${i}.`);
    }
  }

  for (const category of PHOTO_CATEGORIES) {
    const actual = countsByCategory.get(category.id) ?? 0;
    if (actual !== category.expectedCount) {
      errors.push(
        `Category "${category.id}" has ${actual} photos, expected ${category.expectedCount}.`,
      );
    }
  }

  if (errors.length > 0) {
    throw new Error(`Invalid photo manifest:\n- ${errors.join('\n- ')}`);
  }
}
