import styles from './SearchPill.module.css';

/**
 * Three tappable segments separated by hairline dividers, then the round
 * search button. Widths are content-driven on the reference — the pill is
 * not given a fixed width — so nothing here sets one either.
 */
export function SearchPill() {
  return (
    <div className={styles.pill} role="search">
      <button type="button" className={styles.segment}>
        <img className={styles.houseIcon} src="/images/ui/searchbar-house.png" alt="" aria-hidden="true" />
        Anywhere
      </button>
      <span className={styles.divider} />
      <button type="button" className={styles.segment}>
        Anytime
      </button>
      <span className={styles.divider} />
      <button type="button" className={`${styles.segment} ${styles.segmentMuted}`}>
        Add guests
      </button>
      <button type="button" className={styles.searchButton} aria-label="Search" />
    </div>
  );
}
