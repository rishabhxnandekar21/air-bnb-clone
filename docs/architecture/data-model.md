# Listing data model

Each listing record has a stable `id` and URL-safe `slug`, then groups related values under `location`, `capacity`, `rating`, and `pricing`. Images use a stable image `id`, descriptive `alt` text, and an optional `src` so image assets can be connected later without changing gallery contracts.

Use ISO date strings for any future availability or reservation fields and store monetary values as integer minor units (for INR, paise) before introducing real checkout logic. The current `nightlyRate` is retained from the legacy fixture and should be normalized when booking calculations become user-facing.
