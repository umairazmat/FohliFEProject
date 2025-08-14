export const ROLE_OPTIONS = [
  { label: "Admin", value: "admin" },
  { label: "User", value: "user" },
  { label: "Moderator", value: "moderator" },
] as const;

export const STATUS_TAG_COLOR: Record<"active" | "banned" | "pending", string> =
  { active: "green", banned: "red", pending: "gold" };
