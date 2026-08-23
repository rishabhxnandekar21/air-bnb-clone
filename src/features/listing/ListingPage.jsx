import { ListingHeader } from "../../components/layout/ListingHeader";
import { PhotoGallery } from "../../components/layout/PhotoGallery";
import { listings } from "../../data/listings";
import { BookingCard } from "../booking/components/BookingCard";
import { OfferBanner } from "../booking/components/OfferBanner";
import { ListingDetails } from "./components/ListingDetails";

export function ListingPage() {
  const listing = listings[0];

  return (
    <main className="listing-page">
      <ListingHeader title={listing.title} />
      <PhotoGallery images={listing.images} />
      <section className="listing-content">
        <ListingDetails listing={listing} />
        <aside className="booking-sidebar">
          <OfferBanner offer={listing.booking.offer} />
          <BookingCard booking={listing.booking} pricing={listing.pricing} />
          <button className="booking-sidebar__report" type="button">Report this listing</button>
        </aside>
      </section>
    </main>
  );
}
