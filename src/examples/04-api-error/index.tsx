/**
 * Example 4: API Error Dialog (Modal from Outside React)
 *
 * This demonstrates hiraku's unique ability to open modals from outside React components.
 * The error dialog is triggered from the API client layer (src/lib/api-client.ts),
 * NOT from a React component!
 *
 * This pattern is perfect for:
 * - Global error handling in API clients
 * - Auth session expiration dialogs
 * - Network error notifications
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchUser } from "@/lib/api-client";

interface LogEntry {
  timestamp: string;
  message: string;
  type: "info" | "error";
}

export function ApiErrorExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = (message: string, type: "info" | "error" = "info") => {
    setLogs((prev) => [
      { timestamp: new Date().toLocaleTimeString(), message, type },
      ...prev,
    ]);
  };

  const handleLoadUser = async () => {
    setIsLoading(true);
    addLog("Calling fetchUser() API...");

    try {
      await fetchUser();
      addLog("User loaded successfully");
    } catch {
      // Error was already handled by the API client showing the dialog
      addLog("Error was handled by API client (dialog shown outside React!)", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Example 4: API Error Dialog</h2>
        <p className="text-muted-foreground mt-1">
          Opening modals from outside React - perfect for API error handling.
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <Button onClick={handleLoadUser} disabled={isLoading}>
          {isLoading ? "Loading..." : "Load User (will fail)"}
        </Button>
      </div>

      <div className="rounded-lg border bg-amber-50 dark:bg-amber-950/20 p-4">
        <h3 className="font-semibold mb-2">💡 Key Point:</h3>
        <p className="text-sm">
          The error dialog is opened from <code>src/lib/api-client.ts</code> - 
          a plain TypeScript file with no React context. hiraku's modal controllers
          work anywhere in your app!
        </p>
      </div>

      <div className="rounded-lg border bg-muted/50 p-4">
        <h3 className="font-semibold mb-2">Activity Log:</h3>
        <div className="space-y-1 max-h-40 overflow-y-auto">
          {logs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No activity yet...</p>
          ) : (
            logs.map((log, i) => (
              <div
                key={i}
                className={`text-sm font-mono ${
                  log.type === "error" ? "text-destructive" : ""
                }`}
              >
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
