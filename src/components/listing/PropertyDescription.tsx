import { useState } from 'react';
import { cx } from '../../utils/classNames';
import { IconChevronForward } from '../common/icons';
import styles from './PropertyDescription.module.css';

interface PropertyDescriptionProps {
  description?: string;
}

/**
 * The listing's prose description, clamped to four lines with a "Show
 * more" toggle that expands it in place. Renders nothing when no
 * description has been supplied (see src/data/property.ts), so the section
 * divider never appears above an empty block.
 */
export function PropertyDescription({ description }: PropertyDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!description) {
    return null;
  }

  const paragraphs = description.split(/\n{2,}/).filter((part) => part.trim().length > 0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.translationNotice}>
        <span>
          Some info has been automatically translated.{' '}
          <button type="button" className={styles.translationLink}>
            Show original
          </button>
        </span>
      </div>

      <div className={cx(styles.body, !isExpanded && styles.clamped)}>
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded((previous) => !previous)}
      >
        {isExpanded ? 'Show less' : 'Show more'}
        <IconChevronForward className={styles.chevron} />
      </button>
    </div>
  );
}
