/**
 * Example 2: Single-flow Confirm (Delete in One Function)
 *
 * BEFORE (traditional pattern):
 * ```
 * const [isOpen, setIsOpen] = useState(false);
 * const [userToDelete, setUserToDelete] = useState<User | null>(null);
 *
 * const handleDeleteClick = (user: User) => {
 *   setUserToDelete(user);
 *   setIsOpen(true);
 * };
 *
 * const handleConfirm = async () => {
 *   await deleteUser(userToDelete.id);
 *   setIsOpen(false);
 *   refetch();
 * };
 * ```
 *
 * AFTER (hiraku pattern):
 * ```
 * const handleDelete = async (user: User) => {
 *   await confirmDialog.open({ ... });
 *   const { role } = await confirmDialog.onDidClose();
 *   if (role === "confirm") {
 *     await deleteUser(user.id);
 *     refetch();
 *   }
 * };
 * ```
 *
 * Everything in ONE async function - no state fragmentation!
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { confirmDialog } from "@/modals/confirm-dialog";
import { deleteUser } from "@/lib/api-client";

interface LogEntry {
  timestamp: string;
  message: string;
}

export function ConfirmDeleteExample() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = (message: string) => {
    setLogs((prev) => [
      { timestamp: new Date().toLocaleTimeString(), message },
      ...prev,
    ]);
  };

  // The entire delete flow in ONE function!
  const handleDeleteUser = async () => {
    addLog("Opening confirm dialog...");

    await confirmDialog.open({
      title: "Delete User",
      message: "Are you sure you want to delete this user? This action cannot be undone.",
    });

    const { data, role } = await confirmDialog.onDidClose();

    if (role === "confirm" && data) {
      addLog("User confirmed deletion, calling API...");
      await deleteUser("user-123");
      addLog("✅ User deleted successfully!");
    } else {
      addLog("❌ User cancelled deletion");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Example 2: Single-flow Confirm</h2>
        <p className="text-muted-foreground mt-1">
          Delete confirmation in one async function - no useState fragmentation.
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <Button variant="destructive" onClick={handleDeleteUser}>
          Delete User
        </Button>
      </div>

      <div className="rounded-lg border bg-muted/50 p-4">
        <h3 className="font-semibold mb-2">Activity Log:</h3>
        <div className="space-y-1 max-h-40 overflow-y-auto">
          {logs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No activity yet...</p>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="text-sm font-mono">
                <span className="text-muted-foreground">[{log.timestamp}]</span>{" "}
                {log.message}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
