import * as z from "zod";

// Define the Login Zod schema
export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const signUpFormSchema = z
  .object({
    name: z.string().min(1, "Name must be at least 1 characters long"),
    email: z.string().email("Invalid email address"),
    role: z.enum(["USER", "BUSINESS", "ADMIN"]),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const addProductSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters" }),
  price: z.number().min(1, { message: "Price must be at least 1" }),
  image: z.string().url({ message: "Invalid image URL" }),
  category: z.string().min(1, { message: "Category is required" }),
});
export const removeProductSchema = z.object({
  productId: z.string().min(1, { message: "Product Id is required" }),
});

export const messageSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Message content is required." })
    .max(500, { message: "Message content must be at most 500 characters." }),
});

// Define the location schema
const LocationSchema = z.object({
  lat: z
    .number()
    .min(-90)
    .max(90, { message: "Latitude must be between -90 and 90." }),
  lng: z
    .number()
    .min(-180)
    .max(180, { message: "Longitude must be between -180 and 180." }),
});

export const updateBusinessSchema = z.object({
  businessId: z.string(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  tagline: z.string().min(2, {
    message: "Tagline must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "Phone must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  hours: z.string().min(2, {
    message: "Hours must be at least 2 characters.",
  }),
  website: z.string().url({ message: "Invalid website URL" }),
  location: LocationSchema,
});

export const rateBusinessSchema = z.object({
  rating: z.number().min(1, { message: "Rating must be at least 1" }),
});

export const reviewFormSchema = z.object({
  review: z.string().min(1, {
    message: "Review must be at least a character.",
  }),
});
