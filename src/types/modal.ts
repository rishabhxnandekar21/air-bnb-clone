export type ModalKind = 'PHOTO_TOUR_SCROLLABLE' | 'AMENITIES';

export interface ModalState {
  modal: ModalKind | null;
}

export interface LightboxState {
  isOpen: boolean;
  activeIndex: number;
}
