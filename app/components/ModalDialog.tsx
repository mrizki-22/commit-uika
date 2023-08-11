import React, { ReactNode } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/app/components/ui/alert-dialog";

interface ModalDialogProps {
  children: ReactNode;
  title: string;
  description: string;
  action: string;
  onAction: () => void;
}

const ModalDialog: React.FC<ModalDialogProps> = ({ title, description, action, onAction, children }) => {
  return (
    <AlertDialog>
      {children}
      <AlertDialogContent className="bg-base-100">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction className="bg-error hover:bg-red-500" onClick={onAction}>
            {action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalDialog;
