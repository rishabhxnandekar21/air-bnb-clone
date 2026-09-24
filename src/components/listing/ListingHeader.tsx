import type { Property } from '../../types';
import styles from './ListingHeader.module.css';

interface ListingHeaderProps {
  property: Property;
}

/**
 * Reference measurement: the title row on the reference contains only the
 * title and the Share/Save actions — no rating/location metadata line is
 * rendered here (that appears further down, alongside the reviews and
 * host block instead). Confirmed via DOM inspection: the title's own
 * bounding box height (30px) accounts for the entire row.
 */
export function ListingHeader({ property }: ListingHeaderProps) {
  return <h1 className={styles.title}>{property.title}</h1>;
}
