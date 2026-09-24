import { useEffect, useRef } from 'react';
import { getMonthGrid, formatMonthLabel, parseIsoDate } from '../../utils/calendar';
import { cx } from '../../utils/classNames';
import styles from './BookingCalendar.module.css';

interface BookingCalendarProps {
  checkIn: string;
  checkOut: string;
  onClose: () => void;
}

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function renderMonth(year: number, month: number, checkIn: string, checkOut: string) {
  const days = getMonthGrid(year, month);
  return (
    <div className={styles.month} key={`${year}-${month}`}>
      <p className={styles.monthLabel}>{formatMonthLabel(year, month)}</p>
      <div className={styles.weekdays}>
        {WEEKDAY_LABELS.map((label, i) => (
          <span key={i} className={styles.weekday}>
            {label}
          </span>
        ))}
      </div>
      <div className={styles.grid}>
        {days.map((day) => {
          const isStart = day.iso === checkIn;
          const isEnd = day.iso === checkOut;
          const inRange = day.iso > checkIn && day.iso < checkOut;
          return (
            <span
              key={day.iso}
              className={cx(
                styles.day,
                !day.inCurrentMonth && styles.dayMuted,
                inRange && styles.dayInRange,
                (isStart || isEnd) && styles.daySelected,
              )}
            >
              {day.date.getDate()}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function BookingCalendar({ checkIn, checkOut, onClose }: BookingCalendarProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const { year, month } = parseIsoDate(checkIn);
  const nextMonthDate = new Date(year, month + 1, 1);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div ref={popoverRef} className={styles.popover} role="dialog" aria-label="Trip dates">
      <div className={styles.months}>
        {renderMonth(year, month, checkIn, checkOut)}
        {renderMonth(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), checkIn, checkOut)}
      </div>
    </div>
  );
}
