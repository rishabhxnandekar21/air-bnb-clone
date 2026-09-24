import { AMENITY_ICON_PATHS } from '../../data/amenityIconPaths';

interface AmenityIconProps {
  amenityId: string;
  className?: string;
}

/**
 * Renders the amenity glyph for a given amenity id. Icons are stroked on a
 * 24 grid and take their colour from `currentColor`, so a row needs no icon
 * token of its own. Returns nothing when an amenity has no artwork, leaving
 * an empty slot rather than a broken image.
 */
export function AmenityIcon({ amenityId, className }: AmenityIconProps) {
  const paths = AMENITY_ICON_PATHS[amenityId];
  if (!paths) {
    return null;
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      focusable={false}
    >
      {paths.map((path) => (
        <path
          key={path.d}
          d={path.d}
          fill={path.fill ? 'currentColor' : 'none'}
          stroke={path.fill ? 'none' : 'currentColor'}
        />
      ))}
    </svg>
  );
}
