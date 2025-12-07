interface LogEntry {
  timestamp: string;
  message: string;
  type?: "info" | "error" | "success";
  data?: unknown;
}

interface LogPanelProps {
  title?: string;
  logs: LogEntry[];
}

export function LogPanel({ title = "Activity Log", logs }: LogPanelProps) {
  return (
    <div className="rounded-lg border bg-muted/50 p-4">
      <h3 className="font-semibold mb-2">{title}:</h3>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {logs.length === 0 ? (
          <p className="text-sm text-muted-foreground">No activity yet...</p>
        ) : (
          logs.map((log, i) => (
            <div
              key={i}
              className={`text-sm font-mono border-b border-border/50 pb-2 last:border-0 ${
                log.type === "error"
                  ? "text-destructive"
                  : log.type === "success"
                  ? "text-green-600 dark:text-green-400"
                  : ""
              }`}
            >
              <div>
                <span className="text-muted-foreground">[{log.timestamp}]</span>{" "}
                {log.message}
              </div>
              {log.data !== undefined && (
                <pre className="text-xs mt-1 text-muted-foreground whitespace-pre-wrap">
                  data: {JSON.stringify(log.data, null, 2)}
                </pre>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export type { LogEntry };
