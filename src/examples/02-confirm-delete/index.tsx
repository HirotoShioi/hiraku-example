import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogPanel, type LogEntry } from "@/components/log-panel";
import { confirmDialog } from "@/examples/02-confirm-delete/confirm-dialog";
import { deleteUser } from "@/examples/04-api-error/api-client";

export function ConfirmDeleteExample() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = (message: string, type?: LogEntry["type"]) => {
    setLogs((prev) => [
      { timestamp: new Date().toLocaleTimeString(), message, type },
      ...prev,
    ]);
  };

  const handleDeleteUser = async () => {
    addLog("Opening confirm dialog...");

    await confirmDialog.open({
      title: "Delete User",
      message:
        "Are you sure you want to delete this user? This action cannot be undone.",
    });

    const { data, role } = await confirmDialog.onDidClose();

    if (role === "confirm" && data) {
      addLog("User confirmed deletion, calling API...");
      await deleteUser("user-123");
      addLog("User deleted successfully!", "success");
    } else {
      addLog("User cancelled deletion", "error");
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

      <LogPanel logs={logs} />
    </div>
  );
}
