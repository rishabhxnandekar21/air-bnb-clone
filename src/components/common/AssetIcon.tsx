import { cx } from '../../utils/classNames';
import styles from './AssetIcon.module.css';

interface AssetIconProps {
  src: string;
  className?: string;
}

/**
 * Renders one of the reference's supplied raster icons. These replace the
 * hand-drawn SVG stand-ins that were used before the real artwork existed;
 * they are always decorative, so they carry an empty alt.
 */
export function AssetIcon({ src, className }: AssetIconProps) {
  return <img className={cx(styles.icon, className)} src={src} alt="" aria-hidden="true" />;
}
