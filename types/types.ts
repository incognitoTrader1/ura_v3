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
