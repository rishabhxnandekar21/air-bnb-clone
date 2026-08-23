import { useState } from "react";
import { ListingHeader } from "../../components/layout/ListingHeader";
import { PhotoGallery } from "../../components/layout/PhotoGallery";
import { listings } from "../../data/listings";
import { BookingCard } from "../booking/components/BookingCard";
import { OfferBanner } from "../booking/components/OfferBanner";
import ListingSubnav from "./components/ListingSubnav";
import { ListingDetails } from "./components/ListingDetails";

const CO_HOSTS = [
  { name: "Sharath", initial: "S", tone: "green" },
  { name: "Aman Dev Pahwa", initial: "A", tone: "orange" },
  { name: "Maria Karen Priyanka", initial: "M", tone: "cream" },
  { name: "Simran", initial: "S", tone: "pink" },
  { name: "Pallavi", initial: "P", tone: "blue" },
  { name: "Sanyukta", initial: "S", tone: "yellow" },
  { name: "Shruti", initial: "S", tone: "light-pink" },
  { name: "Amisha", initial: "A", tone: "light-blue" },
];

const NEARBY_STAYS = [
  { title: "Beautiful Studio with a view to die for", price: "₹23,600", rating: "4.91" },
  { title: "NAQAAB - 1bhk with private pool", price: "₹42,218", rating: "4.95" },
  { title: "Greentique Luxury Flat with plunge pool, Calangute", price: "₹44,506", rating: "4.94" },
  { title: "The Tropical Studio | 5 mins to Beach", price: "₹22,824", rating: "4.96" },
  { title: "Luxury Casa Bella 1BHK with plunge pool, Calangute", price: "₹39,942", rating: "4.95" },
];

export function ListingPage() {
  const listing = listings[0];
  const [nearbyPage, setNearbyPage] = useState(0);
  const nearbyImages = listing.images;

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
            <button className="booking-sidebar__report" type="button">Report this listing</button>
          </div>
        </aside>
      </section>

      <section className="location-section" id="location" aria-labelledby="location-title">
        <style>{`
          .location-section{padding:3.25rem 0 5rem;border-top:1px solid var(--color-border-subtle)}
          .location-section__title{margin:0;font-size:1.5rem;font-weight:600;letter-spacing:-.02em;line-height:1.8rem}
          .location-section__address{margin:1.5rem 0 1.75rem;font-size:1rem;line-height:1.4rem}
          .location-map{position:relative;height:27.5rem;overflow:hidden;border-radius:.75rem;background:repeating-linear-gradient(0deg,transparent 0,transparent 5.25rem,rgb(205 215 202 / .48) 5.25rem,rgb(205 215 202 / .48) 5.375rem),repeating-linear-gradient(90deg,transparent 0,transparent 5.25rem,rgb(205 215 202 / .48) 5.25rem,rgb(205 215 202 / .48) 5.375rem),#eaf1e5}
          .location-map::before{content:"";position:absolute;inset:0 auto 0 0;width:40%;background:#a9d5e7;clip-path:polygon(0 0,100% 0,63% 100%,0 100%)}
          .location-map__park{position:absolute;width:7.5rem;height:7.5rem;border-radius:50%;background:rgb(197 222 186 / .72)}
          .location-map__park--one{top:9.5rem;left:24%}.location-map__park--two{top:13rem;left:63%;width:8.75rem;height:8.75rem}
          .location-map__search,.location-map__zoom button{display:grid;place-items:center;width:3rem;height:3rem;padding:0;color:var(--color-text);background:var(--color-surface);border:0;border-radius:.75rem;box-shadow:0 .125rem .5rem rgb(0 0 0 / .16);cursor:pointer}
          .location-map__search{position:absolute;top:.875rem;left:.875rem;border-radius:50%}.location-map__search svg{width:1.15rem;height:1.15rem;fill:none;stroke:currentColor;stroke-linecap:round;stroke-width:1.7}
          .location-map__zoom{position:absolute;top:.875rem;right:.875rem;display:grid;gap:.5rem}.location-map__zoom button{font-size:1.5rem;font-weight:300;line-height:1}
          .location-map__marker{position:absolute;top:50%;left:50%;display:grid;place-items:center;width:4rem;height:4rem;transform:translate(-50%,-50%);color:#fff;background:#222;border:.25rem solid #fff;border-radius:50%;box-shadow:0 .25rem .75rem rgb(0 0 0 / .25)}
          .location-map__marker svg{width:2rem;height:2rem;fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2}
          .location-section__note{margin:1.25rem 0 0;font-size:1rem;line-height:1.4rem}.location-section__highlights{margin-top:3.25rem}.location-section__highlights h3{margin:0;font-size:1.25rem;font-weight:600;line-height:1.5rem}.location-section__highlights p{margin:1rem 0 0;font-size:1rem;line-height:1.45rem}
          .location-section__show-more{display:inline-flex;align-items:center;gap:.45rem;margin-top:1.25rem;padding:0;color:var(--color-text);background:transparent;border:0;cursor:pointer;font-size:1rem;font-weight:600;text-decoration:underline;text-underline-offset:.15rem}.location-section__show-more span{font-size:1.35rem;line-height:1;text-decoration:none}

          .host-section{padding:3.25rem 0 4rem;border-top:1px solid var(--color-border-subtle)}.host-section__title,.things-section__title,.nearby-section__title{margin:0;font-size:1.5rem;font-weight:600;line-height:1.8rem;letter-spacing:-.02em}
          .host-section__grid{display:grid;grid-template-columns:24.75rem minmax(0,1fr);gap:3.5rem;margin-top:2rem}.host-card{display:grid;grid-template-columns:1fr 8.5rem;min-height:18.75rem;padding:2rem;border:1px solid var(--color-border-subtle);border-radius:1.5rem;box-shadow:0 .5rem 1.5rem rgb(0 0 0 / .1)}
          .host-card__identity{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.host-card__avatar{width:6.5rem;height:6.5rem;object-fit:cover;border-radius:50%}.host-card__name{max-width:10rem;margin:1rem 0 0;font-size:1.8rem;font-weight:500;line-height:2.15rem}.host-card__role{margin:.35rem 0 0;font-size:.95rem}
          .host-card__stats{display:flex;flex-direction:column;justify-content:center;padding-left:1.4rem;border-left:1px solid var(--color-border-subtle)}.host-card__stat{padding:.8rem 0;border-bottom:1px solid var(--color-border-subtle)}.host-card__stat:last-child{border-bottom:0}.host-card__stat strong{display:block;font-size:1.35rem;font-weight:500}.host-card__stat span{display:block;margin-top:.2rem;font-size:.85rem}
          .host-section__facts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));column-gap:2.75rem}.host-section__facts h3,.host-section__details h3{margin:0 0 1.25rem;font-size:1.25rem;font-weight:500}.co-hosts{grid-column:1/-1}.co-host-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));column-gap:2.5rem;row-gap:1.15rem}.co-host{display:flex;align-items:center;gap:.8rem;min-width:0;font-size:1rem}.co-host__avatar{display:grid;place-items:center;width:2.5rem;height:2.5rem;flex:0 0 2.5rem;overflow:hidden;border-radius:50%;font-size:.85rem;font-weight:500}.co-host__avatar--green{background:#15563f;color:#fff}.co-host__avatar--orange{background:#c97831;color:#fff}.co-host__avatar--cream{background:#eee1c8;color:#7b5c37}.co-host__avatar--pink{background:#eac4ca;color:#8b4450}.co-host__avatar--blue{background:#d4e1ef;color:#35516d}.co-host__avatar--yellow{background:#eadfa5;color:#705f1d}.co-host__avatar--light-pink{background:#fbe5ed;color:#c04a76}.co-host__avatar--light-blue{background:#e0edff;color:#3769a5}
          .host-section__details{grid-column:1/-1;margin-top:2rem}.host-section__details p{margin:.5rem 0 0;font-size:1rem;line-height:1.5rem}.host-section__message{margin-top:1.25rem;padding:.9rem 1.4rem;border:0;border-radius:.75rem;background:#f0f0f0;color:var(--color-text);font-weight:600;cursor:pointer}.host-section__protection{display:flex;align-items:center;gap:.75rem;grid-column:1/-1;margin-top:2rem;color:var(--color-text-muted);font-size:.9rem}.host-section__protection svg{width:1.75rem;height:1.75rem;flex:0 0 auto}.host-section__bottom-facts{display:flex;flex-direction:column;gap:1rem;margin-top:1.25rem}.host-fact{display:flex;align-items:center;gap:1rem;font-size:1rem}.host-fact svg{width:1.5rem;height:1.5rem;flex:0 0 auto}

          .things-section{padding:3.25rem 0 4rem;border-top:1px solid var(--color-border-subtle)}.things-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4.5rem;margin-top:2rem}.thing-card__icon{width:1.8rem;height:1.8rem;margin-bottom:1.25rem}.thing-card h3{margin:0 0 1.25rem;font-size:1.1rem;font-weight:600}.thing-card p{margin:0;font-size:1rem;line-height:1.65rem}.thing-card__learn{display:inline-block;margin-top:.55rem;color:var(--color-text);font-size:1rem;font-weight:600;text-decoration:underline;text-underline-offset:.15rem}

          .nearby-section{padding:3.25rem 0 5rem;border-top:1px solid var(--color-border-subtle)}.nearby-section__header{display:flex;align-items:center;justify-content:space-between;gap:1rem}.nearby-section__controls{display:flex;align-items:center;gap:.75rem}.nearby-section__page{color:var(--color-text);font-size:.9rem}.nearby-section__arrow{display:grid;place-items:center;width:2.5rem;height:2.5rem;padding:0;border:1px solid var(--color-border);border-radius:50%;background:#fff;cursor:pointer;font-size:1.5rem;line-height:1}.nearby-section__arrow:disabled{color:#b5b5b5;cursor:default}.nearby-carousel{overflow:hidden;margin-top:2rem}.nearby-carousel__track{display:flex;gap:1.4rem;transform:translateX(calc(var(--nearby-page) * -50%));transition:transform 220ms ease}.nearby-card{flex:0 0 calc((100% - 5.6rem) / 5);min-width:0}.nearby-card__image{display:block;width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:.75rem}.nearby-card__title{margin:.7rem 0 0;font-size:.95rem;font-weight:600;line-height:1.25rem}.nearby-card__meta{margin:.3rem 0 0;font-size:.9rem;line-height:1.2rem}.nearby-card__rating{margin-left:.2rem}
          @media(max-width:64rem){.host-section__grid{grid-template-columns:1fr}.host-card{max-width:30rem}.host-section__facts{grid-template-columns:1fr 1fr}.nearby-card{flex-basis:calc((100% - 2.8rem) / 3)}}
          @media(max-width:48rem){.location-section,.host-section,.things-section,.nearby-section{padding-top:2.5rem}.location-map{height:22rem}.location-map__park--one{left:18%}.location-map__park--two{left:58%}.host-card{grid-template-columns:1fr;padding:1.5rem}.host-card__stats{padding:1rem 0 0;border-top:1px solid var(--color-border-subtle);border-left:0}.host-section__facts,.things-grid{grid-template-columns:1fr}.co-host-grid{grid-template-columns:1fr 1fr}.things-grid{gap:2.5rem}.nearby-card{flex-basis:calc((100% - 1.4rem) / 2)}}
        `}</style>

        <h2 className="location-section__title" id="location-title">Where you’ll be</h2>
        <p className="location-section__address">{listing.location.city}, Goa, {listing.location.country}</p>
        <div className="location-map" role="img" aria-label="Map showing the approximate location in Candolim, Goa">
          <button className="location-map__search" type="button" aria-label="Search map"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></svg></button>
          <div className="location-map__zoom" aria-label="Map zoom controls"><button type="button" aria-label="Zoom in">+</button><button type="button" aria-label="Zoom out">−</button></div>
          <span className="location-map__park location-map__park--one" aria-hidden="true" /><span className="location-map__park location-map__park--two" aria-hidden="true" />
          <div className="location-map__marker" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M5 14.5 16 5l11 9.5V27H5Z" /><path d="M12 27V17h8v10" /></svg></div>
        </div>
        <p className="location-section__note">Exact location will be provided after booking.</p>
        <div className="location-section__highlights"><h3>Neighbourhood highlights</h3><p>Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.</p><button className="location-section__show-more" type="button">Show more <span aria-hidden="true">›</span></button></div>
      </section>

      <section className="host-section" aria-labelledby="host-section-title">
        <h2 className="host-section__title" id="host-section-title">Meet your host</h2>
        <div className="host-section__grid">
          <div>
            <article className="host-card"><div className="host-card__identity"><img className="host-card__avatar" src={listing.host.image} alt="Mirashya Homes host" /><h3 className="host-card__name">Mirashya<br />Homes</h3><p className="host-card__role">Host</p></div><div className="host-card__stats"><div className="host-card__stat"><strong>1,463</strong><span>Reviews</span></div><div className="host-card__stat"><strong>4.68★</strong><span>Rating</span></div><div className="host-card__stat"><strong>2</strong><span>Years hosting</span></div></div></article>
            <div className="host-section__bottom-facts"><div className="host-fact"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 21s7-5.1 7-11a7 7 0 0 0-14 0c0 5.9 7 11 7 11Z" /><circle cx="12" cy="10" r="2.2" /></svg><span>Born in the 80s</span></div><div className="host-fact"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="m3 9 9-5 9 5-9 5-9-5Z" /><path d="M5 11v5l7 4 7-4v-5" /></svg><span>Where I went to school: NICMAR GOA</span></div></div>
          </div>
          <div className="host-section__facts">
            <div className="co-hosts"><h3>Co-Hosts</h3><div className="co-host-grid">{CO_HOSTS.map((coHost) => <div className="co-host" key={coHost.name}><span className={`co-host__avatar co-host__avatar--${coHost.tone}`}>{coHost.initial}</span><span>{coHost.name}</span></div>)}</div></div>
            <div className="host-section__details"><h3>Host details</h3><p>Response rate: 100%</p><p>Responds within an hour</p><button className="host-section__message" type="button">Message host</button></div>
            <div className="host-section__protection"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3 19 6v6c0 4.8-3 7.7-7 9-4-1.3-7-4.2-7-9V6l7-3Z" /><path d="M12 7v12" /></svg><span>To help protect your payment, always use Airbnb to send money and communicate with hosts.</span></div>
          </div>
        </div>
      </section>

      <section className="things-section" aria-labelledby="things-title">
        <h2 className="things-section__title" id="things-title">Things to know</h2>
        <div className="things-grid">
          <article className="thing-card"><svg className="thing-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M8 2v4M16 2v4M4 9h16M9 13l6 6M15 13l-6 6" /></svg><h3>Cancellation policy</h3><p>Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.<br /><br />Review this host’s full policy for details.</p><a className="thing-card__learn" href="#location">Learn more</a></article>
          <article className="thing-card"><svg className="thing-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="9" cy="9" r="5" /><path d="m13 13 7 7M16 17h3M17 14v3" /></svg><h3>House rules</h3><p>Check-in after 2:00 pm<br />Checkout before 11:00 am<br />3 guests maximum</p><a className="thing-card__learn" href="#location">Learn more</a></article>
          <article className="thing-card"><svg className="thing-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3 19 6v6c0 4.8-3 7.7-7 9-4-1.3-7-4.2-7-9V6l7-3Z" /></svg><h3>Safety &amp; property</h3><p>Carbon monoxide alarm not reported<br />Smoke alarm not reported<br />Exterior security cameras on property</p><a className="thing-card__learn" href="#location">Learn more</a></article>
        </div>
      </section>

      <section className="nearby-section" aria-labelledby="nearby-title">
        <div className="nearby-section__header"><h2 className="nearby-section__title" id="nearby-title">More stays nearby</h2><div className="nearby-section__controls"><span className="nearby-section__page">{nearbyPage + 1} / 2</span><button className="nearby-section__arrow" type="button" aria-label="Previous stays" disabled={nearbyPage === 0} onClick={() => setNearbyPage(0)}>‹</button><button className="nearby-section__arrow" type="button" aria-label="Next stays" disabled={nearbyPage === 1} onClick={() => setNearbyPage(1)}>›</button></div></div>
        <div className="nearby-carousel"><div className="nearby-carousel__track" style={{ "--nearby-page": nearbyPage }}>{NEARBY_STAYS.concat(NEARBY_STAYS).map((stay, index) => <article className="nearby-card" key={`${stay.title}-${index}`}><img className="nearby-card__image" src={nearbyImages[index % nearbyImages.length].src} alt={stay.title} /><h3 className="nearby-card__title">{stay.title}</h3><p className="nearby-card__meta">{stay.price}<span className="nearby-card__rating">★ {stay.rating}</span></p></article>)}</div></div>
      </section>
    </main>
  );
}
