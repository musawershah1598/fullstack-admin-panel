import { Trash } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";

type DeleteDialogProps = {
  title: string;
  description: string;
  handleConfirm: () => Promise<void>;
};

const DeleteDialog = ({
  title,
  description,
  handleConfirm,
}: DeleteDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <AlertDialog open={open} onOpenChange={(o) => setOpen(o)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title || "Are you sure?"}</AlertDialogTitle>
            <AlertDialogDescription>
              {description ||
                "This action cannot be undone. This will permanently delete the item."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setLoading(true);
                handleConfirm().finally(() => {
                  setLoading(false);
                });
              }}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700"
            >
              {loading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button variant={"destructive"} size={"sm"} onClick={() => setOpen(true)}>
        <Trash />
      </Button>
    </div>
  );
};

export default DeleteDialog;
