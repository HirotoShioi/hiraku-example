import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogPanel, type LogEntry } from "@/components/log-panel";
import { editUserDialog } from "@/examples/03-edit-user/edit-user-dialog";
import type { User } from "@/types/user";

export function EditUserExample() {
  const [user, setUser] = useState<User>({
    id: "user-001",
    name: "John Doe",
    email: "john@example.com",
  });
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = (role: string, data?: User) => {
    setLogs((prev) => [
      {
        timestamp: new Date().toLocaleTimeString(),
        message: `role: ${role}`,
        type: role === "confirm" ? "success" : role === "cancel" ? "error" : "info",
        data,
      },
      ...prev,
    ]);
  };

  const handleEditUser = async () => {
    await editUserDialog.open({ user });

    const { data, role } = await editUserDialog.onDidClose();

    addLog(role ?? "dismiss", data);

    if (role === "confirm" && data) {
      setUser(data);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Example 3: Typed Edit Modal</h2>
        <p className="text-muted-foreground mt-1">
          Using <code>.returns&lt;User&gt;()</code> for type-safe modal return values.
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex gap-2">
            <span className="font-medium w-16">Name:</span>
            <span>{user.name}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium w-16">Email:</span>
            <span>{user.email}</span>
          </div>
        </div>
        <Button onClick={handleEditUser}>Edit User</Button>
      </div>

      <LogPanel title="Result Log" logs={logs} />
    </div>
  );
}
