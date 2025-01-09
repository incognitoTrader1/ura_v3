import { ReviewsProps } from "@/components/review/ReviewListing";

export type TUser = {
  id: string;
  name: string | null;
  password: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  updatedAt: Date;
  role: "USER" | "ADMIN" | "BUSINESS";
};

export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null; // Assuming emailVerified can be a Date or null
  password: string | null; // Assuming password can be a string or null
  image: string;
  role: "USER" | "ADMIN"; // Adjust roles as needed
  online: boolean;
  rating: number;
  businessId: string | null; // Assuming businessId can be a string or null
  createdAt: Date; // Assuming createdAt is a Date
  updatedAt: Date; // Assuming updatedAt is a Date
  sentMessages: []; // Adjust type based on your message structure
  receivedMessages: []; // Adjust type based on your message structure
}
export type TRating = {
  id: string;
  rating: number;
  userId: string;
  businessId: string;
};

export interface IBusiness {
  id: string;
  name: string;
  imageUrl: string | null;
  description: string | null;
  tagline: string | null;
  reviews: ReviewsProps;
  rating: number;
  userId: string;
  hours: string | null;
  location?: {
    lat?: number;
    lng?: number;
  };
  address: string | null;
  createdAt: Date;
  updatedAt: Date;
  phone: string | null;
  website: string | null;
  products: {
    id: string;
    price: number;
    name: string;
    imageUrl: string;
    description: string;
    businessId: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
  }[];
  ratings: TRating[];
}

export type TBusinessResponse = IBusiness | { error: string };

export interface IRating {
  id: string;
  rating: number;
  userId: string;
  businessId: string;
  // createdAt:
}
