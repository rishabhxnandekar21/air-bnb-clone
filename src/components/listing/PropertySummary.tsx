import type { Property } from '../../types';
import { formatCapacity, formatRating, formatYearsHosting } from '../../utils/format';
import { HostAvatar } from '../common/HostAvatar';
import { IconStar } from '../common/icons';
import styles from './PropertySummary.module.css';

interface PropertySummaryProps {
  property: Property;
}

const STAR_COUNT = 5;

/**
 * Mirrors the reference's summary block: the heading and capacity line,
 * then the bordered "Guest favourite" card (laurels either side of the
 * label, the note, and rating/review counts split by a hairline), then the
 * host row. None of these carry a section divider — the rule appears above
 * the feature highlights that follow.
 */
export function PropertySummary({ property }: PropertySummaryProps) {
  const { host, rating, guestFavouriteNote } = property;

  return (
    <div className={styles.summary}>
      <div className={styles.heading}>
        <h2 className={styles.propertyType}>
          {property.propertyType} in {property.shortLocation}
        </h2>
        {property.capacity && <div className={styles.capacity}>{formatCapacity(property.capacity)}</div>}
      </div>

      {guestFavouriteNote && (
        <div className={styles.favouriteCard}>
          <div className={styles.favouriteBadge}>
            <img className={styles.laurel} src="/images/ui/guest-laurel-left.png" alt="" aria-hidden="true" />
            <span className={styles.favouriteLabel}>
              Guest
              <br />
              favourite
            </span>
            <img className={styles.laurel} src="/images/ui/guest-laurel-right.png" alt="" aria-hidden="true" />
          </div>

          <div className={styles.favouriteNote}>{guestFavouriteNote}</div>

          <div className={styles.favouriteStats}>
            <div className={styles.stat}>
              <div className={styles.statValue}>{formatRating(rating.overall)}</div>
              <div className={styles.stars} aria-hidden="true">
                {Array.from({ length: STAR_COUNT }, (_, i) => (
                  <IconStar key={i} />
                ))}
              </div>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <div className={styles.statValue}>{rating.reviewCount}</div>
              <div className={styles.statLabel}>Reviews</div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.host}>
        {host.avatarSrc ? (
          <img className={styles.hostAvatar} src={host.avatarSrc} alt="" width={46} height={46} />
        ) : (
          <HostAvatar name={host.name} size={46} />
        )}
        <div>
          <div className={styles.hostName}>Hosted by {host.name}</div>
          <div className={styles.hostMeta}>{formatYearsHosting(host.yearsHosting)}</div>
        </div>
      </div>
    </div>
  );
}
