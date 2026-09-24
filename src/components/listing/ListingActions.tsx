import { useEffect, useRef, useState } from 'react';
import { IconHeart, IconShare } from '../common/icons';
import { Toast } from '../common/Toast';
import { cx } from '../../utils/classNames';
import styles from './ListingActions.module.css';

const TOAST_DURATION_MS = 2500;

export function ListingActions() {
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  function showToast(message: string) {
    window.clearTimeout(timerRef.current);
    setToast(message);
    timerRef.current = window.setTimeout(() => setToast(null), TOAST_DURATION_MS);
  }

  return (
    <>
      <div className={styles.actions}>
        <button type="button" className={styles.actionButton} onClick={() => showToast('Share options')}>
          <IconShare />
          <span className={styles.actionLabel}>Share</span>
        </button>
        <button
          type="button"
          className={styles.actionButton}
          aria-pressed={saved}
          onClick={() => setSaved((current) => !current)}
        >
          <IconHeart className={cx(styles.heartIcon, saved && styles.heartIconSaved)} />
          <span className={styles.actionLabel}>{saved ? 'Saved' : 'Save'}</span>
        </button>
      </div>
      <Toast message={toast} />
    </>
  );
}
