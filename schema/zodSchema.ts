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
});

export const messageSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Message content is required." })
    .max(500, { message: "Message content must be at most 500 characters." }),
});
