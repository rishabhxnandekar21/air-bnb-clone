import { useState } from "react";
import "../../../styles/listing-reference.css";
import "../../../styles/listing-detail-overrides.css";

function SparkleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32">
      <path d="M5 25c5-3 8-8 9-18" />
      <path d="M10 21c-1-4-3-6-6-7M12 17c3-1 5-3 6-6M8 22c-3 0-5 2-6 4M13 13c-1-4-1-7 1-10" />
      <path d="M27 25c-5-3-8-8-9-18" />
      <path d="M22 21c1-4 3-6 6-7M20 17c-3-1-5-3-6-6M24 22c3 0 5 2 6 4M19 13c1-4 1-7-1-10" />
    </svg>
  );
}

const DESCRIPTION = "🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it’s ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️🌴";

export function GuestFavourite({ favourite, rating }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <>
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

      <section className="reference-description" aria-label="Listing description">
        <div className="reference-description__translation">
          <span>Some info has been automatically translated.&nbsp;</span>
          <button type="button">Show original</button>
        </div>

        {expanded && <p className="reference-description__body">{DESCRIPTION}</p>}

        <button
          className="reference-description__toggle"
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      </section>
    </>
  );
}
