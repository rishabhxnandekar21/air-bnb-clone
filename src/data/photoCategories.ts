import type { PhotoCategory } from '../types';

export interface PhotoCategoryMeta {
  readonly id: PhotoCategory;
  readonly label: string;
  readonly expectedCount: number;
  /**
   * Amenities the reference lists beneath the heading in the Photo Tour,
   * joined with a middle dot. Absent for Exterior and Additional photos,
   * which the reference leaves without a subtitle.
   */
  readonly features?: readonly string[];
  /**
   * How the reference lays this category out in the Photo Tour: each entry
   * is a row holding that many photos, so `[1, 2, 2]` is one full-width
   * photo above two pairs. Read directly from the reference rather than
   * derived, because it does not follow a single rule — Full kitchen opens
   * with a pair instead of a full-width photo, and Gym ends on two pairs
   * rather than alternating. Entries sum to `expectedCount`.
   */
  readonly rowPattern: readonly number[];
}

/**
 * Single source of truth for category display labels and the verified
 * per-category photo counts. The canonical manifest (src/data/photos.ts) is
 * generated from this list, and the dev-time validator checks the manifest
 * against these same counts, so the numbers can never drift apart.
 */
export const PHOTO_CATEGORIES: readonly PhotoCategoryMeta[] = [
  { id: 'living-room-1', label: 'Living room 1', expectedCount: 3, features: ['Sofa', 'Air conditioning', 'Ceiling fan', 'TV'], rowPattern: [1, 2] },
  { id: 'living-room-2', label: 'Living room 2', expectedCount: 7, features: ['Ceiling fan', 'Hot tub'], rowPattern: [1, 2, 1, 2, 1] },
  { id: 'full-kitchen', label: 'Full kitchen', expectedCount: 2, features: ['Freezer', 'Fridge', 'Blender', 'Cooker', 'Cooking basics', 'Kettle', 'Microwave', 'Toaster', 'Wine glasses', 'Coffee', 'Crockery and cutlery'], rowPattern: [2] },
  { id: 'bedroom', label: 'Bedroom', expectedCount: 6, features: ['Double bed', 'Air conditioning', 'Bed linen', 'Ceiling fan', 'Clothes storage', 'Cot', 'Hangers', 'Iron', 'Room-darkening blinds', 'Cleaning available during stay', 'Cleaning products', 'Long-term stays allowed', 'Private entrance', 'Wifi'], rowPattern: [1, 2, 1, 2] },
  { id: 'full-bathroom', label: 'Full bathroom', expectedCount: 1, features: ['Hairdryer', 'Hot water', 'Shampoo', 'Shower gel'], rowPattern: [1] },
  { id: 'gym', label: 'Gym', expectedCount: 5, features: ['Air conditioning', 'Gym', 'Exercise equipment', 'Ceiling fan'], rowPattern: [1, 2, 2] },
  { id: 'exterior', label: 'Exterior', expectedCount: 6, rowPattern: [1, 2, 1, 2] },
  { id: 'pool', label: 'Pool', expectedCount: 3, features: ['Pool'], rowPattern: [1, 2] },
  { id: 'additional-photos', label: 'Additional photos', expectedCount: 10, rowPattern: [1, 2, 1, 2, 1, 2, 1] },
];

export const TOTAL_PHOTO_COUNT = PHOTO_CATEGORIES.reduce(
  (sum, category) => sum + category.expectedCount,
  0,
);

if (import.meta.env.DEV) {
  for (const category of PHOTO_CATEGORIES) {
    const total = category.rowPattern.reduce((sum, row) => sum + row, 0);
    if (total !== category.expectedCount) {
      throw new Error(
        `Photo tour rowPattern for "${category.id}" covers ${total} photos but the category holds ${category.expectedCount}.`,
      );
    }
  }
}
