import type { Property } from '../../types';
import { PropertySummary } from './PropertySummary';
import { PropertyDescription } from './PropertyDescription';
import { FeatureHighlights } from './FeatureHighlights';
import { SleepingArrangements } from './SleepingArrangements';
import { AmenitiesPreview } from './AmenitiesPreview';
import { AvailabilityCalendar } from './AvailabilityCalendar';

interface ListingBodyProps {
  property: Property;
  onShowAllAmenities: () => void;
}

/**
 * The sections that sit in the narrow left column beside the booking rail.
 * On the reference the two-column grid closes right after the availability
 * calendar — everything from the reviews down runs full width instead, and
 * lives in `ListingSections`.
 */
export function ListingBody({ property, onShowAllAmenities }: ListingBodyProps) {
  const city = property.location.split(',')[0] ?? property.location;

  return (
    <div>
      <PropertySummary property={property} />
      <FeatureHighlights features={property.features} />
      <PropertyDescription description={property.description} />
      <SleepingArrangements arrangements={property.sleepingArrangements} />
      <AmenitiesPreview amenities={property.amenities} onShowAllAmenities={onShowAllAmenities} />
      <AvailabilityCalendar booking={property.booking} city={city} />
    </div>
  );
}
