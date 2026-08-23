import { Button } from "../../../components/ui/Button";

function TagIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M3 11.2V4h7.2L21 14.8 14.8 21 3 11.2Z" />
      <circle cx="7.4" cy="8.4" r="1" />
    </svg>
  );
}

export function OfferBanner({ offer }) {
  return (
    <aside className="offer-banner">
      <TagIcon />
      <p><strong>{offer.message}</strong> <span>{offer.terms}</span></p>
      <Button className="offer-banner__claim">{offer.action}</Button>
    </aside>
  );
}
