import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BasicInfoExample } from "@/examples/01-basic-info";
import { ConfirmDeleteExample } from "@/examples/02-confirm-delete";
import { EditUserExample } from "@/examples/03-edit-user";
import { ApiErrorExample } from "@/examples/04-api-error";

type ExampleKey = "basic" | "confirm" | "edit" | "api-error";

const examples: { key: ExampleKey; label: string; description: string }[] = [
  {
    key: "basic",
    label: "1. Basic Info",
    description: "Simple open/close pattern",
  },
  {
    key: "confirm",
    label: "2. Confirm Delete",
    description: "Single-flow confirmation",
  },
  {
    key: "edit",
    label: "3. Edit User",
    description: "Typed return values",
  },
  {
    key: "api-error",
    label: "4. API Error",
    description: "Modal from outside React",
  },
];

function App() {
  const [activeExample, setActiveExample] = useState<ExampleKey>("basic");

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/30 p-4 flex flex-col gap-4">
        <div className="px-2">
          <h1 className="text-xl font-bold">hiraku Examples</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Modal management made simple
          </p>
        </div>

        <nav className="flex flex-col gap-1">
          {examples.map((ex) => (
            <Button
              key={ex.key}
              variant={activeExample === ex.key ? "secondary" : "ghost"}
              className="justify-start h-auto py-3 px-3"
              onClick={() => setActiveExample(ex.key)}
            >
              <div className="text-left">
                <div className="font-medium">{ex.label}</div>
                <div className="text-xs text-muted-foreground">
                  {ex.description}
                </div>
              </div>
            </Button>
          ))}
        </nav>

        <div className="mt-auto px-2 py-4 border-t">
          <a
            href="https://github.com/HirotoShioi/hiraku"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub →
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-2xl">
          {activeExample === "basic" && <BasicInfoExample />}
          {activeExample === "confirm" && <ConfirmDeleteExample />}
          {activeExample === "edit" && <EditUserExample />}
          {activeExample === "api-error" && <ApiErrorExample />}
        </div>
      </main>
    </div>
  );
}

export default App;
