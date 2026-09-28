import { useRef } from 'react';
import { PHOTO_CATEGORIES, PHOTOS, PHOTOS_BY_CATEGORY, TOTAL_PHOTO_COUNT } from '../../data';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useOverlayFocus } from '../../hooks/useOverlayFocus';
import { PhotoTourHeader } from './PhotoTourHeader';
import { PhotoTourCategoryNav } from './PhotoTourCategoryNav';
import { CategorySection } from './CategorySection';
import styles from './PhotoTour.module.css';

interface PhotoTourProps {
  onClose: () => void;
  onSelectPhoto: (index: number) => void;
  /** False while the Lightbox is stacked above this overlay. */
  isTopmost?: boolean;
}

if (import.meta.env.DEV) {
  const renderedCount = PHOTO_CATEGORIES.reduce(
    (sum, category) => sum + (PHOTOS_BY_CATEGORY.get(category.id)?.length ?? 0),
    0,
  );
  if (renderedCount !== TOTAL_PHOTO_COUNT || PHOTOS.length !== TOTAL_PHOTO_COUNT) {
    throw new Error(
      `Photo Tour render assertion failed: expected ${TOTAL_PHOTO_COUNT} photos across all categories, ` +
        `PHOTOS has ${PHOTOS.length} and categories sum to ${renderedCount}.`,
    );
  }
}

export function PhotoTour({ onClose, onSelectPhoto, isTopmost = true }: PhotoTourProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock();
  // Focus lands on the dialog surface rather than the first control, so
  // opening the tour does not paint a focus ring the reference never shows.
  useOverlayFocus(overlayRef, overlayRef, { isTopmost, onEscape: onClose });

  return (
    <div
      ref={overlayRef}
      tabIndex={-1}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour"
    >
      <PhotoTourHeader onClose={onClose} />
      <div className={styles.scrollArea} ref={scrollContainerRef}>
        <div className="photo-tour-container">
          <PhotoTourCategoryNav scrollContainerRef={scrollContainerRef} />
          {PHOTO_CATEGORIES.map((category, categoryPosition) => {
            const photos = PHOTOS_BY_CATEGORY.get(category.id) ?? [];
            return (
              <CategorySection
                key={category.id}
                category={category}
                photos={photos}
                onSelectPhoto={onSelectPhoto}
                priority={categoryPosition === 0}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
