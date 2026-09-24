import type { Amenity } from '../../types';
import { cx } from '../../utils/classNames';
import { Section } from '../common/Section';
import { AmenityIcon } from '../amenities/AmenityIcon';
import { ADVERTISED_AMENITY_COUNT } from '../../data';
import { SECTION_IDS } from './sectionIds';
import styles from './AmenitiesPreview.module.css';

interface AmenitiesPreviewProps {
  amenities: Amenity[];
  onShowAllAmenities: () => void;
}

/**
 * The reference lists every amenity it has in the preview grid rather than
 * truncating it, so this maps the full list. Unavailable amenities keep
 * their row but render greyed with the label struck through.
 */
export function AmenitiesPreview({ amenities, onShowAllAmenities }: AmenitiesPreviewProps) {
  return (
    <Section id={SECTION_IDS.amenities} title="What this place offers">
      <ul className={styles.list}>
        {amenities.map((amenity) => {
          return (
            <li
              key={amenity.id}
              className={cx(styles.item, amenity.unavailable && styles.itemUnavailable)}
            >
              <AmenityIcon amenityId={amenity.id} className={styles.itemIcon} />
              <span className={styles.label}>{amenity.name}</span>
            </li>
          );
        })}
      </ul>
      <button type="button" className={styles.showAllButton} onClick={onShowAllAmenities}>
        Show all {ADVERTISED_AMENITY_COUNT} amenities
      </button>
    </Section>
  );
}
