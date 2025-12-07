import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  mobileSidebar,
  SidebarContent,
  type ExampleKey,
} from "@/components/sidebar";
import { BasicInfoExample } from "@/examples/01-basic-info";
import { ConfirmDeleteExample } from "@/examples/02-confirm-delete";
import { EditUserExample } from "@/examples/03-edit-user";
import { ApiErrorExample } from "@/examples/04-api-error";

function App() {
  const [activeExample, setActiveExample] = useState<ExampleKey>("basic");

  const handleOpenMobileMenu = async () => {
    await mobileSidebar.open({ activeExample });
    const { data, role } = await mobileSidebar.onDidClose();
    if (role === "confirm" && data) {
      setActiveExample(data);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center gap-3 border-b p-4">
        <Button variant="ghost" size="icon" onClick={handleOpenMobileMenu}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
        <div>
          <h1 className="text-lg font-bold">hiraku Examples</h1>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 border-r bg-muted/30 p-4 flex-col gap-4">
        <div className="px-2">
          <h1 className="text-xl font-bold">hiraku Examples</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Modal management made simple
          </p>
        </div>
        <SidebarContent
          activeExample={activeExample}
          onSelect={setActiveExample}
        />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 overflow-auto">
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
