import { Button } from "../ui/Button";
import "./PhotoGallery.css";

function GalleryIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <rect height="5" rx="0.75" width="5" x="3" y="3" />
      <rect height="5" rx="0.75" width="5" x="16" y="3" />
      <rect height="5" rx="0.75" width="5" x="3" y="16" />
      <rect height="5" rx="0.75" width="5" x="16" y="16" />
    </svg>
  );
}

function GalleryImage({ image, className, priority = false }) {
  return (
    <img
      alt={image.alt}
      className={className}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      loading={priority ? "eager" : "lazy"}
      src={image.src}
    />
  );
}

export function PhotoGallery({ images }) {
  const [primaryImage, ...secondaryImages] = images;

  if (images.length < 5) {
    return null;
  }

  return (
    <section aria-label="Property photos" className="photo-gallery">
      <GalleryImage className="photo-gallery__image photo-gallery__image--primary" image={primaryImage} priority />
      <div className="photo-gallery__secondary">
        {secondaryImages.slice(0, 4).map((image, index) => (
          <GalleryImage
            className={`photo-gallery__image photo-gallery__image--secondary photo-gallery__image--${index + 2}`}
            image={image}
            key={image.id}
          />
        ))}
      </div>
      <Button aria-label="Show all photos" className="photo-gallery__all-photos">
        <GalleryIcon />
        <span>Show all photos</span>
      </Button>
    </section>
  );
}
