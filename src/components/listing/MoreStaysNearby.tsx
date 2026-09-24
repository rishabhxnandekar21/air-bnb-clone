import { useRef, useState } from 'react';
import { NEARBY_STAYS } from '../../data';
import { formatCurrency } from '../../utils/format';
import { WideSection } from '../common/WideSection';
import { IconChevronLeft, IconChevronRight, IconStar } from '../common/icons';
import styles from './MoreStaysNearby.module.css';

const PER_PAGE = 5;
const PAGE_COUNT = Math.ceil(NEARBY_STAYS.length / PER_PAGE);

/** The reference prints a whole rating as "5.0" and the rest as-is. */
function formatStayRating(rating: number): string {
  return Number.isInteger(rating) ? rating.toFixed(1) : String(rating);
}

/** Horizontal carousel of nearby listings, paged five at a time. */
export function MoreStaysNearby() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  const goTo = (next: number) => {
    const clamped = Math.max(0, Math.min(PAGE_COUNT - 1, next));
    setPage(clamped);
    const track = trackRef.current;
    if (track) {
      track.scrollTo({ left: clamped * track.clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <WideSection>
      <div className={styles.head}>
        <h2 className={styles.heading}>More stays nearby</h2>
        <div className={styles.pager}>
          <span className={styles.pageCount}>
            {page + 1} / {PAGE_COUNT}
          </span>
          <button
            type="button"
            className={styles.pagerButton}
            aria-label="Previous stays"
            disabled={page === 0}
            onClick={() => goTo(page - 1)}
          >
            <IconChevronLeft />
          </button>
          <button
            type="button"
            className={styles.pagerButton}
            aria-label="Next stays"
            disabled={page === PAGE_COUNT - 1}
            onClick={() => goTo(page + 1)}
          >
            <IconChevronRight />
          </button>
        </div>
      </div>

      <div className={styles.track} ref={trackRef}>
        {NEARBY_STAYS.map((stay) => (
          <article key={stay.id} className={styles.card}>
            <img src={stay.imageSrc} alt="" loading="lazy" />
            <div className={styles.title}>{stay.title}</div>
            <div className={styles.meta}>
              {formatCurrency(stay.price, 'INR')}
              &nbsp;&nbsp;
              <IconStar className={styles.star} />
              {formatStayRating(stay.rating)}
            </div>
          </article>
        ))}
      </div>
    </WideSection>
  );
}
