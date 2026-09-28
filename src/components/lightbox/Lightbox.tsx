import { useEffect, useRef } from 'react';
import { PHOTOS } from '../../data';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useOverlayFocus } from '../../hooks/useOverlayFocus';
import { LightboxHeader } from './LightboxHeader';
import { LightboxControls } from './LightboxControls';
import { LightboxImage } from './LightboxImage';
import styles from './Lightbox.module.css';

interface LightboxProps {
  currentIndex: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
}

function isTextInput(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  return target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
}

export function Lightbox({ currentIndex, onNavigate, onClose }: LightboxProps) {
  const photo = PHOTOS[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < PHOTOS.length - 1;
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock();
  // Always the topmost layer while mounted, so it owns Escape: closing it
  // must unwind exactly one history entry and leave the tour open beneath.
  useOverlayFocus(overlayRef, closeButtonRef, { onEscape: onClose });

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isTextInput(event.target)) {
        return;
      }
      if (event.key === 'ArrowLeft' && hasPrevious) {
        event.preventDefault();
        onNavigate(currentIndex - 1);
      } else if (event.key === 'ArrowRight' && hasNext) {
        event.preventDefault();
        onNavigate(currentIndex + 1);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, hasPrevious, hasNext, onNavigate]);

  if (!photo) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      tabIndex={-1}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <LightboxHeader
        photo={photo}
        position={currentIndex + 1}
        total={PHOTOS.length}
        onClose={onClose}
        closeButtonRef={closeButtonRef}
      />
      <LightboxImage photo={photo} />
      <LightboxControls
        hasPrevious={hasPrevious}
        hasNext={hasNext}
        onPrevious={() => onNavigate(currentIndex - 1)}
        onNext={() => onNavigate(currentIndex + 1)}
      />
    </div>
  );
}
