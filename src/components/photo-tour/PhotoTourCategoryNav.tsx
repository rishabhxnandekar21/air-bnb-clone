import { useEffect, useRef, useState, type RefObject } from 'react';
import { PHOTO_CATEGORIES, PHOTOS_BY_CATEGORY } from '../../data';
import type { PhotoCategory } from '../../types';
import { PhotoTile } from '../common/PhotoTile';
import { cx } from '../../utils/classNames';
import { categorySectionId } from './categorySectionId';
import styles from './PhotoTourCategoryNav.module.css';

interface PhotoTourCategoryNavProps {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
}

function scrollToCategory(id: PhotoCategory) {
  document.getElementById(categorySectionId(id))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Highlights the category currently in view using IntersectionObserver
 * against the scrollable Photo Tour container — no scroll event listener.
 */
function useActiveCategory(scrollContainerRef: RefObject<HTMLDivElement | null>): PhotoCategory | null {
  const [activeCategory, setActiveCategory] = useState<PhotoCategory | null>(null);
  const visibleRatios = useRef(new Map<PhotoCategory, number>());

  useEffect(() => {
    const root = scrollContainerRef.current;
    if (!root) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const category = (entry.target as HTMLElement).dataset.category as PhotoCategory | undefined;
          if (!category) {
            continue;
          }
          visibleRatios.current.set(category, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let topCategory: PhotoCategory | null = null;
        let topRatio = 0;
        for (const category of PHOTO_CATEGORIES) {
          const ratio = visibleRatios.current.get(category.id) ?? 0;
          if (ratio > topRatio) {
            topRatio = ratio;
            topCategory = category.id;
          }
        }
        if (topCategory) {
          setActiveCategory(topCategory);
        }
      },
      { root, threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    for (const category of PHOTO_CATEGORIES) {
      const section = document.getElementById(categorySectionId(category.id));
      if (section) {
        observer.observe(section);
      }
    }

    return () => observer.disconnect();
  }, [scrollContainerRef]);

  return activeCategory;
}

export function PhotoTourCategoryNav({ scrollContainerRef }: PhotoTourCategoryNavProps) {
  const activeCategory = useActiveCategory(scrollContainerRef);

  return (
    <nav className={styles.nav} aria-label="Photo categories">
      {PHOTO_CATEGORIES.map((category) => {
        const thumbnail = PHOTOS_BY_CATEGORY.get(category.id)?.[0];
        return (
          <button
            key={category.id}
            type="button"
            className={cx(styles.item, activeCategory === category.id && styles.itemActive)}
            aria-label={`Jump to ${category.label} section`}
            onClick={() => scrollToCategory(category.id)}
          >
            {thumbnail && (
              <div className={styles.thumbnail} aria-hidden="true">
                <PhotoTile photo={thumbnail} />
              </div>
            )}
            <span className={styles.label} aria-hidden="true">
              {category.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
