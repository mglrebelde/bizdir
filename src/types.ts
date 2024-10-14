export interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  contactInfo: {
    phone: string;
    email: string;
  };
  address: string;
  website: string;
  workingHours: string;
  rating: number;
  latitude: number;
  longitude: number;
}

export interface Review {
  id: string;
  businessId: string;
  rating: number;
  comment: string;
  userName: string;
}

export interface Category {
  id: string;
  name: string;
  subcategories: string[];
}