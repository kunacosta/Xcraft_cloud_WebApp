
import React from 'react';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ClearDataButton = () => {
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all trade data? This action cannot be undone.')) {
      localStorage.removeItem('xcraft-trades');
      window.location.reload();
    }
  };

  return (
    <div>
      <Button 
        variant="destructive" 
        className="w-full"
        onClick={handleClearData}
      >
        <Trash className="mr-2 h-4 w-4" />
        Clear All Data
      </Button>
      <p className="text-xs text-muted-foreground mt-2">
        Warning: This will permanently delete all your trade data.
      </p>
    </div>
  );
};
