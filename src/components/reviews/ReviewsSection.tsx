import type { Property } from '../../types';
import { REVIEWS, REVIEW_TAGS } from '../../data';
import { WideSection } from '../common/WideSection';
import { SECTION_IDS } from '../listing/sectionIds';
import { GuestFavouriteHeader } from './GuestFavouriteHeader';
import { RatingBreakdownGrid } from './RatingBreakdownGrid';
import { ReviewTags } from './ReviewTags';
import { ReviewCard } from './ReviewCard';
import styles from './ReviewsSection.module.css';

interface ReviewsSectionProps {
  property: Property;
}

/**
 * The full-width reviews block: oversized score with laurels, the rating
 * breakdown, the summary chips, then a two-column review grid.
 */
export function ReviewsSection({ property }: ReviewsSectionProps) {
  const { rating, guestFavouriteBlurb } = property;

  return (
    <WideSection id={SECTION_IDS.reviews}>
      <GuestFavouriteHeader score={rating.overall} blurb={guestFavouriteBlurb} />
      <RatingBreakdownGrid rating={rating} />
      <ReviewTags tags={REVIEW_TAGS} />

      <div className={styles.grid}>
        {REVIEWS.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* The reference wires its amenities button to a dialog but leaves
          this one without a handler, and ships no reviews dialog at all, so
          the control is present but inert here too. */}
      <button type="button" className={styles.showAllButton}>
        Show all {rating.reviewCount} reviews
      </button>
    </WideSection>
  );
}
