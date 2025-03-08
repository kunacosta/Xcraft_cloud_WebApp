
import React from 'react';
import { Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CardActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const CardActions: React.FC<CardActionsProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="flex gap-2">
      <Button 
        size="sm" 
        variant="outline" 
        className="h-8 px-2"
        onClick={onEdit}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="outline" className="h-8 px-2 border-red-500/20 hover:bg-red-500/10">
            <Trash className="h-4 w-4 text-red-500" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Trade</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this trade record? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={onDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
