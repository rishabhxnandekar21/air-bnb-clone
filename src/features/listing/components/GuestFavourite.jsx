function SparkleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z" />
      <path d="m19 16 .7 2.3L22 19l-.7 2.3L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
    </svg>
  );
}

export function GuestFavourite({ favourite, rating }) {
  return (
    <section className="guest-favourite">
      <div className="guest-favourite__badge guest-favourite__badge--favourite">
        <SparkleIcon />
        <strong>Guest favourite</strong>
      </div>
      <div className="guest-favourite__copy">
        <p>{favourite.description}</p>
      </div>
      <div className="guest-favourite__rating">
        <strong>{rating.value.toFixed(2)}</strong>
        <span aria-hidden="true">★★★★★</span>
      </div>
      <div className="guest-favourite__reviews">
        <strong>{rating.reviewCount}</strong>
        <span>Reviews</span>
      </div>
    </section>
  );
}
