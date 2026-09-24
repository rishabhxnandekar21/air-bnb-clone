import type { ReviewTag } from '../../types';
import styles from './ReviewTags.module.css';

interface ReviewTagsProps {
  tags: readonly ReviewTag[];
}

/** Horizontally scrollable summary chips above the review list. */
export function ReviewTags({ tags }: ReviewTagsProps) {
  return (
    <div className={styles.tags}>
      {tags.map((tag) => (
        <button key={tag.id} type="button" className={styles.tag}>
          <img className={styles.tagIcon} src={tag.iconSrc} alt="" aria-hidden="true" />
          {tag.label} <span className={styles.tagCount}>{tag.count}</span>
        </button>
      ))}
    </div>
  );
}
