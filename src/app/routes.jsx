import { Navigate, Route, Routes } from "react-router-dom";
import { GalleryPage } from "../features/gallery/GalleryPage";
import { ListingPage } from "../features/listing/ListingPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ListingPage />} />
      <Route path="/listings/:listingId/photos" element={<GalleryPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
