import { useState } from 'react';
import type { BookingDetails } from '../../types';
import {
  formatCurrency,
  formatDateShort,
  formatGuestCount,
  formatNights,
} from '../../utils/format';
import { IconChevronRight } from '../common/icons';
import { BookingCalendar } from './BookingCalendar';
import styles from './BookingCard.module.css';

interface BookingCardProps {
  booking: BookingDetails;
}

/**
 * Field/element order matches the reference measurement: price, date/guest
 * fields, cancellation notice, Reserve button, then the disclaimer line —
 * the cancellation notice sits above the button, not below it.
 */
export function BookingCard({ booking }: BookingCardProps) {
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.priceRow}>
        <span className={styles.price}>{formatCurrency(booking.totalPrice, booking.currency)}</span>
        <span className={styles.nights}>for {formatNights(booking.nights)}</span>
      </div>

      <div className={styles.fieldGridWrapper}>
        <div className={styles.fieldGrid}>
          <div className={styles.fieldRow}>
            <button type="button" className={styles.field} onClick={() => setCalendarOpen((open) => !open)}>
              <span className={styles.fieldLabel}>Check-in</span>
              <span className={styles.fieldValue}>{formatDateShort(booking.checkIn)}</span>
            </button>
            <button type="button" className={styles.field} onClick={() => setCalendarOpen((open) => !open)}>
              <span className={styles.fieldLabel}>Checkout</span>
              <span className={styles.fieldValue}>{formatDateShort(booking.checkOut)}</span>
            </button>
          </div>
          <div className={styles.fieldFull}>
            <div>
              <span className={styles.fieldLabel}>Guests</span>
              <span className={styles.fieldValue}>{formatGuestCount(booking.guestCount)}</span>
            </div>
            <IconChevronRight className={styles.guestIcon} />
          </div>
        </div>
        {isCalendarOpen && (
          <BookingCalendar
            checkIn={booking.checkIn}
            checkOut={booking.checkOut}
            onClose={() => setCalendarOpen(false)}
          />
        )}
      </div>

      <div className={styles.cancellation}>
        {booking.cancellation.label} <b className={styles.cancellationDeadline}>{booking.cancellation.deadline}</b>
      </div>

      <button type="button" className={styles.reserveButton}>
        Reserve
      </button>

      <div className={styles.disclaimer}>You won&rsquo;t be charged yet</div>
    </div>
  );
}
