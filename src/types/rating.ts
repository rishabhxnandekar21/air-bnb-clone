export interface Rating {
  overall: number;
  reviewCount: number;
  /** Per-category scores shown as columns beside the overall distribution. */
  breakdown?: RatingBreakdown;
  /** Percentage bar widths for 5,4,3,2,1 stars, highest first. */
  distribution?: readonly number[];
}

export interface RatingBreakdown {
  cleanliness: number;
  accuracy: number;
  checkIn: number;
  communication: number;
  location: number;
  value: number;
}

export interface Review {
  id: string;
  authorName: string;
  /** Photo when the reviewer has one; otherwise `initial` renders a tinted disc. */
  authorAvatarSrc?: string;
  initial?: string;
  avatarBackground?: string;
  avatarColor?: string;
  /** e.g. "3 years on Airbnb". */
  tenure: string;
  rating: number;
  date: string;
  text: string;
}

/** One of the tappable summary chips above the review list. */
export interface ReviewTag {
  id: string;
  label: string;
  count: number;
  iconSrc: string;
}
