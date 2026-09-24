import type { Review, ReviewTag } from '../types';

/**
 * The six guest reviews shown on the listing. Reviewers without a photo
 * render a tinted initial disc instead.
 */
export const REVIEWS: readonly Review[] = [
  {
    id: 'amit',
    authorName: 'Amit',
    initial: 'A',
    avatarBackground: 'rgb(247, 237, 226)',
    avatarColor: 'rgb(193, 133, 42)',
    tenure: '2 months on Airbnb',
    rating: 5,
    date: '1 week ago',
    text: 'Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.',
  },
  {
    id: 'aheesh',
    authorName: 'Aheesh',
    authorAvatarSrc: '/images/ui/rev1.jpeg',
    tenure: '3 years on Airbnb',
    rating: 5,
    date: '2 weeks ago',
    text: 'We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.',
  },
  {
    id: 'samiksha',
    authorName: 'Samiksha',
    authorAvatarSrc: '/images/ui/rev2.jpeg',
    tenure: '8 months on Airbnb',
    rating: 5,
    date: 'May 2026',
    text: 'the host nitish was really great help',
  },
  {
    id: 'vedant',
    authorName: 'Vedant',
    initial: 'V',
    avatarBackground: 'rgb(239, 234, 247)',
    avatarColor: 'rgb(139, 111, 196)',
    tenure: '4 years on Airbnb',
    rating: 5,
    date: 'May 2026',
    /* The reference separates these paragraphs with a single newline, not a
       blank line, so they render as consecutive lines under `pre-line`. */
    text: `We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine.
The highlight of our stay was definitely the jacuzzi. It was clean, well-kept, and the perfect place to relax after a day of exploring Goa. It added a luxurious touch to our vacation and made our experience even more memorable.
The property was exactly as described, well-equipped, and offered a peaceful atmosphere. We would highly recommend this place to anyone looking for a comfortable, clean, and relaxing stay in Goa. Looking forward to visiting again!`,
  },
  {
    id: 'vaibhav',
    authorName: 'Vaibhav S',
    authorAvatarSrc: '/images/ui/rev3.jpeg',
    tenure: '3 years on Airbnb',
    rating: 5,
    date: 'May 2026',
    text: "Great great experience living out there , can't expect more , will always look for it in the future and will recommend my friends too.",
  },
  {
    id: 'mohd',
    authorName: 'Mohd',
    authorAvatarSrc: '/images/ui/rev4.jpeg',
    tenure: '5 years on Airbnb',
    rating: 5,
    date: 'May 2026',
    text: 'Great place. Exactly as described in the listing.',
  },
];

/** The horizontally scrollable summary chips above the review list. */
export const REVIEW_TAGS: readonly ReviewTag[] = [
  { id: 'comfort', label: 'Comfort', count: 6, iconSrc: '/images/ui/comfort.png' },
  { id: 'accuracy', label: 'Accuracy', count: 5, iconSrc: '/images/ui/accuracy.png' },
  { id: 'hot-tub', label: 'Hot tub', count: 5, iconSrc: '/images/ui/hot-tub.png' },
  { id: 'condition', label: 'Condition', count: 4, iconSrc: '/images/ui/condition.png' },
  { id: 'hospitality', label: 'Hospitality', count: 8, iconSrc: '/images/ui/hospitality.png' },
  { id: 'cleanliness', label: 'Cleanliness', count: 4, iconSrc: '/images/ui/cleanliness.png' },
  { id: 'amenities', label: 'Amenities', count: 2, iconSrc: '/images/ui/amenities.png' },
  { id: 'decor', label: 'Decor', count: 2, iconSrc: '/images/ui/decor.png' },
  { id: 'indoor-spaces', label: 'Indoor spaces', count: 2, iconSrc: '/images/ui/indoor-spaces.png' },
  { id: 'location', label: 'Location', count: 2, iconSrc: '/images/ui/location.png' },
];
