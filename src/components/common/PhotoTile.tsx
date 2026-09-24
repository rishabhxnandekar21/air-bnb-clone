import { useState } from 'react';
import type { Photo } from '../../types';
import { resolvePhotoSrc } from '../../utils/resolvePhotoSrc';
import { cx } from '../../utils/classNames';
import { IconImageOff } from './icons';
import styles from './PhotoTile.module.css';

interface PhotoTileProps {
  photo: Photo;
  className?: string;
  loading?: 'eager' | 'lazy';
  /** 'cover' fills the tile (grids/hero); 'contain' shows the whole photo uncropped (Lightbox). */
  fit?: 'cover' | 'contain';
}

/**
 * Renders one photo from the canonical manifest. Every asset lookup goes
 * through `resolvePhotoSrc` — the single isolated adapter — so this is the
 * only component that needs to know an unresolved photo looks like a
 * placeholder block instead of a broken <img>.
 */
export function PhotoTile({ photo, className, loading = 'lazy', fit = 'cover' }: PhotoTileProps) {
  const resolvedSrc = resolvePhotoSrc(photo.src);
  const [failed, setFailed] = useState(false);
  const showPlaceholder = resolvedSrc === null || failed;

  if (showPlaceholder) {
    return (
      <div className={cx(styles.placeholder, className)} role="img" aria-label={photo.alt}>
        <IconImageOff className={styles.placeholderIcon} />
        <span className={styles.placeholderLabel}>{photo.categoryLabel}</span>
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={photo.alt}
      loading={loading}
      className={cx(styles.image, fit === 'contain' && styles.imageContain, className)}
      onError={() => setFailed(true)}
    />
  );
}
