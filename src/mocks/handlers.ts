import { graphql, HttpResponse } from "msw";
import type { User } from "../entities/user/types";

let users: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "admin",
    status: "active",
    createdAt: "2025-01-01T09:12:00.000Z",
  },
  {
    id: "2",
    name: "Bob Martin",
    email: "bob@example.com",
    role: "user",
    status: "pending",
    createdAt: "2025-02-15T14:45:00.000Z",
  },
  {
    id: "3",
    name: "Charlie Khan",
    email: "charlie@acme.co",
    role: "moderator",
    status: "banned",
    createdAt: "2025-03-02T11:22:00.000Z",
  },
  ...Array.from({ length: 15 }).map((_, i) => ({
    id: String(4 + i),
    name: `User ${i + 1}`,
    email: `user${i + 1}@mail.com`,
    role: (["admin", "user", "moderator"] as const)[i % 3],
    status: (["active", "banned", "pending"] as const)[i % 3],
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  })),
];

export const handlers = [
  graphql.query("GetUsers", () => {
    return HttpResponse.json({ data: { users } });
  }),

  graphql.mutation("AddUser", ({ variables }) => {
    const input = (variables as any).input as Omit<User, "id">;
    const newUser: User = {
      id: (Math.max(...users.map((u) => +u.id)) + 1).toString(),
      ...input,
    };
    users = [newUser, ...users];
    return HttpResponse.json({ data: { addUser: newUser } });
  }),

  graphql.mutation("UpdateUser", ({ variables }) => {
    const { id, input } = variables as any;
    let updated: User | null = null;
    users = users.map((u) =>
      u.id === id ? (updated = { ...u, ...input, id })! : u
    );
    return HttpResponse.json({ data: { updateUser: updated } });
  }),

  graphql.mutation("DeleteUser", ({ variables }) => {
    const { id } = variables as any;
    users = users.filter((u) => u.id !== id);
    return HttpResponse.json({ data: { deleteUser: true } });
  }),
];
