export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatarUrl?: string;
  role: "customer" | "admin";
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
