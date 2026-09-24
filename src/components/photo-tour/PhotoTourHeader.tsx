import { IconArrowLeft, IconHeart, IconShare } from '../common/icons';
import styles from './PhotoTourHeader.module.css';

interface PhotoTourHeaderProps {
  onClose: () => void;
}

export function PhotoTourHeader({ onClose }: PhotoTourHeaderProps) {
  return (
    <header className={styles.header}>
      <button
        type="button"
        className={`${styles.iconButton} ${styles.backButton}`}
        aria-label="Back to listing"
        onClick={onClose}
      >
        <IconArrowLeft />
      </button>
      <h1 className={styles.title}>Photo tour</h1>
      <div className={styles.actions}>
        <button type="button" className={styles.iconButton} aria-label="Share">
          <IconShare />
        </button>
        <button type="button" className={styles.iconButton} aria-label="Save">
          <IconHeart />
        </button>
      </div>
    </header>
  );
}
