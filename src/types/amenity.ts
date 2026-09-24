export interface Amenity {
  /** Reference renders unavailable amenities greyed with the label struck through. */
  unavailable?: boolean;
  id: string;
  name: string;
  description?: string;
  /** Icon identifier, resolved once the UI/icon set is implemented. */
  iconId?: string;
}

/** One group in the reference's "What this place offers" dialog. */
export interface AmenityCategory {
  id: string;
  label: string;
  amenities: Amenity[];
}
