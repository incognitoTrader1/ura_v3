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
