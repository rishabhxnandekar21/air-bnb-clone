import type { PropertyCapacity } from '../types';

export function formatRating(rating: number): string {
  return rating.toFixed(2);
}

export function formatReviewCount(count: number): string {
  return `${count} review${count === 1 ? '' : 's'}`;
}

export function formatYearsHosting(years: number): string {
  return `${years} year${years === 1 ? '' : 's'} hosting`;
}

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNights(nights: number): string {
  return `${nights} night${nights === 1 ? '' : 's'}`;
}

export function formatDateShort(isoDate: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(`${isoDate}T00:00:00`));
}

export function formatGuestCount(count: number): string {
  return `${count} guest${count === 1 ? '' : 's'}`;
}

export function formatCapacity(capacity: PropertyCapacity): string {
  const plural = (count: number, noun: string) => `${count} ${noun}${count === 1 ? '' : 's'}`;
  return [
    formatGuestCount(capacity.guests),
    plural(capacity.bedrooms, 'bedroom'),
    plural(capacity.beds, 'bed'),
    plural(capacity.bathrooms, 'bathroom'),
  ].join(' · ');
}

/**
 * The reference headline reads "Entire serviced apartment in Candolim,
 * India" — the property type is lower-cased mid-sentence and the location
 * is narrowed to city + country, dropping the state that `location`
 * carries in full elsewhere on the page.
 */
export function formatListingHeadline(propertyType: string, location: string): string {
  const parts = location
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
  const city = parts[0] ?? location;
  const country = parts.length > 1 ? parts[parts.length - 1] : null;
  const place = country === null ? city : `${city}, ${country}`;
  return `Entire ${propertyType.toLowerCase()} in ${place}`;
}

export function formatDayMonthYear(isoDate: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${isoDate}T00:00:00`));
}

export function formatMonthYear(year: number, monthIndex: number): string {
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
    new Date(year, monthIndex, 1),
  );
}
