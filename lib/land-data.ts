export type LandType = 'Agricultural' | 'Residential' | 'Commercial' | 'Industrial';

export interface BaseLand {
  id: string;
  title: string;
  location: string;
  size: string;
  price: string;
  type: LandType | string;
  image: string;
}

export interface NewListing extends BaseLand {
  added: string;
}

export interface TrendingListing extends BaseLand {
  views: number;
}

export interface SearchLand extends BaseLand {
  verified: boolean;
  latitude: number;
  longitude: number;
}

export const featuredListing: BaseLand & { type: LandType } = {
  id: 'featured-1',
  title: 'Premium Olive Grove Estate',
  location: 'Ramallah, Palestine',
  size: '5,200 m²',
  price: '$280,000',
  image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
  type: 'Agricultural',
};

export const newListings: NewListing[] = [
  {
    id: '1',
    title: 'Olive Grove Land',
    location: 'Ramallah',
    size: '2,400 m²',
    price: '$120,000',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
    type: 'Agricultural',
    added: '2 hours ago',
  },
  {
    id: '2',
    title: 'Residential Plot',
    location: 'Nablus',
    size: '1,800 m²',
    price: '$95,000',
    image: 'https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=800&h=600&fit=crop',
    type: 'Residential',
    added: '5 hours ago',
  },
  {
    id: '3',
    title: 'Agricultural Land',
    location: 'Hebron',
    size: '3,200 m²',
    price: '$150,000',
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=600&fit=crop',
    type: 'Agricultural',
    added: '1 day ago',
  },
  {
    id: '4',
    title: 'Valley View Land',
    location: 'Bethlehem',
    size: '2,800 m²',
    price: '$126,000',
    image: 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=800&h=600&fit=crop',
    type: 'Agricultural',
    added: '2 days ago',
  },
];

export const trendingListings: TrendingListing[] = [
  {
    id: 'trend-1',
    title: 'Mountain View Plot',
    location: 'Jerusalem',
    size: '2,100 m²',
    price: '$180,000',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    views: 856,
    type: 'Residential',
  },
  {
    id: 'trend-2',
    title: 'Farm Land',
    location: 'Bethlehem',
    size: '4,500 m²',
    price: '$200,000',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    views: 743,
    type: 'Agricultural',
  },
];

export const mockLands: SearchLand[] = [
  {
    id: '1',
    title: 'Olive Grove Land',
    location: 'Ramallah',
    size: '2,400 m²',
    price: '$120,000',
    verified: true,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    latitude: 31.9073,
    longitude: 35.2042,
    type: 'Agricultural',
  },
  {
    id: '2',
    title: 'Residential Plot',
    location: 'Nablus',
    size: '1,800 m²',
    price: '$95,000',
    verified: false,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    latitude: 32.2211,
    longitude: 35.2544,
    type: 'Residential',
  },
  {
    id: '3',
    title: 'Agricultural Land',
    location: 'Hebron',
    size: '3,200 m²',
    price: '$150,000',
    verified: true,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    latitude: 31.5326,
    longitude: 35.0998,
    type: 'Agricultural',
  },
  {
    id: '4',
    title: 'Mountain View Plot',
    location: 'Jerusalem',
    size: '2,100 m²',
    price: '$180,000',
    verified: true,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    latitude: 31.7683,
    longitude: 35.2137,
    type: 'Residential',
  },
  {
    id: '5',
    title: 'Farm Land',
    location: 'Bethlehem',
    size: '4,500 m²',
    price: '$200,000',
    verified: false,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    latitude: 31.7054,
    longitude: 35.2024,
    type: 'Agricultural',
  },
];


