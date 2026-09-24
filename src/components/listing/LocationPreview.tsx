import type { Property } from '../../types';
import { WideSection } from '../common/WideSection';
import { IconChevronForward } from '../common/icons';
import { SECTION_IDS } from './sectionIds';
import styles from './LocationPreview.module.css';

interface LocationPreviewProps {
  property: Property;
}

/**
 * The reference does not embed a real map here — it draws a stylised one
 * from layered CSS gradients, with a centred house marker standing in for
 * the approximate area and non-functional search/zoom affordances. That is
 * reproduced exactly, which also means the section makes no third-party
 * network request.
 */
export function LocationPreview({ property }: LocationPreviewProps) {
  const { neighbourhoodHighlight } = property;

  return (
    <WideSection id={SECTION_IDS.location} title="Where you'll be">
      <div className={styles.location}>{property.location}</div>

      <div className={styles.mapFrame}>
        <div className={styles.mapSurface} />

        <button type="button" className={styles.searchButton} aria-label="Search">
          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <circle cx="14" cy="14" r="9" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 21l7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className={styles.zoomControls}>
          <button type="button" aria-label="Zoom in">
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path d="M16 6v20M6 16h20" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" aria-label="Zoom out">
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path d="M6 16h20" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className={styles.marker} aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2}>
            <path
              d="M6 29h20M9 29V15l7-6 7 6v14M13 29v-7h6v7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className={styles.notice}>{property.locationNotice}</div>

      {neighbourhoodHighlight && (
        <>
          <div className={styles.subheading}>Neighbourhood highlights</div>
          <div className={styles.highlight}>{neighbourhoodHighlight}</div>
          {/* The reference wires its description "Show more" to a handler but
              leaves this one inert, and never clamps the text above it, so
              the label does not toggle here either. */}
          <button type="button" className={styles.showMore}>
            Show more
            <IconChevronForward className={styles.chevron} />
          </button>
        </>
      )}
    </WideSection>
  );
}
