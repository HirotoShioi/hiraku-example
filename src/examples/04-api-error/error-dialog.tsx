import { createAlertDialog } from "@hirotoshioi/hiraku";
import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface ErrorDialogProps {
  title: string;
  message: string;
}

function ErrorDialogContent({ title, message }: ErrorDialogProps) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{message}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction onClick={() => errorDialog.close({ role: "confirm" })}>
          OK
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

export const errorDialog = createAlertDialog(ErrorDialogContent);
