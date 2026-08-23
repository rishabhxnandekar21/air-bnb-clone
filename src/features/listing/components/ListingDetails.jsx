import { GuestFavourite } from "./GuestFavourite";
import { HostInfo } from "./HostInfo";
import { ListingHighlights } from "./ListingHighlights";

export function ListingDetails({ listing }) {
  const {
    capacity,
    favourite,
    highlights,
    host,
    location,
    propertyType,
    rating,
    translationNotice,
    sleepingArrangements,
  } = listing;

  return (
    <article className="listing-details">
      <header className="listing-details__intro">
        <h2>
          {propertyType} in {location.city}, {location.country}
        </h2>
        <p>
          {capacity.guests} guests · {capacity.bedrooms} bedroom · {capacity.beds} bed · {capacity.bathrooms} bathroom
        </p>
      </header>

      <GuestFavourite favourite={favourite} rating={rating} />
      <HostInfo host={host} />
      <div className="listing-details__divider" />
      <ListingHighlights highlights={highlights} />

      <p className="translation-notice">
        <span aria-hidden="true">◎</span> {translationNotice}
      </p>

      <section className="listing-description">
        <p>{listing.description}</p>
      </section>

      <section className="sleeping-arrangements">
        <h2 className="sleeping-arrangements__title">Where you'll sleep</h2>

        <div className="sleeping-arrangements__grid">
          {sleepingArrangements.map((room) => (
            <article className="sleeping-room" key={room.id}>
              <img
                className="sleeping-room__image"
                src={room.image}
                alt={room.title}
              />
              <h3 className="sleeping-room__title">{room.title}</h3>
              <p className="sleeping-room__description">{room.description}</p>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}
