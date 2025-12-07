import { createAlertDialog } from "@hirotoshioi/hiraku";
import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface ConfirmDialogProps {
  title: string;
  message: string;
}

function ConfirmDialogContent({ title, message }: ConfirmDialogProps) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{message}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel
          onClick={() => confirmDialog.close({ data: false, role: "cancel" })}
        >
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={() => confirmDialog.close({ data: true, role: "confirm" })}
        >
          Confirm
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

export const confirmDialog =
  createAlertDialog(ConfirmDialogContent).returns<boolean>();
