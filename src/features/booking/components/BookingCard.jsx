import { Button } from "../../../components/ui/Button";

function formatPrice(amount, currency) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function BookingCard({ booking, pricing }) {
  return (
    <section className="booking-card" aria-label="Reservation details">
      <div className="booking-card__price">
        <strong>{formatPrice(pricing.nightlyRate, pricing.currency)}</strong>
        <span>for {pricing.defaultNights} nights</span>
      </div>
      <div className="booking-card__fields">
        <div className="booking-card__dates">
          <div><span>Check-in</span><strong>{booking.checkIn}</strong></div>
          <div><span>Check-out</span><strong>{booking.checkOut}</strong></div>
        </div>
        <div className="booking-card__guests"><span>Guests</span><strong>{booking.guests}</strong></div>
      </div>
      <p className="booking-card__cancellation">{booking.cancellation}</p>
      <Button className="booking-card__reserve">Reserve</Button>
      <p className="booking-card__notice">You won&apos;t be charged yet</p>
    </section>
  );
}
