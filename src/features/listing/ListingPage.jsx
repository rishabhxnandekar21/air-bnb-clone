import { ListingHeader } from "../../components/layout/ListingHeader";
import { PhotoGallery } from "../../components/layout/PhotoGallery";
import { listings } from "../../data/listings";
import { BookingCard } from "../booking/components/BookingCard";
import { OfferBanner } from "../booking/components/OfferBanner";
import ListingSubnav from "./components/ListingSubnav";
import { ListingDetails } from "./components/ListingDetails";

export function ListingPage() {
  const listing = listings[0];

  return (
    <main className="listing-page">
      <ListingHeader title={listing.title} />
      <PhotoGallery images={listing.images} />
      <ListingSubnav />

      <section className="listing-content">
        <ListingDetails listing={listing} />

        <aside className="booking-sidebar">
          <div className="booking-sidebar__sticky">
            <OfferBanner offer={listing.booking.offer} />
            <BookingCard booking={listing.booking} pricing={listing.pricing} />
            <button className="booking-sidebar__report" type="button">
              Report this listing
            </button>
          </div>
        </aside>
      </section>

      <section className="location-section" id="location" aria-labelledby="location-title">
        <style>{`
          .location-section {
            padding: 3.25rem 0 5rem;
            border-top: 1px solid var(--color-border-subtle);
          }

          .location-section__title {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 600;
            letter-spacing: -0.02em;
            line-height: 1.8rem;
          }

          .location-section__address {
            margin: 1.5rem 0 1.75rem;
            font-size: 1rem;
            line-height: 1.4rem;
          }

          .location-map {
            position: relative;
            height: 27.5rem;
            overflow: hidden;
            border-radius: 0.75rem;
            background:
              repeating-linear-gradient(0deg, transparent 0, transparent 5.25rem, rgb(205 215 202 / 0.48) 5.25rem, rgb(205 215 202 / 0.48) 5.375rem),
              repeating-linear-gradient(90deg, transparent 0, transparent 5.25rem, rgb(205 215 202 / 0.48) 5.25rem, rgb(205 215 202 / 0.48) 5.375rem),
              #eaf1e5;
          }

          .location-map::before {
            content: "";
            position: absolute;
            inset: 0 auto 0 0;
            width: 40%;
            background: #a9d5e7;
            clip-path: polygon(0 0, 100% 0, 63% 100%, 0 100%);
          }

          .location-map__park {
            position: absolute;
            width: 7.5rem;
            height: 7.5rem;
            border-radius: 50%;
            background: rgb(197 222 186 / 0.72);
          }

          .location-map__park--one {
            top: 9.5rem;
            left: 24%;
          }

          .location-map__park--two {
            top: 13rem;
            left: 63%;
            width: 8.75rem;
            height: 8.75rem;
          }

          .location-map__search,
          .location-map__zoom button {
            display: grid;
            place-items: center;
            width: 3rem;
            height: 3rem;
            padding: 0;
            color: var(--color-text);
            background: var(--color-surface);
            border: 0;
            border-radius: 0.75rem;
            box-shadow: 0 0.125rem 0.5rem rgb(0 0 0 / 0.16);
            cursor: pointer;
          }

          .location-map__search {
            position: absolute;
            top: 0.875rem;
            left: 0.875rem;
            border-radius: 50%;
          }

          .location-map__search svg {
            width: 1.15rem;
            height: 1.15rem;
            fill: none;
            stroke: currentColor;
            stroke-linecap: round;
            stroke-width: 1.7;
          }

          .location-map__zoom {
            position: absolute;
            top: 0.875rem;
            right: 0.875rem;
            display: grid;
            gap: 0.5rem;
          }

          .location-map__zoom button {
            font-size: 1.5rem;
            font-weight: 300;
            line-height: 1;
          }

          .location-map__marker {
            position: absolute;
            top: 50%;
            left: 50%;
            display: grid;
            place-items: center;
            width: 4rem;
            height: 4rem;
            transform: translate(-50%, -50%);
            color: #fff;
            background: #222;
            border: 0.25rem solid #fff;
            border-radius: 50%;
            box-shadow: 0 0.25rem 0.75rem rgb(0 0 0 / 0.25);
          }

          .location-map__marker svg {
            width: 2rem;
            height: 2rem;
            fill: none;
            stroke: currentColor;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 2;
          }

          .location-section__note {
            margin: 1.25rem 0 0;
            font-size: 1rem;
            line-height: 1.4rem;
          }

          .location-section__highlights {
            margin-top: 3.25rem;
            padding-top: 0;
          }

          .location-section__highlights h3 {
            margin: 0;
            font-size: 1.25rem;
            font-weight: 600;
            line-height: 1.5rem;
          }

          .location-section__highlights p {
            margin: 1rem 0 0;
            font-size: 1rem;
            line-height: 1.45rem;
          }

          .location-section__show-more {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            margin-top: 1.25rem;
            padding: 0;
            color: var(--color-text);
            background: transparent;
            border: 0;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            text-decoration: underline;
            text-underline-offset: 0.15rem;
          }

          .location-section__show-more span {
            font-size: 1.35rem;
            line-height: 1;
            text-decoration: none;
          }

          @media (max-width: 48rem) {
            .location-section {
              padding-top: 2.5rem;
            }

            .location-map {
              height: 22rem;
            }

            .location-map__park--one {
              left: 18%;
            }

            .location-map__park--two {
              left: 58%;
            }
          }
        `}</style>

        <h2 className="location-section__title" id="location-title">Where you’ll be</h2>
        <p className="location-section__address">
          {location.city}, Goa, {location.country}
        </p>

        <div className="location-map" role="img" aria-label="Map showing the approximate location in Candolim, Goa">
          <button className="location-map__search" type="button" aria-label="Search map">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 4.5 4.5" />
            </svg>
          </button>

          <div className="location-map__zoom" aria-label="Map zoom controls">
            <button type="button" aria-label="Zoom in">+</button>
            <button type="button" aria-label="Zoom out">−</button>
          </div>

          <span className="location-map__park location-map__park--one" aria-hidden="true" />
          <span className="location-map__park location-map__park--two" aria-hidden="true" />

          <div className="location-map__marker" aria-hidden="true">
            <svg viewBox="0 0 32 32">
              <path d="M5 14.5 16 5l11 9.5V27H5Z" />
              <path d="M12 27V17h8v10" />
            </svg>
          </div>
        </div>

        <p className="location-section__note">Exact location will be provided after booking.</p>

        <div className="location-section__highlights">
          <h3>Neighbourhood highlights</h3>
          <p>
            Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.
          </p>
          <button className="location-section__show-more" type="button">
            Show more <span aria-hidden="true">›</span>
          </button>
        </div>
      </section>
    </main>
  );
}
