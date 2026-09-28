import { useRef } from 'react';
import { cx } from '../../utils/classNames';
import type { AmenityCategory } from '../../types';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useOverlayFocus } from '../../hooks/useOverlayFocus';
import { IconClose } from '../common/icons';
import { AmenityIcon } from './AmenityIcon';
import styles from './AmenitiesModal.module.css';

interface AmenitiesModalProps {
  categories: readonly AmenityCategory[];
  onClose: () => void;
}

export function AmenitiesModal({ categories, onClose }: AmenitiesModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useBodyScrollLock();
  useOverlayFocus(dialogRef, closeButtonRef, { onEscape: onClose });

  return (
    <div className={styles.backdrop}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="amenities-modal-heading"
      >
        <header className={styles.header}>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            aria-label="Close amenities"
            onClick={onClose}
          >
            <IconClose />
          </button>
        </header>
        <div className={styles.content}>
          <h2 id="amenities-modal-heading" className={styles.heading}>
            What this place offers
          </h2>
          {categories.map((category) => (
            <section key={category.id} className={styles.group}>
              <h3 className={styles.groupHeading}>{category.label}</h3>
              <ul className={styles.list}>
                {category.amenities.map((amenity) => {
                  return (
                    <li
                      key={amenity.id}
                      className={cx(styles.item, amenity.unavailable && styles.itemUnavailable)}
                    >
                      <AmenityIcon amenityId={amenity.id} className={styles.icon} />
                      <span className={styles.label}>{amenity.name}</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
