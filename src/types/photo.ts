export type PhotoCategory =
  | 'living-room-1'
  | 'living-room-2'
  | 'full-kitchen'
  | 'bedroom'
  | 'full-bathroom'
  | 'gym'
  | 'exterior'
  | 'pool'
  | 'additional-photos';

export interface Photo {
  readonly index: number;
  readonly id: string;
  readonly category: PhotoCategory;
  readonly categoryLabel: string;
  readonly src: string;
  readonly alt: string;
}
