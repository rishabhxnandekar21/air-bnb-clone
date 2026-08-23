import { Button } from "../ui/Button";

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32">
      <path d="m13 4a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm6.4 15.4L27 27" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14.5 14.5 0 0 1 0 18M12 3a14.5 14.5 0 0 0 0 18" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function BrandMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 36">
      <path d="M16 3c-3.4 0-5.2 5.9-7.6 10.2C6.4 16.7 4 19.5 4 23.1A8.2 8.2 0 0 0 16 30a8.2 8.2 0 0 0 12-6.9c0-3.6-2.4-6.4-4.4-9.9C21.2 8.9 19.4 3 16 3Z" />
      <path d="M16 12.2c1.6 0 3.6 4.2 4.8 6.2.7 1.2 1.5 2.8 1.5 4.2A4.7 4.7 0 0 1 16 27a4.7 4.7 0 0 1-6.3-4.4c0-1.4.8-3 1.5-4.2 1.2-2 3.2-6.2 4.8-6.2Z" />
    </svg>
  );
}

export function Navbar() {
  return (
    <header className="navbar">
      <nav aria-label="Primary navigation" className="navbar__inner">
        <a aria-label="Stay home" className="navbar__brand" href="/">
          <BrandMark />
          <span>airbnb</span>
        </a>

        <div aria-label="Search stays" className="navbar__search">
          <button className="navbar__search-part" type="button">Anywhere</button>
          <span aria-hidden="true" className="navbar__divider" />
          <button className="navbar__search-part" type="button">Anytime</button>
          <span aria-hidden="true" className="navbar__divider" />
          <button className="navbar__search-part navbar__search-part--guests" type="button">
            Add guests
          </button>
          <Button aria-label="Search" className="navbar__search-button">
            <SearchIcon />
          </Button>
        </div>

        <div className="navbar__actions">
          <Button className="navbar__host">Become a host</Button>
          <Button aria-label="Choose a language" className="navbar__icon-button">
            <GlobeIcon />
          </Button>
          <Button aria-label="Open account menu" className="navbar__icon-button">
            <MenuIcon />
          </Button>
        </div>
      </nav>
    </header>
  );
}
