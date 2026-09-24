import type { Property } from '../../types';
import { WideSection } from '../common/WideSection';
import { AssetIcon } from '../common/AssetIcon';
import styles from './ThingsToKnow.module.css';

interface ThingsToKnowProps {
  property: Property;
}

/** Three icon-led columns: cancellation policy, house rules, safety. */
export function ThingsToKnow({ property }: ThingsToKnowProps) {
  const { cancellationDetails, houseRules, safetyItems } = property;

  const columns = [
    {
      id: 'cancellation',
      iconSrc: '/images/icons/icon-calendar-cancel.png',
      title: 'Cancellation policy',
      items: cancellationDetails,
    },
    {
      id: 'rules',
      iconSrc: '/images/icons/icon-key-outline-512.png',
      title: 'House rules',
      items: houseRules,
    },
    {
      id: 'safety',
      iconSrc: '/images/icons/icon-shield-512.png',
      title: 'Safety & property',
      items: safetyItems,
    },
  ];

  return (
    <WideSection title="Things to know">
      <div className={styles.grid}>
        {columns.map(({ id, iconSrc, title, items }) => (
          <div key={id} className={styles.column}>
            <AssetIcon src={iconSrc} className={styles.icon} />
            <div className={styles.subheading}>{title}</div>
            {items?.map((item) => (
              <p key={item} className={styles.item}>
                {item}
              </p>
            ))}
            <button type="button" className={styles.learnMore}>
              Learn more
            </button>
          </div>
        ))}
      </div>
    </WideSection>
  );
}
