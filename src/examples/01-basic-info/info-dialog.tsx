import { createDialog } from "@hirotoshioi/hiraku-radix-ui";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InfoDialogProps {
  title: string;
  message: string;
}

function InfoDialogContent({ title, message }: InfoDialogProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{message}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={() => infoDialog.close()}>OK</Button>
      </DialogFooter>
    </DialogContent>
  );
}

export const infoDialog = createDialog(InfoDialogContent);
