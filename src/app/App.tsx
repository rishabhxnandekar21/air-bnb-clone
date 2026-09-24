import { AMENITY_CATEGORIES } from '../data';
import { Header } from '../components/header/Header';
import { ListingPage } from '../components/listing/ListingPage';
import { PhotoTour } from '../components/photo-tour/PhotoTour';
import { Lightbox } from '../components/lightbox/Lightbox';
import { AmenitiesModal } from '../components/amenities/AmenitiesModal';
import { useNavState } from '../hooks/useNavState';

export function App() {
  const { navState, navigate, goBack } = useNavState();
  const isPhotoTourOpen = navState.modal === 'PHOTO_TOUR_SCROLLABLE';
  const isAmenitiesOpen = navState.modal === 'AMENITIES';
  const lightboxIndex = navState.lightboxIndex;

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <ListingPage
          onShowAllPhotos={() => navigate({ modal: 'PHOTO_TOUR_SCROLLABLE', lightboxIndex: null })}
          onShowAllAmenities={() => navigate({ modal: 'AMENITIES', lightboxIndex: null })}
          onSelectPhoto={(index) => navigate({ modal: 'PHOTO_TOUR_SCROLLABLE', lightboxIndex: index })}
        />
      </main>
      {isPhotoTourOpen && (
        <PhotoTour
          onClose={goBack}
          onSelectPhoto={(index) => navigate({ modal: 'PHOTO_TOUR_SCROLLABLE', lightboxIndex: index })}
        />
      )}
      {lightboxIndex !== null && (
        <Lightbox
          currentIndex={lightboxIndex}
          onClose={goBack}
          onNavigate={(index) =>
            navigate({ modal: 'PHOTO_TOUR_SCROLLABLE', lightboxIndex: index }, { replace: true })
          }
        />
      )}
      {isAmenitiesOpen && <AmenitiesModal categories={AMENITY_CATEGORIES} onClose={goBack} />}
    </>
  );
}
