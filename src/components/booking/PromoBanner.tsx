import styles from './PromoBanner.module.css';

/**
 * The reference shows this offer card directly above the booking card,
 * inside the same sticky rail, so it scrolls with the card rather than
 * with the page content.
 */
export function PromoBanner() {
  return (
    <div className={styles.banner}>
      <img className={styles.icon} src="/images/ui/discount.svg" alt="" aria-hidden="true" width={32} height={32} />
      <div className={styles.text}>
        Get 10% off your next stay.
        <br />
        <button type="button" className={styles.link}>
          Terms apply
        </button>
      </div>
      <button type="button" className={styles.claimButton}>
        Claim
      </button>
    </div>
  );
}
