import { GuestFavourite } from "./GuestFavourite";
import { HostInfo } from "./HostInfo";
import { ListingHighlights } from "./ListingHighlights";

const AMENITY_ICONS = {
  Kitchen: "♜",
  Wifi: "⌁",
  "Dedicated workspace": "▣",
  "Free parking on premises": "▤",
  Pool: "≋",
  "Hot tub": "♨",
  "Pets allowed": "♧",
  "Exterior security cameras on property": "▣",
  "Carbon monoxide alarm": "▧",
  "Smoke alarm": "◉",
};

const UNAVAILABLE_AMENITIES = new Set(["Carbon monoxide alarm", "Smoke alarm"]);

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const previousMonthDays = new Date(year, month, 0).getDate();
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  return Array.from({ length: totalCells }, (_, index) => {
    const dayOffset = index - firstDay + 1;

    if (dayOffset < 1) {
      return { day: previousMonthDays + dayOffset, muted: true, key: `prev-${index}` };
    }

    if (dayOffset > daysInMonth) {
      return { day: dayOffset - daysInMonth, muted: true, key: `next-${index}` };
    }

    return { day: dayOffset, muted: false, key: `${year}-${month}-${dayOffset}` };
  });
}

function CalendarMonth({ year, month, selectedStart, selectedEnd }) {
  const monthName = new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month, 1));
  const days = getCalendarDays(year, month);
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="availability-calendar__month">
      <h3>{monthName}</h3>
      <div className="availability-calendar__weekdays">
        {weekDays.map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}
      </div>
      <div className="availability-calendar__days">
        {days.map((item) => {
          const isSelected = item.day === selectedStart || item.day === selectedEnd;
          const isUnavailable = !item.muted && selectedStart > 0 && item.day < selectedStart;

          return (
            <span
              className={["availability-calendar__day", item.muted ? "is-muted" : "", isUnavailable ? "is-unavailable" : "", isSelected ? "is-selected" : ""].filter(Boolean).join(" ")}
              key={item.key}
            >
              {item.day}
            </span>
          );
        })}
      </div>
    </div>
  );
}

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
    amenities,
    reviews,
  } = listing;

  return (
    <article className="listing-details">
      <header className="listing-details__intro">
        <h2>{propertyType} in {location.city}, {location.country}</h2>
        <p>{capacity.guests} guests · {capacity.bedrooms} bedroom · {capacity.beds} bed · {capacity.bathrooms} bathroom</p>
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
              <img className="sleeping-room__image" src={room.image} alt={room.title} />
              <h3 className="sleeping-room__title">{room.title}</h3>
              <p className="sleeping-room__description">{room.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="amenities-section" id="amenities">
        <h2 className="amenities-section__title">What this place offers</h2>
        <div className="amenities-grid">
          {amenities.slice(0, 10).map((amenity) => {
            const unavailable = UNAVAILABLE_AMENITIES.has(amenity);
            return (
              <div className={`amenity-item${unavailable ? " is-unavailable" : ""}`} key={amenity}>
                <span className="amenity-item__icon" aria-hidden="true">{AMENITY_ICONS[amenity] || "○"}</span>
                <span>{amenity}</span>
              </div>
            );
          })}
        </div>
        <button className="amenities-section__button" type="button">Show all 50 amenities</button>
      </section>

      <section className="availability-section">
        <h2>5 nights in {location.city}</h2>
        <p className="availability-section__dates">18 Oct 2026 - 23 Oct 2026</p>
        <div className="availability-calendar">
          <button className="availability-calendar__nav" type="button" aria-label="Previous month">‹</button>
          <CalendarMonth year={2026} month={9} selectedStart={18} selectedEnd={23} />
          <CalendarMonth year={2026} month={10} selectedStart={0} selectedEnd={0} />
          <button className="availability-calendar__nav" type="button" aria-label="Next month">›</button>
        </div>
        <div className="availability-section__footer">
          <span className="availability-section__calendar-icon" aria-hidden="true">▣</span>
          <button type="button">Clear dates</button>
        </div>
      </section>

      <section className="reviews-section" id="reviews">
        <div className="reviews-section__hero">
          <div className="reviews-section__rating-mark" aria-hidden="true">
            <span>❧</span>
            <strong>{reviews.rating.toFixed(2)}</strong>
            <span className="reviews-section__mark-right">❧</span>
          </div>
          <h2>Guest favourite</h2>
          <p>This home is a guest favourite based on ratings, reviews and<br />reliability</p>
          <button type="button" className="reviews-section__how-link">How reviews work</button>
        </div>

        <div className="reviews-breakdown">
          <div className="reviews-breakdown__overall">
            <h3>Overall rating</h3>
            {[5, 4, 3, 2, 1].map((score) => (
              <div className="reviews-rating-bar" key={score}>
                <span>{score}</span>
                <span className="reviews-rating-bar__track">
                  <span className="reviews-rating-bar__fill" style={{ width: score === 5 ? "94%" : score === 4 ? "7%" : "2%" }} />
                </span>
              </div>
            ))}
          </div>

          {reviews.breakdown.map((item) => (
            <div className="reviews-breakdown__item" key={item.label}>
              <h3>{item.label}</h3>
              <strong>{item.value.toFixed(1)}</strong>
              <span className="reviews-breakdown__icon" aria-hidden="true">{item.icon}</span>
            </div>
          ))}
        </div>

        <div className="review-category-row">
          {reviews.categories.map((category) => (
            <button className="review-category" type="button" key={category.label}>
              <span aria-hidden="true">{category.icon}</span>
              <strong>{category.label}</strong>
              <small>{category.count}</small>
            </button>
          ))}
        </div>

        <div className="reviews-list">
          {reviews.items?.map((review) => (
            <article className="review-card" key={review.id}>
              <div className="review-card__header">
                <div className="review-card__avatar">
                  {review.avatar ? <img src={review.avatar} alt="" /> : review.name?.charAt(0)}
                </div>
                <div className="review-card__guest">
                  <h3 className="review-card__guest-name">{review.name}</h3>
                  <p className="review-card__hosting">{review.membership}</p>
                </div>
              </div>
              <div className="review-card__meta">
                <span className="review-card__stars">★★★★★</span>
                <span className="review-card__dot">·</span>
                <span className="review-card__date">{review.date}</span>
              </div>
              <p className="review-card__text">{review.text}</p>
              {review.showMore && <button className="review-card__show-more" type="button">Show more</button>}
            </article>
          ))}
        </div>

        <button className="reviews-section__all-button" type="button">
          Show all {reviews.reviewCount} reviews
        </button>
      </section>
    </article>
  );
}
