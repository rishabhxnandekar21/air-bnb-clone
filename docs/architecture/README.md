# Frontend architecture

The app is organized by responsibility while it remains small:

- `app/` owns application composition and routing.
- `components/ui/` holds generic, product-agnostic primitives.
- `components/layout/` holds shared page chrome and layout containers.
- `features/` owns screen-specific behavior and components. Keep listing, gallery, and booking concerns separate.
- `data/` contains local fixture data only.
- `services/` is the boundary between features and data sources. Replace a fixture implementation with an API client here later.
- `lib/` contains dependency-free helpers and cross-app constants.
- `styles/` contains global rules and design tokens. Feature styles should live beside their feature when introduced.
- `assets/` stores committed, local images and icons. Remote asset URLs should stay in data records.

## Routing

`/` is reserved for the listing detail experience and `/listings/:listingId/photos` for its photo gallery. Components do not construct route strings directly; add route constants in `src/lib/routes.js` as routes grow.

## Data boundary

Features access listing records through `services/listingService.js`, not by importing `data/` directly. The present implementation is synchronous and in-memory by design; when a backend is introduced, preserve the service API or migrate it deliberately to async.
