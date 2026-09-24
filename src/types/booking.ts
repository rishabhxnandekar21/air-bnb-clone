/** Live, user-editable booking widget state — driven by user interaction, not the URL. */
export interface BookingState {
  checkIn: string | null;
  checkOut: string | null;
  guestCount: number;
}

/**
 * Split so the booking card can emphasise the deadline the way the
 * reference does ("Free cancellation before **17 October**") without any
 * component having to parse a sentence back apart.
 */
export interface CancellationTerms {
  label: string;
  deadline: string;
}

/** Canonical, static default booking terms for this listing. */
export interface BookingDetails {
  totalPrice: number;
  currency: string;
  nights: number;
  checkIn: string;
  checkOut: string;
  guestCount: number;
  cancellation: CancellationTerms;
  /** ISO dates the reference renders struck through in the availability calendar. */
  unavailableDates?: readonly string[];
}
