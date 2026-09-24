import type { ReactNode } from 'react';
import { cx } from '../../utils/classNames';
import styles from './WideSection.module.css';

interface WideSectionProps {
  id?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

/**
 * A full-width section below the two-column grid. The reference gives these
 * more generous vertical padding (48px) than the in-grid sections (32px),
 * and rules them off with the soft border above.
 */
export function WideSection({ id, title, children, className }: WideSectionProps) {
  return (
    <section id={id} className={cx(styles.section, className)}>
      {title && <h2 className={styles.heading}>{title}</h2>}
      {children}
    </section>
  );
}
