import { Button } from "../../../components/ui/Button";

export function BookingCard({ booking }) {
  return (
    <section className="booking-card" aria-label="Reservation details">
      <h2 className="booking-card__title">Add dates for prices</h2>
      <div className="booking-card__fields">
        <div className="booking-card__dates">
          <div>
            <span>Check-in</span>
            <strong>Add date</strong>
          </div>
          <div>
            <span>Check-out</span>
            <strong>Add date</strong>
          </div>
        </div>
        <div className="booking-card__guests">
          <span>Guests</span>
          <strong>{booking.guests || "1 guest"}</strong>
          <span className="booking-card__chevron" aria-hidden="true">⌄</span>
        </div>
      </div>
      <Button className="booking-card__reserve">Check availability</Button>
    </section>
  );
}
