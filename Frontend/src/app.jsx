import {
  BrowserRouter,
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

function ListingPage() {
  return (
    <main aria-label="Listing page">
      <header>
        <p>Homes / Portugal / Lisbon</p>
        <h1>Bright, design-forward apartment in the heart of Lisbon</h1>
        <p>★ 4.92 · 124 reviews · Lisbon, Portugal</p>
        <button type="button">Share</button>
        <button type="button">Save</button>
      </header>

      <section aria-label="Listing photo preview">
        <p>Photo gallery preview placeholder</p>
        <Link to="/photos" state={{ fromListing: true }}>
          Show all photos
        </Link>
      </section>

      <section aria-label="Listing details">
        <article>
          <h2>Entire rental unit hosted by Alex</h2>
          <p>4 guests · 2 bedrooms · 2 beds · 1 bath</p>
          <hr />
          <p>Placeholder host information</p>
          <hr />
          <h2>About this place</h2>
          <p>
            Placeholder description for the listing. The real copy and data will
            come from the static listing JSON in the next content stage.
          </p>
          <button type="button">Show more</button>
          <hr />
          <h2>What this place offers</h2>
          <ul>
            <li>Kitchen</li>
            <li>Wifi</li>
            <li>Dedicated workspace</li>
            <li>TV</li>
          </ul>
          <button type="button">Show all amenities</button>
        </article>

        <aside aria-label="Reservation card">
          <p>$180 night</p>
          <button type="button">Check in — Check out</button>
          <button type="button">Guests</button>
          <button type="button">Reserve</button>
          <p>You won&apos;t be charged yet</p>
          <p>$360 x 2 nights</p>
          <p>Service fee</p>
          <p>Total before taxes</p>
        </aside>
      </section>

      <section aria-label="Reviews">
        <h2>★ 4.92 · 124 reviews</h2>
        <p>Review content placeholder</p>
      </section>

      <section aria-label="Location">
        <h2>Where you&apos;ll be</h2>
        <p>Lisbon, Portugal</p>
        <div aria-label="Map placeholder">Map placeholder</div>
      </section>

      <section aria-label="Host information">
        <h2>Meet your host</h2>
        <p>Host card placeholder</p>
      </section>

      <section aria-label="Things to know">
        <h2>Things to know</h2>
        <p>House rules · Safety & property · Cancellation policy</p>
      </section>
    </main>
  );
}

function ListingLayout() {
  return (
    <>
      <ListingPage />
      <Outlet />
    </>
  );
}

function Overlay({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  function closeOverlay() {
    // A route opened from this listing returns to it with the browser history.
    // A directly loaded photo URL still has a reliable close destination.
    if (location.state?.fromListing) {
      navigate(-1);
      return;
    }

    navigate("/");
  }

  return (
    <div role="dialog" aria-modal="true" aria-label="Photo viewer">
      <button type="button" onClick={closeOverlay}>
        Close
      </button>
      {children}
    </div>
  );
}

function PhotoTour() {
  const location = useLocation();
  const photoIds = ["1", "2", "3", "4", "5", "6"];

  return (
    <Overlay>
      <h2>Photo tour</h2>
      <p>All photos · placeholder gallery</p>
      <ul>
        {photoIds.map((photoId) => (
          <li key={photoId}>
            <Link to={`/photos/${photoId}`} state={{ fromListing: true }}>
              Photo {photoId}
            </Link>
          </li>
        ))}
      </ul>
      <p>Current route: {location.pathname}</p>
    </Overlay>
  );
}

function Lightbox() {
  const { photoId } = useParams();
  const navigate = useNavigate();

  return (
    <Overlay>
      <h2>Lightbox</h2>
      <p>Showing placeholder photo {photoId}</p>
      <button type="button">Previous photo</button>
      <button type="button">Next photo</button>
      <button type="button" onClick={() => navigate(-1)}>
        Back to photo tour
      </button>
    </Overlay>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<ListingLayout />}>
        <Route index element={null} />
        <Route path="photos" element={<PhotoTour />} />
        <Route path="photos/:photoId" element={<Lightbox />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
