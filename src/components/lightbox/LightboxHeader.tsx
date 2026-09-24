import type { RefObject } from 'react';
import type { Photo } from '../../types';
import { IconClose } from '../common/icons';
import styles from './LightboxHeader.module.css';

interface LightboxHeaderProps {
  photo: Photo;
  position: number;
  total: number;
  onClose: () => void;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
}

export function LightboxHeader({ photo, position, total, onClose, closeButtonRef }: LightboxHeaderProps) {
  return (
    <header className={styles.header}>
      <span className={styles.categoryLabel}>{photo.categoryLabel}</span>
      <span className={styles.counter}>
        {position} / {total}
      </span>
      <button
        ref={closeButtonRef}
        type="button"
        className={styles.closeButton}
        aria-label="Close photo viewer"
        onClick={onClose}
      >
        <IconClose />
      </button>
    </header>
  );
}
