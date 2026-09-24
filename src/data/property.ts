import type { Property } from '../types';

/**
 * Canonical, single source of truth for the listing's static content.
 * Every field is the listing's own content — nothing here is invented or
 * extrapolated beyond what the listing states. The one
 * addition is `coordinates`, the real published location of Candolim, Goa,
 * which is accurate but currently unused (see the note on the field).
 *
 * The optional fields on `Property` (description, reviews, houseRules,
 * safetyItems) are deliberately absent: that text exists only on
 * the reference, which is currently unreachable, and inventing it for a
 * real property is out of bounds (DECISIONS.md #12). Their components are
 * built and render nothing until the real text is supplied here.
 */
export const PROPERTY: Property = {
  id: 'mirashya-ug10',
  title: 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10',
  location: 'Candolim, Goa, India',
  locationNotice: 'Exact location will be provided after booking.',
  propertyType: 'Entire serviced apartment',
  shortLocation: 'Candolim, India',
  guestFavouriteNote: 'One of the most loved homes on Airbnb, according to guests',
  guestFavouriteBlurb: 'This home is a guest favourite based on ratings, reviews and reliability',
  neighbourhoodHighlight:
    'Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.',
  houseRules: ['Check-in after 2:00 pm', 'Checkout before 11:00 am', '3 guests maximum'],
  safetyItems: [
    'Carbon monoxide alarm not reported',
    'Smoke alarm not reported',
    'Exterior security cameras on property',
  ],
  cancellationDetails: [
    'Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.',
    'Review this host’s full policy for details.',
  ],
  rating: {
    overall: 4.95,
    reviewCount: 19,
    breakdown: {
      cleanliness: 5.0,
      accuracy: 5.0,
      checkIn: 5.0,
      communication: 5.0,
      location: 4.8,
      value: 4.8,
    },
    /* Bar widths for 5,4,3,2,1 stars. */
    distribution: [95, 5, 0, 0, 0],
  },
  /* The listing's own description, unedited. */
  description:
    '🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it’s ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️🌴',
  features: [
    {
      id: 'outdoor-entertainment',
      title: 'Outdoor entertainment',
      description: 'The pool and alfresco dining are great for summer trips.',
    },
    {
      id: 'designed-for-staying-cool',
      title: 'Designed for staying cool',
      description: 'Beat the heat with the A/C and ceiling fan.',
    },
    {
      id: 'self-check-in',
      title: 'Self check-in',
      description: 'You can check in with the building staff.',
    },
  ],
  sleepingArrangements: [
    { room: 'Bedroom', description: '1 double bed' },
    { room: 'Living room', description: '1 sofa' },
  ],
  amenities: [
    { id: 'kitchen', name: 'Kitchen' },
    { id: 'wifi', name: 'Wifi' },
    { id: 'dedicated-workspace', name: 'Dedicated workspace' },
    { id: 'free-parking-on-premises', name: 'Free parking on premises' },
    { id: 'pool', name: 'Pool' },
    { id: 'hot-tub', name: 'Hot tub' },
    { id: 'pets-allowed', name: 'Pets allowed' },
    { id: 'exterior-security-cameras-on-property', name: 'Exterior security cameras on property' },
    { id: 'carbon-monoxide-alarm', name: 'Carbon monoxide alarm', unavailable: true },
    { id: 'smoke-alarm', name: 'Smoke alarm', unavailable: true },
  ],
  host: {
    name: 'Mirashya Homes',
    avatarSrc: '/images/ui/host.jpeg',
    reviewCount: 1463,
    rating: 4.68,
    yearsHosting: 2,
    bornDecade: 'Born in the 80s',
    school: 'NICMAR GOA',
    responseRatePercent: 100,
    responseTime: 'Responds within an hour',
    coHosts: [
      { id: 'sharath', name: 'Sharath', avatarSrc: '/images/ui/co1.jpg' },
      { id: 'aman', name: 'Aman Dev Pahwa', avatarSrc: '/images/ui/co2.jpg' },
      { id: 'maria', name: 'Maria Karen Priyanka', avatarSrc: '/images/ui/co3.jpg' },
      { id: 'simran', name: 'Simran', avatarSrc: '/images/ui/rev5.jpeg' },
      { id: 'pallavi', name: 'Pallavi', avatarSrc: '/images/ui/rev1.jpeg' },
      { id: 'sanyukta', name: 'Sanyukta', avatarSrc: '/images/ui/rev2.jpeg' },
      {
        id: 'shruti',
        name: 'Shruti',
        initial: 'S',
        avatarBackground: 'rgb(253, 231, 239)',
        avatarColor: 'rgb(212, 53, 110)',
      },
      {
        id: 'amisha',
        name: 'Amisha',
        initial: 'A',
        avatarBackground: 'rgb(231, 240, 253)',
        avatarColor: 'rgb(58, 110, 204)',
      },
    ],
  },
  booking: {
    totalPrice: 28499,
    currency: 'INR',
    nights: 5,
    checkIn: '2026-10-18',
    checkOut: '2026-10-23',
    guestCount: 2,
    unavailableDates: [
      '2026-11-18',
      '2026-11-19',
      '2026-11-20',
      '2026-11-21',
      '2026-11-22',
      '2026-11-23',
      '2026-11-24',
      '2026-11-29',
      '2026-11-30',
    ],
    cancellation: {
      label: 'Free cancellation before',
      deadline: '17 October',
    },
  },
  /* Occupancy and the offer banner are read off the reference's own
     listing-intro block, not extrapolated. */
  capacity: {
    guests: 3,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
  },
  promotion: {
    headline: 'Get 10% off your next stay.',
    termsLabel: 'Terms apply',
    actionLabel: 'Claim',
  },
  /* Candolim's real published position. The reference draws a stylised map
     rather than a geographic one, so nothing reads this today — it is kept
     because it is true of the listing and would be needed by any real map. */
  coordinates: { lat: 15.5185, lng: 73.7625 },
};
