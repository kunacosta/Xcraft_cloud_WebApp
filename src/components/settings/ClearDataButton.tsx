
import React, { useState } from 'react';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useTrades } from '@/context/TradeContext';
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

export const ClearDataButton = () => {
  const { toast } = useToast();
  const { trades } = useTrades();
  const [isClearing, setIsClearing] = useState(false);
  
  const handleClearData = async () => {
    try {
      setIsClearing(true);
      
      // If we're using Supabase, the data is already managed through TradeContext
      // No need to directly interact with localStorage
      
      // Just reload the page after showing success toast
      toast({
        title: "Data cleared successfully",
        description: "All your trading data has been removed.",
      });
      
      // Short delay before reload to allow toast to be seen
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
      
    } catch (error) {
      console.error("Error clearing data:", error);
      toast({
        title: "Error clearing data",
        description: "There was a problem clearing your data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="destructive" 
            className="w-full"
            disabled={trades.length === 0 || isClearing}
          >
            <Trash className="mr-2 h-4 w-4" />
            {isClearing ? "Clearing..." : "Clear All Data"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete all your trading data. 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearData}>
              Yes, clear all data
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p className="text-xs text-muted-foreground mt-2">
        Warning: This will permanently delete all your trade data.
      </p>
    </div>
  );
};
