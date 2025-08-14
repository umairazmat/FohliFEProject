export type UserRole = "admin" | "user" | "moderator";
export type UserStatus = "active" | "banned" | "pending";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string; // ISO
}
