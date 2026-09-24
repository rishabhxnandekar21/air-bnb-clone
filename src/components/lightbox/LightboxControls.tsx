import { IconChevronLeft, IconChevronRight } from '../common/icons';
import { cx } from '../../utils/classNames';
import styles from './LightboxControls.module.css';

interface LightboxControlsProps {
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

/**
 * Reference-verified: Previous/Next are always present in the DOM but
 * disabled (not wrapped) at the first/last photo — confirmed by inspecting
 * the reference at index 0, where a real "Previous" button exists but is
 * suppressed rather than cycling to the last photo.
 */
export function LightboxControls({ hasPrevious, hasNext, onPrevious, onNext }: LightboxControlsProps) {
  return (
    <>
      <button
        type="button"
        className={cx(styles.navButton, styles.previous)}
        aria-label="Previous photo"
        disabled={!hasPrevious}
        onClick={onPrevious}
      >
        <IconChevronLeft />
      </button>
      <button
        type="button"
        className={cx(styles.navButton, styles.next)}
        aria-label="Next photo"
        disabled={!hasNext}
        onClick={onNext}
      >
        <IconChevronRight />
      </button>
    </>
  );
}
