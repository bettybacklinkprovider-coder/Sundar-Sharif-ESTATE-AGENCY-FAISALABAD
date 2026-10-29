import avatarHasnainShah from '../assets/images/avatar_hasnain_shah_1793275900960.jpg';
import avatarTayyabTariq from '../assets/images/avatar_tayyab_tariq_1793275902700.jpg';
import avatarSaqibSaleem from '../assets/images/avatar_saqib_saleem_1793275902736.jpg';

export { avatarHasnainShah, avatarTayyabTariq, avatarSaqibSaleem };

export interface Property {
  id: string;
  title: string;
  location: string;
  locationKey: string;
  type: 'villa' | 'penthouse' | 'waterfront' | 'mansion';
  priceDisplay: string;
  priceSuffix?: string;
  priceValue: number;
  priceBracket: '2.5m-5m' | '5m-12m' | '12m+';
  status: 'For Sale' | 'Exclusive' | 'For Rent';
  statusVariant: 'primary' | 'secondary';
  beds: number;
  baths: number;
  sqft: string;
  image: string;
  alt: string;
  architect: string;
  yearBuilt: number;
  lotSize: string;
  description: string;
  features: string[];
  featured: boolean;
}

export const BUSINESS_INFO = {
  name: 'Sundar Sharif Estate Agency',
  shortName: 'Sundar Sharif',
  tagline: 'ESTATE AGENCY · FAISALABAD',
  category: 'Real estate agency',
  rating: 3.4,
  reviewCount: 5,
  address: 'Amin Town, Faisalabad, Pakistan',
  plusCode: 'C4WH+4G Faisalabad, Pakistan',
  phone: '+92 41 8755511',
  phoneHref: 'tel:+92418755511',
  email: 'info@sundarsharifestate.pk',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Sundar+Sharif+Estate+Agency+Amin+Town+Faisalabad+Pakistan',
};

export interface GoogleReview {
  id: string;
  author: string;
  badge: string;
  timeAgo: string;
  rating: number;
  text: string;
  likes: number;
  avatar: string;
}

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'hasnain-shah',
    author: 'hasnain shah',
    badge: 'Local Guide · 43 reviews · 20 photos',
    timeAgo: '9 years ago',
    rating: 5,
    text: 'Provides good and professional services in real estate.',
    likes: 1,
    avatar: avatarHasnainShah,
  },
  {
    id: 'tayyab-tariq',
    author: 'Tayyab Tariq',
    badge: 'Local Guide · 154 reviews · 8 photos',
    timeAgo: '7 years ago',
    rating: 5,
    text: 'Awesome',
    likes: 1,
    avatar: avatarTayyabTariq,
  },
  {
    id: 'muhammad-saqib-saleem',
    author: 'Muhammad Saqib Saleem (Sheikh Saqib)',
    badge: 'Local Guide · 127 reviews · 78 photos',
    timeAgo: '4 years ago',
    rating: 3,
    text: "It's Ok, But Unprofessional Behavior, Like A Lay Man.",
    likes: 1,
    avatar: avatarSaqibSaleem,
  },
];

export interface NearbyAgency {
  name: string;
  rating: string;
  reviews: string;
  category: string;
}

export const PEOPLE_ALSO_SEARCH_FOR: NearbyAgency[] = [
  {
    name: 'Ahmed Estate Agency',
    rating: '3.0',
    reviews: '(1)',
    category: 'Real estate agency',
  },
  {
    name: 'Al-Barkat Estate Developers',
    rating: '3.5',
    reviews: '(2)',
    category: 'Real estate agency',
  },
  {
    name: 'Ashraf Estate',
    rating: '5.0',
    reviews: '(2)',
    category: 'Real estate agency',
  },
  {
    name: 'Javed Estate Agency',
    rating: 'No reviews',
    reviews: '',
    category: 'Real estate agency',
  },
  {
    name: 'Sheikh & Awan Estate Agency',
    rating: '5.0',
    reviews: '(1)',
    category: 'Real estate agency',
  },
];

export const HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCTl-hQ9c9K4_tpALxF_yi82VslbCufRuKl-QYhToYx9M9n4AxSiSiKTARFi02BplwLs8XFe7Z7j6G7BIJWlTzxm2NoVBcQyRUFGr6oCzamVBqf5rgZ1MooTHC7bPJcjqiSQSIeWiqWebEh8vDhT08E-PaLr3O-j4PcpMotTqcepTcd3IYIFZl7DG77VSMNikKNQwR6EOvi8_gdG3miQh7sqDaRwdLQEMbwRUmOxRAqu-11W9qavT2x8w';

export const ABOUT_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAUrfhoMBqfHsinR2zMF4OW6VXQlPVgJJU_hxyvHm7ykBgatiNUBkpLUDNaqx3Ax-l0hZ2Md6mojAuK_d1ogIz4ms1354CYOqC-tmvxRVGnARcwwFAMM84IXyPlaYiRIi-0hS23fk2-24QQiKx9N3e-cQ7hi2ctCBVnQnvbMkkMwXYQxlf8buV66qjHcjexw9PvZmIQRlGhtDrb5AY0dnU0OT481sd86VBS7JkWnoN5IJe8pVRM3J-mRQ';

export const CTA_VILLA_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDSmULTb9pmkYl0xw9VgQ0ttQr75d9KibUnb6_535RaN4RQyNa7QiGTZy5Z2EYfmocNRIaxooUg9qFt7TJbGk2dT_Gp9Cp6REg-jUmvfLh-wo6_Lr7Vz_eV2d5u1TmNNgbwrVZeY-UyWk4-2puZ3Wg4h8TUJbr2ClUI6tceuQ5pL6ygv-_nQ3Xf0OE_SaayjlUsErG3EXNyh05GzhxJg2QDwwKhc_tTlMyrnr-8GBP-9wwSaJkaTbl1nw';

export const PROPERTIES: Property[] = [
  {
    id: 'villa-seraphina',
    title: 'Amin Town Signature Villa',
    location: 'Amin Town, Faisalabad',
    locationKey: 'amin-town',
    type: 'villa',
    priceDisplay: 'PKR 6.85 Crore',
    priceValue: 14850000,
    priceBracket: '12m+',
    status: 'For Sale',
    statusVariant: 'primary',
    beds: 6,
    baths: 7,
    sqft: '1 Kanal (4,500 sq.ft)',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDK0pMAfnE2hI4E-PUqOqY9Omvno4-bXKTMwiSo_ilf6lR12JCATfbMl1-m2khDrJTJ30p4OKQTlEVyMvhfVOnl-EVZ1dhNraaAcGn4xizEWNyf13v5nRgxOktKn1PvgBzbX3FyPq_9OanaptH8QBwJExL6ABV7WnPUrpvCyJ8O4GoILM0K2Zburq9nJB8O6uVFfFYftVk62FGNhYY2zu0v0mQD2scBO2_WGJ9S0Z9fTh6V1C-rcEk-Xw',
    alt: 'Amin Town Signature Villa in Faisalabad: ultra-modern architectural estate at golden hour with reflection pool and manicured gardens',
    architect: 'Sundar Sharif Design Associates',
    yearBuilt: 2025,
    lotSize: '1 Kanal Corner',
    description:
      'Located in a prime block of Amin Town, Faisalabad (near C4WH+4G), this newly constructed designer 1-Kanal residence features double-height formal drawing salons, imported Spanish porcelain tilework, solid ashwood cabinetry, and a landscaped terrace.',
    features: [
      'Prime Amin Town Corner Plot Location',
      'Double-Unit Architectural Layout',
      '15kW Hybrid Solar Net-Metering Installed',
      'Imported Spanish & Italian Bath Fittings',
      'Servant Quarters & 3-Car Covered Porch',
      'Verified FDA / Registry Documentation',
    ],
    featured: true,
  },
  {
    id: 'azure-penthouse',
    title: 'Canal Road Luxury Penthouse',
    location: 'Canal Road, Faisalabad',
    locationKey: 'canal-road',
    type: 'penthouse',
    priceDisplay: 'PKR 4.20 Crore',
    priceValue: 8900000,
    priceBracket: '5m-12m',
    status: 'For Sale',
    statusVariant: 'primary',
    beds: 4,
    baths: 5,
    sqft: '3,800 sq.ft',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBA-5_aTXrBK4nu8v860g9CL6o-0EzDbofUlubTYlAU5cuGI-Z8gu40AX2h30iW8BHT4xTHY77U8RBI7t0IhBeYxUqohwww9ksEbontLvg9qQ4r_hpkdHOD8m3LDFKCgcmzdRBEe-ljaOGUSXCFebB1vIV206yJ2ziw-e3IGKnvJE21XoB6wdsriLkQsVzjiZmHchDqDxOPCUL-OaE-f-bmBoSBEPYoQ7oEI1NSx0lBlKQQtHfAoGkSkw',
    alt: 'Canal Road Luxury Penthouse in Faisalabad: panoramic private rooftop terrace with travertine marble slabs and glass perimeter railings',
    architect: 'Lyallpur Modern Architects',
    yearBuilt: 2024,
    lotSize: '3,800 sq.ft Covered',
    description:
      'Overlooking the lush green belt of Main Canal Road near Amin Town, this luxury duplex penthouse offers a private rooftop terrace, dedicated high-speed elevator foyer, and panoramic views of Faisalabad’s skyline.',
    features: [
      'Private Landscaped Rooftop Sky Deck',
      'Dedicated High-Speed Capsule Elevator',
      '24/7 Gated Security & Standby Generators',
      '2 Reserved Underground Parking Bays',
      'Italian Modular Kitchen & Dirty Kitchen',
      'Minutes from Kashmir Bridge & Kohinoor City',
    ],
    featured: true,
  },
  {
    id: 'highland-crest-estate',
    title: 'Wapda City Executive Mansion',
    location: 'Wapda City, Faisalabad',
    locationKey: 'wapda-city',
    type: 'mansion',
    priceDisplay: 'PKR 5.90 Crore',
    priceValue: 12500000,
    priceBracket: '12m+',
    status: 'Exclusive',
    statusVariant: 'secondary',
    beds: 5,
    baths: 6,
    sqft: '20 Marla (4,200 sq.ft)',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC29Dsd-BpO4Qgk57jy1iYBXCXGgi5FeCcTkFs40pCuHLo9XeBzD6B98idPhPw2bWFAq0QCs4Jtcef8bClaS8RDz7OrI2gHEimSzObeOq1mhHHZ42g-MNRVWuuWpU4PCm2kxP3WmU9U5r43x2J15VLOPWFQYlYxORuuks0XAM82HU9wx8zUyIYZ6SwR7BjgCgvyG1UlbskD09PvEpTMBKVoGtBruqiJ-pBBQHDcGweVlLeEweCakhC8lA',
    alt: 'Wapda City Executive Mansion in Faisalabad: warm stone and timber-framed modern mansion with cathedral windows and outdoor fire lounge',
    architect: 'Premier Habitat Studio',
    yearBuilt: 2024,
    lotSize: '20 Marla Park-Facing',
    description:
      'Exclusively listed with Sundar Sharif Estate Agency, this park-facing 20-Marla architectural residence combines natural travertine stone cladding with warm timber accents and a private basement home theater.',
    features: [
      'Direct Park-Facing Boulevard Location',
      'Full Basement Lounge & Media Room',
      'Central Heating & Inverter HVAC System',
      'Solid Teak Doors & Wardrobes',
      'Outdoor Gazebo & Barbecue Patio',
      'Immediate Possession Available',
    ],
    featured: true,
  },
  {
    id: 'palm-sanctuary-villa',
    title: 'Amin Town Commercial & Villa Annex',
    location: 'Amin Town, Faisalabad',
    locationKey: 'amin-town',
    type: 'waterfront',
    priceDisplay: 'PKR 225,000',
    priceSuffix: '/ mo',
    priceValue: 4800000,
    priceBracket: '2.5m-5m',
    status: 'For Rent',
    statusVariant: 'primary',
    beds: 5,
    baths: 6,
    sqft: '14 Marla (3,400 sq.ft)',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAV9goWu8TehHJlBincPZxXle2_i-pQ_4sRQIr9QPVVmyd30Q8UwRRuVD2_VQY_Ky3dvU-6RTADDwTgsBziyFeQdbpNFPayG2DnLk98OHckGEmdQtfwaribNDLQ6Lec9kwd93J6DAiFCHAhUkysjKmkcrqFfIQ0jGakbwHH0mAEYgveOm2fdaHkTpzpmbp5YECeR8nTsDdQwi9oev-63xUXMFj_NAwrtxZ-eg7vo1EIddwPK8jraTuqkw',
    alt: 'Amin Town Villa in Faisalabad: lush courtyard estate featuring royal palms, white limestone archways, and private patio lounge',
    architect: 'Sundar Sharif Advisory',
    yearBuilt: 2023,
    lotSize: '14 Marla Main Boulevard',
    description:
      'Situated in the heart of Amin Town, Faisalabad, this versatile executive residence is ideal for corporate families or multinational regional offices. Features independent floor access, spacious lawn, and high-ceiling reception halls.',
    features: [
      'Walking Distance to Main Amin Town Market',
      'Independent Dual-Portion Entry',
      'Lush Private Courtyard & Lawn',
      '3-Phase Commercial-Grade Electricity',
      'Dedicated Guard Room & CCTV Surveillance',
      'Managed by Sundar Sharif Estate Agency',
    ],
    featured: true,
  },
  {
    id: 'cap-ferrat-peninsula',
    title: 'Kohinoor City Boulevard Estate',
    location: 'Kohinoor City, Faisalabad',
    locationKey: 'kohinoor-city',
    type: 'waterfront',
    priceDisplay: 'PKR 9.50 Crore',
    priceValue: 19400000,
    priceBracket: '12m+',
    status: 'Exclusive',
    statusVariant: 'secondary',
    beds: 7,
    baths: 8,
    sqft: '2 Kanal (8,500 sq.ft)',
    image: CTA_VILLA_IMAGE,
    alt: 'Sun-drenched architectural villa facade with cascading travertine steps, tall glass pivot doors, lush landscaping and clear sky',
    architect: 'ArchVision Pakistan',
    yearBuilt: 2025,
    lotSize: '2 Kanal Prime',
    description:
      'Available strictly via private mandate at Sundar Sharif Estate Agency (+92 41 8755511), this landmark 2-Kanal estate near Kohinoor City and Canal Road offers unmatched prestige, travertine facades, and private swimming pool.',
    features: [
      'Private Indoor Temperature-Controlled Pool',
      'Cascading Travertine Entrance Terraces',
      '6-Car Subterranean & Covered Parking',
      'Smart Home Automation & Biometric Locks',
      'Private Elevator Across All 3 Levels',
      'Direct Transfer via Sundar Sharif Estate',
    ],
    featured: false,
  },
  {
    id: 'sovereign-oak-pavilion',
    title: 'Eden Valley Modern Residence',
    location: 'Eden Valley, Faisalabad',
    locationKey: 'eden-valley',
    type: 'mansion',
    priceDisplay: 'PKR 3.65 Crore',
    priceValue: 10750000,
    priceBracket: '5m-12m',
    status: 'For Sale',
    statusVariant: 'primary',
    beds: 5,
    baths: 6,
    sqft: '10 Marla (2,950 sq.ft)',
    image: ABOUT_IMAGE,
    alt: 'Sunlit high-ceiling living room inside an award-winning modern luxury mansion with floor-to-ceiling glass, custom oak wall paneling, and marble fireplace',
    architect: 'Faisalabad Design Guild',
    yearBuilt: 2024,
    lotSize: '10 Marla',
    description:
      'A meticulously finished 10-Marla luxury house in Eden Valley, Faisalabad, showcasing warm oak wall paneling, double-glazed aluminum windows, and designer lighting.',
    features: [
      'Custom White Oak & Fluted Wall Paneling',
      'Sculpted Marble Feature Fireplace Wall',
      'Gated Community with 24/7 Patrols',
      'Near Lyallpur Galleria & Canal Road',
      'Complete Sui Gas & Underground Wiring',
      'Inspected & Verified by Sundar Sharif Estate',
    ],
    featured: false,
  },
];
