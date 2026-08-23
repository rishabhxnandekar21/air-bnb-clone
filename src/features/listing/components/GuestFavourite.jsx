function SparkleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z" />
      <path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
    </svg>
  );
}

export function GuestFavourite({ favourite, rating }) {
  return (
    <section className="guest-favourite">
      <div className="guest-favourite__copy">
        <h3>Guest favourite</h3>
        <p>{favourite.description}</p>
      </div>
      <div className="guest-favourite__badge" aria-label={`${rating.value} rating from ${rating.reviewCount} reviews`}>
        <SparkleIcon />
        <strong>{rating.value.toFixed(2)}</strong>
        <span>{rating.reviewCount} Reviews</span>
      </div>
    </section>
  );
}
