import { useEffect, useRef, useState } from 'react';
import type { Rating, BookingDetails } from '../../types';
import { formatCurrency, formatNights, formatRating, formatReviewCount } from '../../utils/format';
import { cx } from '../../utils/classNames';
import { IconStar } from '../common/icons';
import { SECTION_IDS } from './sectionIds';
import styles from './StickyNav.module.css';

interface StickyNavProps {
  booking: BookingDetails;
  rating: Rating;
  bookingCardId: string;
}

/**
 * The reference's bar is fixed to the top of the viewport and hidden by
 * default, sliding down once the hero gallery has scrolled out of view.
 * Observing the gallery is what drives that, so there is no scroll
 * listener firing on every frame.
 */
/** The bar's own height — the line the gallery bottom is measured against. */
const NAV_HEIGHT = 66;

function useRevealedOnScroll(triggerId: string): boolean {
  const [isRevealed, setRevealed] = useState(false);

  useEffect(() => {
    const trigger = document.getElementById(triggerId);
    if (!trigger) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setRevealed(entry.boundingClientRect.bottom <= NAV_HEIGHT);
        }
      },
      { rootMargin: `-${NAV_HEIGHT}px 0px 0px 0px`, threshold: 0 },
    );
    observer.observe(trigger);
    return () => observer.disconnect();
  }, [triggerId]);

  return isRevealed;
}

const TABS = [
  { id: SECTION_IDS.gallery, label: 'Photos' },
  { id: SECTION_IDS.amenities, label: 'Amenities' },
  { id: SECTION_IDS.reviews, label: 'Reviews' },
  { id: SECTION_IDS.location, label: 'Location' },
];

/** Highlights the tab for whichever section is currently most visible — no scroll listener. */
function useActiveTab(): string {
  const [active, setActive] = useState<string>(TABS[0]?.id ?? '');
  const visibleRatios = useRef(new Map<string, number>());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          visibleRatios.current.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let topId: string | null = null;
        let topRatio = 0;
        for (const tab of TABS) {
          const ratio = visibleRatios.current.get(tab.id) ?? 0;
          if (ratio > topRatio) {
            topRatio = ratio;
            topId = tab.id;
          }
        }
        if (topId) {
          setActive(topId);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    for (const tab of TABS) {
      const el = document.getElementById(tab.id);
      if (el) {
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, []);

  return active;
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function StickyNav({ booking, rating, bookingCardId }: StickyNavProps) {
  const activeTab = useActiveTab();
  const isRevealed = useRevealedOnScroll(SECTION_IDS.gallery);

  return (
    <div className={cx(styles.nav, isRevealed && styles.navVisible)} aria-hidden={!isRevealed}>
      <div className={styles.inner}>
        <nav className={styles.tabsNav} aria-label="Listing sections">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              tabIndex={isRevealed ? 0 : -1}
              className={cx(styles.tab, activeTab === tab.id && styles.tabActive)}
              onClick={() => scrollToSection(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className={styles.summary}>
          <div className={styles.priceBlock}>
            <div>
              <span className={styles.price}>{formatCurrency(booking.totalPrice, booking.currency)}</span>{' '}
              <span className={styles.nights}>for {formatNights(booking.nights)}</span>
            </div>
            <div className={styles.rating}>
              <IconStar className={styles.starIcon} />
              {formatRating(rating.overall)} · {formatReviewCount(rating.reviewCount)}
            </div>
          </div>
          <button
            type="button"
            className={styles.reserveButton}
            tabIndex={isRevealed ? 0 : -1}
            onClick={() => scrollToSection(bookingCardId)}
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}
