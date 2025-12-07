/**
 * Example 3: Typed Return Value Edit Modal
 *
 * Using .returns<User>() to get type-safe return values from modals.
 * The modal returns the edited User object, and TypeScript knows the exact type!
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { editUserDialog } from "@/modals/edit-user-dialog";
import type { User } from "@/types/user";

interface LogEntry {
  timestamp: string;
  role: string;
  data?: User;
}

export function EditUserExample() {
  const [user, setUser] = useState<User>({
    id: "user-001",
    name: "John Doe",
    email: "john@example.com",
  });
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = (role: string, data?: User) => {
    setLogs((prev) => [
      { timestamp: new Date().toLocaleTimeString(), role, data },
      ...prev,
    ]);
  };

  const handleEditUser = async () => {
    await editUserDialog.open({ user });

    // TypeScript knows `data` is User | undefined!
    const { data, role } = await editUserDialog.onDidClose();

    addLog(role ?? "dismiss", data);

    if (role === "confirm" && data) {
      // `data` is fully typed as User here
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

      <div className="rounded-lg border bg-muted/50 p-4">
        <h3 className="font-semibold mb-2">Result Log:</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {logs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No activity yet...</p>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="text-sm font-mono border-b pb-2">
                <div>
                  <span className="text-muted-foreground">[{log.timestamp}]</span>{" "}
                  role: <span className="text-primary font-semibold">{log.role}</span>
                </div>
                {log.data && (
                  <pre className="text-xs mt-1 text-muted-foreground">
                    data: {JSON.stringify(log.data, null, 2)}
                  </pre>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
