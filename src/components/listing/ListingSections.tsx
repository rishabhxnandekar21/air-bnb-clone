import type { Property } from '../../types';
import { ReviewsSection } from '../reviews/ReviewsSection';
import { MoreStaysNearby } from './MoreStaysNearby';
import { LocationPreview } from './LocationPreview';
import { HostSection } from './HostSection';
import { ThingsToKnow } from './ThingsToKnow';

interface ListingSectionsProps {
  property: Property;
}

/**
 * Everything below the two-column grid. These run the full 1120px content
 * width on the reference rather than the 652px left column, and their order
 * there is reviews, location, host, then things to know.
 */
export function ListingSections({ property }: ListingSectionsProps) {
  return (
    <div>
      <ReviewsSection property={property} />
      <LocationPreview property={property} />
      <HostSection host={property.host} />
      <ThingsToKnow property={property} />
      <MoreStaysNearby />
    </div>
  );
}
