import { cx } from '../../utils/classNames';
import styles from './Toast.module.css';

interface ToastProps {
  /** Text to show, or null to hide. */
  message: string | null;
}

/**
 * The reference's status toast: a fixed pill at the bottom centre that fades
 * and slides up into view. It stays mounted and empty when idle, matching
 * the reference, so the live region is already present for screen readers
 * when a message arrives.
 */
export function Toast({ message }: ToastProps) {
  return (
    <div
      className={cx(styles.toast, message !== null && styles.toastVisible)}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
