import { useState } from 'react';
import type { Review } from '../../types';
import { cx } from '../../utils/classNames';
import { IconStar } from '../common/icons';
import styles from './ReviewCard.module.css';

interface ReviewCardProps {
  review: Review;
}

const CLAMP_THRESHOLD = 180;

/**
 * One guest review. Longer reviews clamp with a "Show more" toggle, matching
 * the reference — the threshold is on the raw text so short reviews never
 * render a pointless button.
 */
export function ReviewCard({ review }: ReviewCardProps) {
  const [isExpanded, setExpanded] = useState(false);
  const isLong = review.text.length > CLAMP_THRESHOLD;

  return (
    <article className={styles.card}>
      <header className={styles.head}>
        {review.authorAvatarSrc ? (
          <img className={styles.avatar} src={review.authorAvatarSrc} alt="" width={42} height={42} />
        ) : (
          <div
            className={styles.initialAvatar}
            style={{ background: review.avatarBackground, color: review.avatarColor }}
            aria-hidden="true"
          >
            {review.initial}
          </div>
        )}
        <div>
          <div className={styles.author}>{review.authorName}</div>
          <div className={styles.tenure}>{review.tenure}</div>
        </div>
      </header>

      <div className={styles.meta}>
        <span className={styles.stars} aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: review.rating }, (_, i) => (
            <IconStar key={i} />
          ))}
        </span>
        <span aria-hidden="true">·</span>
        <span>{review.date}</span>
      </div>

      <p className={cx(styles.text, isLong && !isExpanded && styles.textClamped)}>{review.text}</p>

      {isLong && (
        <button type="button" className={styles.showMore} onClick={() => setExpanded((v) => !v)}>
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </article>
  );
}
