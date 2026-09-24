import { useEffect, useRef } from 'react';
import { PHOTO_CATEGORIES, PHOTOS, PHOTOS_BY_CATEGORY, TOTAL_PHOTO_COUNT } from '../../data';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { PhotoTourHeader } from './PhotoTourHeader';
import { PhotoTourCategoryNav } from './PhotoTourCategoryNav';
import { CategorySection } from './CategorySection';
import styles from './PhotoTour.module.css';

interface PhotoTourProps {
  onClose: () => void;
  onSelectPhoto: (index: number) => void;
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

export function PhotoTour({ onClose, onSelectPhoto }: PhotoTourProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Photo tour">
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
