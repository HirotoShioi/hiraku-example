import type { User } from "@/types/user";
import { errorDialog } from "@/examples/04-api-error/error-dialog";

// Simulated API client - demonstrates calling modals from outside React components
export async function fetchUser(): Promise<User> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Intentionally throw an error to demonstrate error dialog
  const error = new Error("Failed to fetch user: Server returned 500 Internal Server Error");

  // Open error dialog from outside React!
  await errorDialog.open({
    title: "API Error",
    message: error.message,
  });

  // Wait for user to acknowledge
  await errorDialog.onDidClose();

  throw error;
}

// Simulated delete API
export async function deleteUser(userId: string): Promise<void> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  console.log(`User ${userId} deleted successfully`);
}
