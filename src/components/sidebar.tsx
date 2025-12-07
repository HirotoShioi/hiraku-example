import { createSheet } from "@hirotoshioi/hiraku";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export type ExampleKey = "basic" | "confirm" | "edit" | "api-error";

export const examples: {
  key: ExampleKey;
  label: string;
  description: string;
}[] = [
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

interface SidebarContentProps {
  activeExample: ExampleKey;
  onSelect: (key: ExampleKey) => void;
}

export function SidebarContent({
  activeExample,
  onSelect,
}: SidebarContentProps) {
  return (
    <>
      <nav className="flex flex-col gap-1">
        {examples.map((ex) => (
          <Button
            key={ex.key}
            variant={activeExample === ex.key ? "secondary" : "ghost"}
            className="justify-start h-auto py-3 px-3"
            onClick={() => onSelect(ex.key)}
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
    </>
  );
}

// Mobile sidebar as a hiraku sheet
interface MobileSidebarProps {
  activeExample: ExampleKey;
}

function MobileSidebarContent({ activeExample }: MobileSidebarProps) {
  const handleSelect = (key: ExampleKey) => {
    mobileSidebar.close({ data: key, role: "confirm" });
  };

  return (
    <SheetContent side="left" className="w-64 flex flex-col gap-4">
      <SheetHeader>
        <SheetTitle>hiraku Examples</SheetTitle>
      </SheetHeader>
      <SidebarContent activeExample={activeExample} onSelect={handleSelect} />
    </SheetContent>
  );
}

export const mobileSidebar =
  createSheet(MobileSidebarContent).returns<ExampleKey>();
