import { useEffect, useRef } from 'react';
import { PHOTOS } from '../../data';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
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
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useBodyScrollLock();

  // Capture the trigger element once on mount, focus the dialog, and
  // restore focus to the trigger on unmount — independent of how many
  // times `currentIndex` changes while the Lightbox stays open.
  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();
    return () => {
      previouslyFocusedRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isTextInput(event.target)) {
        return;
      }
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft' && hasPrevious) {
        event.preventDefault();
        onNavigate(currentIndex - 1);
      } else if (event.key === 'ArrowRight' && hasNext) {
        event.preventDefault();
        onNavigate(currentIndex + 1);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, hasPrevious, hasNext, onNavigate, onClose]);

  if (!photo) {
    return null;
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Photo viewer">
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
