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
      { icon: "outdoor", title: "Outdoor entertainment", description: "The pool and alfresco dining are great for summer trips." },
      { icon: "cool", title: "Designed for staying cool", description: "Beat the heat with the A/C and ceiling fan." },
      { icon: "check-in", title: "Self check-in", description: "You can check in with the building staff." }
    ],
    translationNotice: "Some info has been automatically translated.",
    booking: {
      offer: { message: "Get 10% off your next stay.", terms: "Terms apply.", action: "Claim" },
      checkIn: "18/10/2026",
      checkOut: "23/10/2026",
      guests: "2 guests",
      cancellation: "Free cancellation before 17 October."
    },
    images: [
      { id: "img-1", room: "Living room 1", alt: "Warm modern living room with a view of a tropical garden", src: livingRoomImage },
      { id: "img-2", room: "Living room 2", alt: "Bright lounge with natural wood and neutral furnishings", src: loungeImage },
      { id: "img-3", room: "Jacuzzi", alt: "Outdoor poolside seating surrounded by greenery", src: poolImage },
      { id: "img-4", room: "Bedroom", alt: "Serene bedroom with a large bed and soft linens", src: bedroomImage },
      { id: "img-5", room: "Exterior", alt: "Contemporary exterior with a shaded terrace", src: terraceImage }
    ],
    sleepingArrangements: [
      { id: "bedroom", title: "Bedroom", description: "1 double bed", image: bedroomImage },
      { id: "living-room", title: "Living room", description: "1 sofa", image: loungeImage }
    ],
    amenities: ["Kitchen", "Wifi", "Dedicated workspace", "Free parking on premises", "Pool", "Hot tub", "Pets allowed"],
    reviews: {
      rating: 4.95,
      reviewCount: 19,
      categories: [
        { label: "Comfort", count: 6, icon: "🛏️" },
        { label: "Accuracy", count: 5, icon: "✅" },
        { label: "Hot tub", count: 5, icon: "🛁" },
        { label: "Condition", count: 4, icon: "🧼" },
        { label: "Hospitality", count: 8, icon: "🎁" },
        { label: "Cleanliness", count: 4, icon: "🧴" },
        { label: "Amenities", count: 2, icon: "🛋️" }
      ],
      breakdown: [
        { label: "Cleanliness", value: 5.0, icon: "♧" },
        { label: "Accuracy", value: 5.0, icon: "✓" },
        { label: "Check-in", value: 5.0, icon: "⌕" },
        { label: "Communication", value: 5.0, icon: "□" },
        { label: "Location", value: 4.8, icon: "▱" },
        { label: "Value", value: 4.8, icon: "◇" }
      ],
      items: [
        { id: "review-1", name: "Amit", membership: "2 months on Airbnb", date: "1 week ago", avatar: null, text: "Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.", showMore: false },
        { id: "review-2", name: "Aheesh", membership: "3 years on Airbnb", date: "2 weeks ago", avatar: null, text: "We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.", showMore: true },
        { id: "review-3", name: "Samiksha", membership: "8 months on Airbnb", date: "May 2026", avatar: null, text: "the host nitish was really great help", showMore: false },
        { id: "review-4", name: "Vedant", membership: "4 years on Airbnb", date: "May 2026", avatar: null, text: "We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine.", showMore: true },
        { id: "review-5", name: "Vaibhav S", membership: "1 year on Airbnb", date: "April 2026", avatar: null, text: "Great property and very comfortable stay. Everything was well maintained and the host was helpful.", showMore: false },
        { id: "review-6", name: "Mohd", membership: "2 years on Airbnb", date: "April 2026", avatar: null, text: "The property was clean and comfortable. We enjoyed our stay and would definitely recommend it.", showMore: false }
      ]
    },
    description: "Cozy 1BHK in Candolim with a private jacuzzi, designed for a relaxed North Goa stay."
  }
];
