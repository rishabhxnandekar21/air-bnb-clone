import type { Photo, PhotoCategory } from '../types';
import { PHOTO_CATEGORIES } from './photoCategories';
import { validatePhotoManifest } from './validatePhotoManifest';

/**
 * CANONICAL 43-SLOT MANIFEST — verified against the reference Photo Tour.
 * ------------------------------------------------------------------------
 * Slot order and category boundaries were read directly out of the
 * reference's rendered Photo Tour DOM (each image assigned to its nearest
 * preceding category heading). The derivation was then independently
 * confirmed against the reference's category-nav thumbnails, which are the
 * first image of each category and matched slots 0, 3, 10, 12, 18, 19, 24,
 * 30 and 33 exactly.
 *
 * All 43 slots carry the listing's own photography. The Photo Tour's 43
 * images map 1:1 onto these slots, in this order, with matching category
 * boundaries.
 *
 * Supplied assets: 43 of 43. See README.md, "Image Source Strategy".
 */
type ManifestEntry = readonly [PhotoCategory, string];

const ASSET_BASE = '/images/listing';

const MANIFEST: readonly ManifestEntry[] = [
  // Living room 1 (3)
  ['living-room-1', 'a9831aeb-f441-44f5-a38f-4cf54e3f0fcf.jpeg'],
  ['living-room-1', 'a45feaa2-b607-4092-83ac-5fd4b2894959.jpeg'],
  ['living-room-1', 'f1da1c3d-0d10-481e-9b63-c71f9073f30b.jpeg'],
  // Living room 2 (7)
  ['living-room-2', '090d8b0b-b539-42c0-84f8-e1fb0cdf9a93.jpeg'],
  ['living-room-2', '9be71047-fc52-438a-9270-75cb470f6752.jpeg'],
  ['living-room-2', 'f6de1663-4e9c-4414-b63b-29a154a92ee1.jpeg'],
  ['living-room-2', '2367476f-11c4-4a14-a7c6-267be62c1d59.jpeg'],
  ['living-room-2', '34529829-a971-44d3-ac2f-90ea3678a34d.jpeg'],
  ['living-room-2', '153aa732-4935-48b8-a6fe-b469b6af5efc.jpeg'],
  ['living-room-2', '3c6e6809-1bb1-47a6-8e24-aff593e1c28f.jpeg'],
  // Full kitchen (2)
  ['full-kitchen', '56c44812-52c0-4481-90d8-101ec1f34c7a.jpeg'],
  ['full-kitchen', 'ddc853d7-e658-405c-bedc-8f31106c447e.jpeg'],
  // Bedroom (6)
  ['bedroom', '67c61c6f-6260-4809-9510-0360e58a345d.jpeg'],
  ['bedroom', '1c827136-4a85-4fe0-8e69-3fd8ea19bb17.jpeg'],
  ['bedroom', '0622ab42-b851-4d55-9d9f-df3143bc5909.jpeg'],
  ['bedroom', 'a74e3c0b-3188-4442-9146-1cd4d6ea45df.jpeg'],
  ['bedroom', '48a8ffbc-fbf7-4f84-bc29-ee400da3f08b.jpeg'],
  ['bedroom', '3cf31697-f3f3-4c60-82c4-029acb119ae4.jpeg'],
  // Full bathroom (1)
  ['full-bathroom', '97c78f8a-5090-4663-aebc-ba4e13b47092.jpeg'],
  // Gym (5)
  ['gym', '9aa8e65f-94ac-4ba0-9a10-9ec91e536d22.jpeg'],
  ['gym', '246bd88d-4dd6-4117-a401-02a36ebfcf16.jpeg'],
  ['gym', '4fede77d-7a71-446f-89e3-263af937f3fa.jpeg'],
  ['gym', '79f59adb-5a5f-4d6c-8109-1f01f4ca0d03.jpeg'],
  ['gym', 'f19d8c0a-1d88-42a4-9218-686d4f0db7e4.jpeg'],
  // Exterior (6)
  ['exterior', '23ea6621-6f74-4baa-acea-2fd03e312b41.jpeg'],
  ['exterior', '5adfdf3e-d497-4efc-ab8c-fc559dab311e.jpeg'],
  ['exterior', '608748cd-6ee7-4a71-88a2-ba79d3ddba5a.jpeg'],
  ['exterior', '5b856fde-a393-41bf-b373-c9d02e64221f.jpeg'],
  ['exterior', 'c904e1ab-a39d-4ef0-bdea-8c0bd16b9e3d.jpeg'],
  ['exterior', '42befad7-fb29-473d-91db-b03e7a544d1d.jpeg'],
  // Pool (3)
  ['pool', 'fc02f48f-a937-42c5-895d-f9cc3113d6ca.jpeg'],
  ['pool', '929545d3-e241-46c0-8a70-c24531ce7b54.jpeg'],
  ['pool', '8eb65a8b-e795-4870-b141-6f63b1be24ae.jpeg'],
  // Additional photos (10)
  ['additional-photos', '70325367-cbae-4993-b560-18cd3f6edd53.jpeg'],
  ['additional-photos', 'cc7a56bd-242c-498a-9aef-0cffac619e54.jpeg'],
  ['additional-photos', '30ad93b2-293f-494d-b645-626303c6cb93.jpeg'],
  ['additional-photos', '9642a60d-e9de-4e1a-89c2-9ebd230f4a74.jpeg'],
  ['additional-photos', 'b6599f26-d65c-4df0-baf2-ef18c82a86a3.jpeg'],
  ['additional-photos', 'dc01fd46-b119-48d3-a43b-f6c093e26eca.jpeg'],
  ['additional-photos', 'fe37b80e-da8a-4225-b27b-dfbb5d763c01.jpeg'],
  ['additional-photos', '3c90338e-86b4-423f-aae1-279e0ccc3a18.jpeg'],
  ['additional-photos', '862d936c-0f34-4e50-af87-b519e2781d19.jpeg'],
  ['additional-photos', '79addceb-8c2d-419b-80ff-e29af426a94c.jpeg'],
];

const LABELS = new Map(PHOTO_CATEGORIES.map((c) => [c.id, c.label]));

function buildManifest(): Photo[] {
  const seqByCategory = new Map<PhotoCategory, number>();
  const totalByCategory = new Map<PhotoCategory, number>();
  for (const [category] of MANIFEST) {
    totalByCategory.set(category, (totalByCategory.get(category) ?? 0) + 1);
  }

  return MANIFEST.map(([category, file], index) => {
    const seq = (seqByCategory.get(category) ?? 0) + 1;
    seqByCategory.set(category, seq);
    const label = LABELS.get(category) ?? category;
    return {
      index,
      id: `${category}-${seq}`,
      category,
      categoryLabel: label,
      src: `${ASSET_BASE}/${file}`,
      alt: `${label}, photo ${seq} of ${totalByCategory.get(category) ?? seq}`,
    };
  });
}

/** Canonical, ordered, 43-item photo manifest. Indices 0–42. */
export const PHOTOS: readonly Photo[] = Object.freeze(buildManifest());

/**
 * The five hero-gallery slots, in the reference's on-page order
 * (primary, top-middle, top-right, bottom-middle, bottom-right).
 * Verified by measuring the reference hero's rendered image positions —
 * it is NOT simply slots 0–4.
 */
export const HERO_PHOTO_INDICES: readonly number[] = [6, 3, 4, 12, 28];

/** Slots the reference uses for the "Where you'll sleep" cards. */
export const SLEEPING_PHOTO_INDICES: Readonly<Record<string, number>> = {
  Bedroom: 12,
  'Living room': 0,
};

if (import.meta.env.DEV) {
  validatePhotoManifest(PHOTOS);
}

function groupByCategory(photos: readonly Photo[]): ReadonlyMap<PhotoCategory, readonly Photo[]> {
  const groups = new Map<PhotoCategory, Photo[]>();
  for (const photo of photos) {
    const group = groups.get(photo.category);
    if (group) {
      group.push(photo);
    } else {
      groups.set(photo.category, [photo]);
    }
  }
  return groups;
}

/**
 * `PHOTOS` grouped by category, in category order (see photoCategories.ts).
 * Computed once at module load — not per-render — since `PHOTOS` is a
 * frozen, static array. Consumed by the Photo Tour so it never re-derives
 * this grouping on every render.
 */
export const PHOTOS_BY_CATEGORY = groupByCategory(PHOTOS);
