import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DialogDeleteThreadProps {
  open: boolean;
  onClose: () => void;
  onHandle: () => void;
}

export function DialogDeleteThread({
  open,
  onClose,
  onHandle,
}: DialogDeleteThreadProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="rounded-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa đoạn chat</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xóa đoạn chat này không?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={onHandle}
            className="bg-red-500 hover:bg-red-500/90 text-white"
          >
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
