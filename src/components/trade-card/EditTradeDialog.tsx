
import React from 'react';
import { Trade } from '@/types/trade';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TradeForm from '@/components/TradeForm';

interface EditTradeDialogProps {
  trade: Trade;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditTradeDialog: React.FC<EditTradeDialogProps> = ({ 
  trade, 
  isOpen, 
  onOpenChange 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Trade</DialogTitle>
        </DialogHeader>
        <TradeForm 
          initialData={trade} 
          mode="edit" 
          onSuccess={() => onOpenChange(false)} 
        />
      </DialogContent>
    </Dialog>
  );
};
