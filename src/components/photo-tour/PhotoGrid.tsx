import type { Photo } from '../../types';
import { cx } from '../../utils/classNames';
import { PhotoTile } from '../common/PhotoTile';
import styles from './PhotoGrid.module.css';

interface PhotoGridProps {
  photos: readonly Photo[];
  /** Photos per row, taken from the category's verified reference layout. */
  rowPattern: readonly number[];
  onSelectPhoto: (index: number) => void;
  /** Loads the first tile eagerly — only the very first section is above the fold. */
  priority?: boolean;
}

/** Slices the photos into the rows the pattern describes. */
function toRows(photos: readonly Photo[], rowPattern: readonly number[]): Photo[][] {
  const rows: Photo[][] = [];
  let cursor = 0;
  for (const size of rowPattern) {
    if (cursor >= photos.length) {
      break;
    }
    rows.push(photos.slice(cursor, cursor + size));
    cursor += size;
  }
  // Anything the pattern does not cover still gets shown, one per row.
  while (cursor < photos.length) {
    rows.push(photos.slice(cursor, cursor + 1));
    cursor += 1;
  }
  return rows;
}

export function PhotoGrid({ photos, rowPattern, onSelectPhoto, priority = false }: PhotoGridProps) {
  return (
    <div className={styles.grid}>
      {toRows(photos, rowPattern).map((row, rowIndex) => (
        <div
          key={row[0]?.id ?? rowIndex}
          className={cx(styles.row, row.length > 1 && styles.rowPair)}
        >
          {row.map((photo) => (
            <button
              key={photo.id}
              type="button"
              className={styles.tile}
              aria-label={`View photo: ${photo.alt}`}
              onClick={() => onSelectPhoto(photo.index)}
            >
              <PhotoTile photo={photo} loading={priority && photo.index === 0 ? 'eager' : 'lazy'} />
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
