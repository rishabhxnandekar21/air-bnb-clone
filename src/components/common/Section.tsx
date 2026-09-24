import type { ReactNode } from 'react';
import { cx } from '../../utils/classNames';
import styles from './Section.module.css';

interface SectionProps {
  id?: string;
  title?: string;
  children: ReactNode;
  className?: string;
  bordered?: boolean;
}

/** Consistent heading + vertical rhythm + divider for a listing-body section. */
export function Section({ id, title, children, className, bordered = true }: SectionProps) {
  return (
    <section id={id} className={cx(styles.section, bordered && styles.bordered, className)}>
      {title && <h2 className={styles.heading}>{title}</h2>}
      {children}
    </section>
  );
}
