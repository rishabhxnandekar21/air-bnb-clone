import { cx } from '../../utils/classNames';
import styles from './HostAvatar.module.css';

interface HostAvatarProps {
  name: string;
  size?: number;
  className?: string;
}

function initialsFor(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const first = words[0]?.[0] ?? '';
  const second = words.length > 1 ? (words[words.length - 1]?.[0] ?? '') : '';
  return (first + second).toUpperCase();
}

/** No host photo exists locally — an initials avatar derived from the real host name, not a generic icon. */
export function HostAvatar({ name, size = 48, className }: HostAvatarProps) {
  return (
    <div
      className={cx(styles.avatar, className)}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      aria-hidden="true"
    >
      {initialsFor(name)}
    </div>
  );
}
