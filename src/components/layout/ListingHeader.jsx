import { Button } from "../ui/Button";

function ShareIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 16V3m0 0L7.5 7.5M12 3l4.5 4.5M5 12.5V20h14v-7.5" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20.8 8.4c0 5.8-8.8 10.2-8.8 10.2S3.2 14.2 3.2 8.4A4.4 4.4 0 0 1 12 7.7a4.4 4.4 0 0 1 8.8.7Z" />
    </svg>
  );
}

export function ListingHeader({ title }) {
  return (
    <header className="listing-header">
      <h1 className="listing-header__title">{title}</h1>
      <div className="listing-header__actions">
        <Button className="listing-header__action">
          <ShareIcon />
          <span>Share</span>
        </Button>
        <Button className="listing-header__action">
          <HeartIcon />
          <span>Save</span>
        </Button>
      </div>
    </header>
  );
}
