import type { Photo } from '../../types';
import { PhotoTile } from '../common/PhotoTile';
import styles from './LightboxImage.module.css';

interface LightboxImageProps {
  photo: Photo;
}

export function LightboxImage({ photo }: LightboxImageProps) {
  return (
    <div className={styles.stage}>
      <PhotoTile photo={photo} loading="eager" fit="contain" />
    </div>
  );
}
