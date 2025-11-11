// Temporary stub for storage module so the app can compile and run.
// Replace with real logic later.

import { User, InsertUser } from "./lib/schemaStub.js";

// Example placeholder functions
export function getUser(id: string): User {
  return { id, name: "Stub User" } as any;
}

export function addUser(user: InsertUser): void {
  console.log("addUser called with", user);
}

// Default export (optional)
export default { getUser, addUser };

