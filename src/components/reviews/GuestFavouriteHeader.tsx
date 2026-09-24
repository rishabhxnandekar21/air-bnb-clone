import { formatRating } from '../../utils/format';
import styles from './GuestFavouriteHeader.module.css';

interface GuestFavouriteHeaderProps {
  score: number;
  blurb?: string;
}

/** The oversized score flanked by laurels, above the rating breakdown. */
export function GuestFavouriteHeader({ score, blurb }: GuestFavouriteHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.scoreRow}>
        <img src="/images/ui/laurel-left.png" alt="" aria-hidden="true" />
        <div className={styles.score}>{formatRating(score)}</div>
        <img src="/images/ui/laurel-right.png" alt="" aria-hidden="true" />
      </div>
      <div className={styles.label}>Guest favourite</div>
      {blurb && <div className={styles.blurb}>{blurb}</div>}
      <button type="button" className={styles.link}>
        How reviews work
      </button>
    </div>
  );
}
