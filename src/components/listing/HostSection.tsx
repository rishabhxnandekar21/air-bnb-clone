import type { Host } from '../../types';
import { formatRating } from '../../utils/format';
import { WideSection } from '../common/WideSection';
import { IconStar } from '../common/icons';
import { AssetIcon } from '../common/AssetIcon';
import styles from './HostSection.module.css';

interface HostSectionProps {
  host: Host;
}

/**
 * Host card on the left (avatar with its verified badge, name, and the
 * reviews/rating/years column) with the co-host grid and host details
 * beside it, matching the reference's 340px + 1fr split.
 */
export function HostSection({ host }: HostSectionProps) {
  return (
    <WideSection title="Meet your host">
      <div className={styles.layout}>
        <div>
          <div className={styles.card}>
            <div className={styles.identity}>
              <div className={styles.avatarWrap}>
                {host.avatarSrc && <img className={styles.avatar} src={host.avatarSrc} alt="" />}
                <span className={styles.verifiedBadge} aria-label="Identity verified">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3}>
                    <path d="m5 12 5 5 9-9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <div className={styles.hostName}>{host.name}</div>
              <div className={styles.hostRole}>Host</div>
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statValue}>{host.reviewCount.toLocaleString('en-IN')}</div>
                <div className={styles.statLabel}>Reviews</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>
                  {formatRating(host.rating)}
                  <IconStar className={styles.statStar} />
                </div>
                <div className={styles.statLabel}>Rating</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>{host.yearsHosting}</div>
                <div className={styles.statLabel}>Years hosting</div>
              </div>
            </div>
          </div>

          <div className={styles.facts}>
            <div className={styles.fact}>
              <AssetIcon src="/images/icons/icon-born-512.png" className={styles.factIcon} />
              {host.bornDecade}
            </div>
            <div className={styles.fact}>
              <AssetIcon src="/images/icons/icon-education-cap-512.png" className={styles.factIcon} />
              Where I went to school: {host.school}
            </div>
          </div>
        </div>

        <div>
          {host.coHosts && host.coHosts.length > 0 && (
            <>
              <div className={styles.subheading}>Co-Hosts</div>
              <div className={styles.coHosts}>
                {host.coHosts.map((coHost) => (
                  <div key={coHost.id} className={styles.coHost}>
                    {coHost.avatarSrc ? (
                      <img src={coHost.avatarSrc} alt="" />
                    ) : (
                      <div
                        className={styles.coHostInitial}
                        style={{ background: coHost.avatarBackground, color: coHost.avatarColor }}
                        aria-hidden="true"
                      >
                        {coHost.initial}
                      </div>
                    )}
                    <span>{coHost.name}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className={styles.subheading}>Host details</div>
          <div className={styles.details}>
            Response rate: {host.responseRatePercent}%
            <br />
            {host.responseTime}
          </div>

          <button type="button" className={styles.messageButton}>
            Message host
          </button>

          <div className={styles.protection}>
            <AssetIcon src="/images/icons/icon-shield-512.png" className={styles.protectionIcon} />
            <span>
              To help protect your payment, always use Airbnb to send money and communicate with
              hosts.
            </span>
          </div>
        </div>
      </div>
    </WideSection>
  );
}
