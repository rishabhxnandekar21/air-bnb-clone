import type { Rating, Review } from './rating';
import type { Amenity } from './amenity';
import type { Host } from './host';
import type { BookingDetails } from './booking';

export interface SleepingArrangement {
  room: string;
  description: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
}

export interface PropertyCapacity {
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}

/** The dismissible offer banner that sits above the booking card. */
export interface Promotion {
  headline: string;
  termsLabel: string;
  actionLabel: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Fields below `booking` are optional because the corresponding reference
 * text has not been supplied to this project. Every consumer renders
 * nothing when its field is absent, so the page stays complete and valid
 * either way, and the real content drops in without component changes.
 */
export interface Property {
  id: string;
  title: string;
  location: string;
  locationNotice: string;
  propertyType: string;
  /** Shorter place name used in the summary heading ("... in Candolim, India"). */
  shortLocation: string;
  /** Set when the listing carries Airbnb's "Guest favourite" distinction. */
  guestFavouriteNote?: string;
  guestFavouriteBlurb?: string;
  neighbourhoodHighlight?: string;
  cancellationDetails?: readonly string[];
  rating: Rating;
  features: Feature[];
  sleepingArrangements: SleepingArrangement[];
  amenities: Amenity[];
  host: Host;
  booking: BookingDetails;
  description?: string;
  reviews?: Review[];
  houseRules?: readonly string[];
  safetyItems?: readonly string[];
  capacity?: PropertyCapacity;
  promotion?: Promotion;
  coordinates?: Coordinates;
}
