import { PHOTOS, HERO_PHOTO_INDICES } from '../../data';
import { PhotoTile } from '../common/PhotoTile';
import { IconGrid } from '../common/icons';
import styles from './HeroGallery.module.css';

/**
 * The hero does not show manifest slots 0–4 — it shows a specific five, so
 * the order comes from the canonical `HERO_PHOTO_INDICES` rather than a
 * slice. Each tile is a button that opens the lightbox on that photo.
 */
const heroPhotos = HERO_PHOTO_INDICES.map((index) => PHOTOS[index]).filter(
  (photo): photo is (typeof PHOTOS)[number] => photo !== undefined,
);

interface HeroGalleryProps {
  onShowAllPhotos: () => void;
  onSelectPhoto: (index: number) => void;
}

export function HeroGallery({ onShowAllPhotos, onSelectPhoto }: HeroGalleryProps) {
  const [primary, ...secondary] = heroPhotos;

  if (!primary) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.gallery}>
        <button
          type="button"
          className={styles.primaryCell}
          aria-label={`${primary.alt}, open photo viewer`}
          onClick={() => onSelectPhoto(primary.index)}
        >
          <PhotoTile photo={primary} loading="eager" className={styles.tileImage} />
        </button>
        {secondary.map((photo) => (
          <button
            key={photo.id}
            type="button"
            className={styles.secondaryCell}
            aria-label={`${photo.alt}, open photo viewer`}
            onClick={() => onSelectPhoto(photo.index)}
          >
            <PhotoTile photo={photo} loading="eager" className={styles.tileImage} />
          </button>
        ))}
      </div>
      <button type="button" className={styles.showAllButton} onClick={onShowAllPhotos}>
        <IconGrid />
        Show all photos
      </button>
    </div>
  );
}
