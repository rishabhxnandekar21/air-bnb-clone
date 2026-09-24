import type { Photo } from '../../types';
import type { PhotoCategoryMeta } from '../../data';
import { PhotoGrid } from './PhotoGrid';
import { categorySectionId } from './categorySectionId';
import styles from './CategorySection.module.css';

interface CategorySectionProps {
  category: PhotoCategoryMeta;
  photos: readonly Photo[];
  onSelectPhoto: (index: number) => void;
  priority?: boolean;
}

export function CategorySection({ category, photos, onSelectPhoto, priority = false }: CategorySectionProps) {
  return (
    <section
      id={categorySectionId(category.id)}
      data-category={category.id}
      className={styles.section}
      aria-labelledby={`${categorySectionId(category.id)}-heading`}
    >
      <div className={styles.headingColumn}>
        <h2 id={`${categorySectionId(category.id)}-heading`} className={styles.heading}>
          {category.label}
        </h2>
        {category.features && (
          <p className={styles.count}>{category.features.join(' · ')}</p>
        )}
      </div>
      <PhotoGrid
        photos={photos}
        rowPattern={category.rowPattern}
        onSelectPhoto={onSelectPhoto}
        priority={priority}
      />
    </section>
  );
}
