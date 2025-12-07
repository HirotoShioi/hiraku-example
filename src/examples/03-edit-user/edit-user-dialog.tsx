import { useState } from "react";
import { createDialog } from "@hirotoshioi/hiraku";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { User } from "@/types/user";

interface EditUserDialogProps {
  user: User;
}

function EditUserDialogContent({ user }: EditUserDialogProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSave = () => {
    const updatedUser: User = { ...user, name, email };
    editUserDialog.close({ data: updatedUser, role: "confirm" });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit User</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => editUserDialog.close({ role: "cancel" })}
        >
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogFooter>
    </DialogContent>
  );
}

export const editUserDialog = createDialog(
  EditUserDialogContent
).returns<User>();
