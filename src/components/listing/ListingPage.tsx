import { PROPERTY } from '../../data';
import { ListingHeader } from './ListingHeader';
import { ListingActions } from './ListingActions';
import { HeroGallery } from '../gallery/HeroGallery';
import { ListingBody } from './ListingBody';
import { ListingSections } from './ListingSections';
import { BookingCard } from '../booking/BookingCard';
import { PromoBanner } from '../booking/PromoBanner';
import { AssetIcon } from '../common/AssetIcon';
import { StickyNav } from './StickyNav';
import { SECTION_IDS } from './sectionIds';
import styles from './ListingPage.module.css';

const BOOKING_CARD_ID = 'listing-booking-card';

interface ListingPageProps {
  onShowAllPhotos: () => void;
  onShowAllAmenities: () => void;
  onSelectPhoto: (index: number) => void;
}

export function ListingPage({
  onShowAllPhotos,
  onShowAllAmenities,
  onSelectPhoto,
}: ListingPageProps) {
  return (
    <div>
      <div className="content-container">
        <div className={styles.titleRow}>
          <ListingHeader property={PROPERTY} />
          <ListingActions />
        </div>

        <div id={SECTION_IDS.gallery} className={styles.galleryWrapper}>
          <HeroGallery onShowAllPhotos={onShowAllPhotos} onSelectPhoto={onSelectPhoto} />
        </div>

        <div className={styles.contentGrid}>
          <ListingBody property={PROPERTY} onShowAllAmenities={onShowAllAmenities} />
          <aside className={styles.bookingColumn}>
            <div id={BOOKING_CARD_ID} className={styles.bookingRail}>
              <PromoBanner />
              <BookingCard booking={PROPERTY.booking} />
              <div className={styles.reportListing}>
                <AssetIcon src="/images/icons/icon-flag-report-512.png" className={styles.reportIcon} />
                <button type="button" className={styles.reportLink}>
                  Report this listing
                </button>
              </div>
            </div>
          </aside>
        </div>

        <ListingSections property={PROPERTY} />
      </div>

      <StickyNav booking={PROPERTY.booking} rating={PROPERTY.rating} bookingCardId={BOOKING_CARD_ID} />
    </div>
  );
}
