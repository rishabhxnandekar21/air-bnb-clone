import type { Feature } from '../../types';
import { AssetIcon } from '../common/AssetIcon';
import styles from './FeatureHighlights.module.css';

interface FeatureHighlightsProps {
  features: Feature[];
}

const FEATURE_ICON_SRC: Record<string, string> = {
  'outdoor-entertainment': '/images/icons/icon-fireplace-512.png',
  'designed-for-staying-cool': '/images/icons/icon-fan-512.png',
  'self-check-in': '/images/icons/icon-door-512.png',
};

export function FeatureHighlights({ features }: FeatureHighlightsProps) {
  return (
    <ul className={styles.list}>
      {features.map((feature) => {
        const iconSrc = FEATURE_ICON_SRC[feature.id];
        return (
          <li key={feature.id} className={styles.item}>
            {iconSrc && <AssetIcon src={iconSrc} className={styles.icon} />}
            <div>
              <p className={styles.title}>{feature.title}</p>
              <p className={styles.description}>{feature.description}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
