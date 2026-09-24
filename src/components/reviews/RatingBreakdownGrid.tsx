import type { Rating, RatingBreakdown } from '../../types';
import { AssetIcon } from '../common/AssetIcon';
import styles from './RatingBreakdownGrid.module.css';

interface RatingBreakdownGridProps {
  rating: Rating;
}

const CATEGORIES: readonly (readonly [keyof RatingBreakdown, string, string])[] = [
  ['cleanliness', 'Cleanliness', '/images/icons/icon-cleanliness-spray-512.png'],
  ['accuracy', 'Accuracy', '/images/icons/icon-accuracy-check-512.png'],
  ['checkIn', 'Check-in', '/images/icons/icon-checkin-key-512.png'],
  ['communication', 'Communication', '/images/icons/icon-communication-bubble-512.png'],
  ['location', 'Location', '/images/icons/icon-location-map-512.png'],
  ['value', 'Value', '/images/icons/icon-value-tag-512.png'],
];

const STARS = [5, 4, 3, 2, 1] as const;

/** Overall distribution bars plus the six per-category score columns. */
export function RatingBreakdownGrid({ rating }: RatingBreakdownGridProps) {
  const { breakdown, distribution } = rating;
  if (!breakdown) {
    return null;
  }

  return (
    <div className={styles.grid}>
      <div className={styles.column}>
        <div className={styles.columnLabel}>Overall rating</div>
        <div className={styles.bars}>
          {STARS.map((star, i) => (
            <div key={star} className={styles.barRow}>
              <span className={styles.barStar}>{star}</span>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: `${distribution?.[i] ?? 0}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {CATEGORIES.map(([key, label, iconSrc]) => (
        <div key={key} className={styles.column}>
          <div className={styles.columnLabel}>{label}</div>
          <div className={styles.columnScore}>{breakdown[key].toFixed(1)}</div>
          <AssetIcon src={iconSrc} className={styles.columnIcon} />
        </div>
      ))}
    </div>
  );
}
