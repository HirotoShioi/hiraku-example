/**
 * Example 1: Basic Info Modal (No Return Value)
 *
 * This is the simplest hiraku pattern:
 * - createDialog() to define a modal
 * - open() to show it
 * - close() to dismiss it
 *
 * Perfect for announcements, info messages, or simple notifications.
 */

import { Button } from "@/components/ui/button";
import { infoDialog } from "@/examples/01-basic-info/info-dialog";

export function BasicInfoExample() {
  const handleShowInfo = async () => {
    await infoDialog.open({
      title: "Welcome to hiraku!",
      message:
        "hiraku makes modal management simple. Just call open() and close() - no useState, no prop drilling.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Example 1: Basic Info Modal</h2>
        <p className="text-muted-foreground mt-1">
          The simplest pattern: open a dialog and close it with OK.
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <Button onClick={handleShowInfo}>Show Info</Button>
      </div>

      <div className="rounded-lg border bg-muted/50 p-4">
        <h3 className="font-semibold mb-2">How it works:</h3>
        <pre className="text-sm overflow-x-auto">
{`// Define the modal once
const infoDialog = createDialog(InfoDialogContent);

// Open it from anywhere
await infoDialog.open({ title: "...", message: "..." });`}
        </pre>
      </div>
    </div>
  );
}
