import { useMemo, useState } from 'react';
import type { BookingDetails } from '../../types';
import { cx } from '../../utils/classNames';
import { formatDayMonthYear, formatMonthYear, formatNights } from '../../utils/format';
import { Section } from '../common/Section';
import { IconChevronLeft, IconChevronRight } from '../common/icons';
import styles from './AvailabilityCalendar.module.css';

interface AvailabilityCalendarProps {
  booking: BookingDetails;
  /** City only — the reference heading reads "5 nights in Candolim". */
  city: string;
}

const WEEKDAY_INITIALS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;

interface DayCell {
  key: string;
  iso: string | null;
  label: string;
}

/** Leading blanks so the 1st lands on its real weekday, then the month's days. */
function buildMonth(year: number, monthIndex: number): DayCell[] {
  const first = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells: DayCell[] = [];

  for (let i = 0; i < first.getDay(); i += 1) {
    cells.push({ key: `blank-${monthIndex}-${i}`, iso: null, label: '' });
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const iso = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    cells.push({ key: iso, iso, label: String(day) });
  }
  return cells;
}

/**
 * The reference's inline availability calendar: two months side by side with
 * the booked range highlighted — the first and last night as filled circles
 * and the nights between them as a continuous grey bar. Navigating months
 * and clearing the dates are both live; the selection starts from the
 * canonical booking dates.
 */
export function AvailabilityCalendar({ booking, city }: AvailabilityCalendarProps) {
  const [range, setRange] = useState<{ start: string; end: string } | null>({
    start: booking.checkIn,
    end: booking.checkOut,
  });
  const [monthOffset, setMonthOffset] = useState(0);

  const baseDate = useMemo(() => new Date(`${booking.checkIn}T00:00:00`), [booking.checkIn]);
  const unavailable = useMemo(
    () => new Set(booking.unavailableDates ?? []),
    [booking.unavailableDates],
  );

  const months = [0, 1].map((offset) => {
    const d = new Date(baseDate.getFullYear(), baseDate.getMonth() + monthOffset + offset, 1);
    return { year: d.getFullYear(), monthIndex: d.getMonth() };
  });

  const heading = `${formatNights(booking.nights)} in ${city}`;
  const subheading = range
    ? `${formatDayMonthYear(range.start)} - ${formatDayMonthYear(range.end)}`
    : 'Add your travel dates for exact pricing';

  return (
    <Section>
      <div className={styles.header}>
        <div className={styles.title}>{heading}</div>
        <div className={styles.subtitle}>{subheading}</div>
      </div>

      <div className={styles.months}>
        <div className={styles.nav}>
          <button type="button" aria-label="Previous month" onClick={() => setMonthOffset((m) => m - 1)}>
            <IconChevronLeft className={styles.navIcon} />
          </button>
          <button type="button" aria-label="Next month" onClick={() => setMonthOffset((m) => m + 1)}>
            <IconChevronRight className={styles.navIcon} />
          </button>
        </div>

        {months.map(({ year, monthIndex }) => (
          <div key={`${year}-${monthIndex}`} className={styles.month}>
            <div className={styles.monthTitle}>{formatMonthYear(year, monthIndex)}</div>
            <div className={styles.weekdays}>
              {WEEKDAY_INITIALS.map((initial, i) => (
                <span key={`${initial}-${i}`}>{initial}</span>
              ))}
            </div>
            <div className={styles.days}>
              {buildMonth(year, monthIndex).map((cell) => {
                const isStart = range !== null && cell.iso === range.start;
                const isEnd = range !== null && cell.iso === range.end;
                const inRange =
                  range !== null &&
                  cell.iso !== null &&
                  cell.iso > range.start &&
                  cell.iso < range.end;
                const isDisabled = cell.iso !== null && unavailable.has(cell.iso);

                return (
                  <div
                    key={cell.key}
                    className={cx(
                      styles.day,
                      cell.iso === null && styles.dayBlank,
                      isDisabled && styles.dayDisabled,
                      inRange && styles.dayInRange,
                      isStart && styles.dayStart,
                      isEnd && styles.dayEnd,
                    )}
                  >
                    {cell.label}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <span className={styles.keyboardHint} aria-hidden="true">
          <svg viewBox="0 0 30 22" width="18" height="13" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1" y="1" width="28" height="20" rx="3" />
          </svg>
        </span>
        <button type="button" className={styles.clearButton} onClick={() => setRange(null)}>
          Clear dates
        </button>
      </div>
    </Section>
  );
}
