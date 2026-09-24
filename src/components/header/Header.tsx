import { IconGlobe, IconMenu } from '../common/icons';
import { AirbnbLogo } from '../common/AirbnbLogo';
import { SearchPill } from './SearchPill';
import styles from './Header.module.css';

/**
 * Structure mirrors the reference header exactly: brand link, centred
 * search pill, then a nav holding the "Become a host" link and two 40px
 * round icon buttons (language/currency and main menu). The reference uses
 * two separate round buttons here rather than a combined profile pill.
 */
export function Header() {
  return (
    <header className={styles.header} id="siteHeader">
      <div className={styles.inner}>
        <button type="button" className={styles.brand} aria-label="Airbnb homepage">
          <AirbnbLogo className={styles.brandLogo} />
          <span className={styles.brandWordmark}>airbnb</span>
        </button>

        <SearchPill />

        <nav className={styles.actions}>
          <button type="button" className={styles.hostLink}>
            Become a host
          </button>
          <button type="button" className={styles.iconButton} aria-label="Choose a language and currency">
            <IconGlobe />
          </button>
          <button type="button" className={styles.iconButton} aria-label="Main navigation menu">
            <IconMenu />
          </button>
        </nav>
      </div>
    </header>
  );
}
