import type { SleepingArrangement } from '../../types';
import { PHOTOS, SLEEPING_PHOTO_INDICES } from '../../data';
import { Section } from '../common/Section';
import { PhotoTile } from '../common/PhotoTile';
import styles from './SleepingArrangements.module.css';

interface SleepingArrangementsProps {
  arrangements: SleepingArrangement[];
}

export function SleepingArrangements({ arrangements }: SleepingArrangementsProps) {
  return (
    <Section title="Where you'll sleep">
      <div className={styles.grid}>
        {arrangements.map((arrangement) => {
          const photoIndex = SLEEPING_PHOTO_INDICES[arrangement.room];
          const photo = photoIndex === undefined ? undefined : PHOTOS[photoIndex];
          return (
            <div key={arrangement.room} className={styles.card}>
              {photo && (
                <div className={styles.imageWrapper}>
                  <PhotoTile photo={photo} />
                </div>
              )}
              <p className={styles.room}>{arrangement.room}</p>
              <p className={styles.description}>{arrangement.description}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
