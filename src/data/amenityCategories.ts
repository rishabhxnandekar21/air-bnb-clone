import type { AmenityCategory } from '../types';

/**
 * The listing's full amenity list, in the twelve groups its "What this
 * place offers" dialog uses. `unavailable` marks the two entries that
 * render struck through, both alarms this listing has not reported.
 */
export const AMENITY_CATEGORIES: readonly AmenityCategory[] = [
  {
    id: 'bathroom',
    label: 'Bathroom',
    amenities: [
      { id: 'hairdryer', name: 'Hairdryer' },
      { id: 'cleaning-products', name: 'Cleaning products' },
      { id: 'shampoo', name: 'Shampoo' },
      { id: 'hot-water', name: 'Hot water' },
      { id: 'shower-gel', name: 'Shower gel' },
    ],
  },
  {
    id: 'bedroom-and-laundry',
    label: 'Bedroom and laundry',
    amenities: [
      { id: 'washing-machine', name: 'Washing machine' },
      { id: 'hangers', name: 'Hangers' },
      { id: 'bed-linen', name: 'Bed linen' },
      { id: 'room-darkening-blinds', name: 'Room-darkening blinds' },
      { id: 'iron', name: 'Iron' },
      { id: 'clothes-storage', name: 'Clothes storage' },
      { id: 'cot', name: 'Cot' },
    ],
  },
  {
    id: 'entertainment',
    label: 'Entertainment',
    amenities: [
      { id: 'tv', name: 'TV' },
    ],
  },
  {
    id: 'family',
    label: 'Family',
    amenities: [
      { id: 'cot', name: 'Cot' },
    ],
  },
  {
    id: 'heating-and-cooling',
    label: 'Heating and cooling',
    amenities: [
      { id: 'air-conditioning', name: 'Air conditioning' },
      { id: 'ceiling-fan', name: 'Ceiling fan' },
    ],
  },
  {
    id: 'home-safety',
    label: 'Home safety',
    amenities: [
      { id: 'exterior-security-cameras-on-property', name: 'Exterior security cameras on property' },
      { id: 'carbon-monoxide-alarm', name: 'Carbon monoxide alarm', unavailable: true },
      { id: 'smoke-alarm', name: 'Smoke alarm', unavailable: true },
    ],
  },
  {
    id: 'internet-and-office',
    label: 'Internet and office',
    amenities: [
      { id: 'wifi', name: 'Wifi' },
      { id: 'dedicated-workspace', name: 'Dedicated workspace' },
    ],
  },
  {
    id: 'kitchen-and-dining',
    label: 'Kitchen and dining',
    amenities: [
      { id: 'kitchen', name: 'Kitchen' },
      { id: 'fridge', name: 'Fridge' },
      { id: 'freezer', name: 'Freezer' },
      { id: 'microwave', name: 'Microwave' },
      { id: 'cooking-basics', name: 'Cooking basics' },
      { id: 'crockery-and-cutlery', name: 'Crockery and cutlery' },
      { id: 'kettle', name: 'Kettle' },
      { id: 'coffee', name: 'Coffee' },
      { id: 'wine-glasses', name: 'Wine glasses' },
      { id: 'toaster', name: 'Toaster' },
      { id: 'blender', name: 'Blender' },
      { id: 'cooker', name: 'Cooker' },
    ],
  },
  {
    id: 'location-features',
    label: 'Location features',
    amenities: [
      { id: 'private-entrance', name: 'Private entrance' },
    ],
  },
  {
    id: 'outdoor',
    label: 'Outdoor',
    amenities: [
      { id: 'patio-or-balcony', name: 'Patio or balcony' },
      { id: 'outdoor-dining-area', name: 'Outdoor dining area' },
    ],
  },
  {
    id: 'parking-and-facilities',
    label: 'Parking and facilities',
    amenities: [
      { id: 'free-parking-on-premises', name: 'Free parking on premises' },
      { id: 'pool', name: 'Pool' },
      { id: 'hot-tub', name: 'Hot tub' },
      { id: 'gym', name: 'Gym' },
    ],
  },
  {
    id: 'services',
    label: 'Services',
    amenities: [
      { id: 'pets-allowed', name: 'Pets allowed' },
      { id: 'cleaning-available-during-stay', name: 'Cleaning available during stay' },
      { id: 'long-term-stays-allowed', name: 'Long-term stays allowed' },
      { id: 'self-check-in', name: 'Self check-in' },
    ],
  },
];

/** Number of amenities actually listed in the dialog (44). */
export const TOTAL_AMENITY_COUNT = AMENITY_CATEGORIES.reduce(
  (sum, category) => sum + category.amenities.length,
  0,
);

/**
 * The count the reference prints on its "Show all N amenities" button.
 * The reference is internally inconsistent here — its button advertises 50
 * while its dialog renders 44 rows — so the advertised figure is kept as its
 * own value rather than derived from the list, and the button uses it so the
 * label matches the reference exactly.
 */
export const ADVERTISED_AMENITY_COUNT = 50;
