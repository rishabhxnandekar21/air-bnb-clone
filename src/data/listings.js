import bedroomImage from "../assets/images/candolim-bedroom.jpg";
import livingRoomImage from "../assets/images/candolim-living-room.jpg";
import loungeImage from "../assets/images/candolim-lounge.jpg";
import poolImage from "../assets/images/candolim-pool.jpg";
import terraceImage from "../assets/images/candolim-terrace.jpg";
import hostImage from "../assets/images/mirashya-host.jpg";

export const listings = [
  {
    id: "listing-1",
    slug: "romantic-jacuzzi-1bhk-candolim",
    title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
    propertyType: "Entire serviced apartment",
    location: { city: "Candolim", country: "India" },
    capacity: { guests: 3, bedrooms: 1, beds: 1, bathrooms: 1 },
    rating: { value: 4.95, reviewCount: 19, isGuestFavourite: true },
    host: {
      name: "Mirashya Homes",
      yearsHosting: 2,
      verified: true,
      responseRate: 100,
      image: hostImage
    },
    pricing: { nightlyRate: 28499, currency: "INR", defaultNights: 5 },
    favourite: {
      description: "One of the most loved homes on Airbnb, according to guests."
    },
    highlights: [
      {
        icon: "outdoor",
        title: "Outdoor entertainment",
        description: "The pool and alfresco dining are great for summer trips."
      },
      {
        icon: "cool",
        title: "Designed for staying cool",
        description: "Beat the heat with the A/C and ceiling fan."
      },
      {
        icon: "check-in",
        title: "Self check-in",
        description: "You can check in with the building staff."
      }
    ],
    translationNotice: "Some info has been automatically translated.",
    booking: {
      offer: {
        message: "Get 10% off your next stay.",
        terms: "Terms apply.",
        action: "Claim"
      },
      checkIn: "18/10/2026",
      checkOut: "23/10/2026",
      guests: "2 guests",
      cancellation: "Free cancellation before 17 October."
    },
    images: [
      {
        id: "img-1",
        room: "Living room 1",
        alt: "Warm modern living room with a view of a tropical garden",
        src: livingRoomImage
      },
      {
        id: "img-2",
        room: "Living room 2",
        alt: "Bright lounge with natural wood and neutral furnishings",
        src: loungeImage
      },
      {
        id: "img-3",
        room: "Jacuzzi",
        alt: "Outdoor poolside seating surrounded by greenery",
        src: poolImage
      },
      {
        id: "img-4",
        room: "Bedroom",
        alt: "Serene bedroom with a large bed and soft linens",
        src: bedroomImage
      },
      {
        id: "img-5",
        room: "Exterior",
        alt: "Contemporary exterior with a shaded terrace",
        src: terraceImage
      }
    ],
    sleepingArrangements: [
      {
        id: "bedroom",
        title: "Bedroom",
        description: "1 double bed",
        image: bedroomImage
      },
      {
        id: "living-room",
        title: "Living room",
        description: "1 sofa",
        image: loungeImage
      }
    ],
    amenities: ["Kitchen", "Wifi", "Dedicated workspace", "Free parking on premises", "Pool", "Hot tub", "Pets allowed"],
    description: "Cozy 1BHK in Candolim with a private jacuzzi, designed for a relaxed North Goa stay."
  }
];
