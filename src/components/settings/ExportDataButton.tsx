
import React from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useTrades } from '@/context/TradeContext';

export const ExportDataButton = () => {
  const { trades } = useTrades();
  
  const handleExportCSV = () => {
    try {
      // CSV header row
      const headers = [
        'Currency Pair',
        'Type',
        'Entry Price',
        'Exit Price',
        'Lot Size',
        'Profit/Loss ($)',
        'Strategy',
        'Notes',
        'Date'
      ].join(',');
      
      // Convert each trade to CSV row
      const csvRows = trades.map(trade => {
        // Format date if it exists
        const formattedDate = trade.date ? new Date(trade.date).toLocaleString() : '';
        
        // Escape notes and strategy fields to handle commas, quotes, etc.
        const escapeCsvField = (field: string) => {
          if (!field) return '';
          // Wrap in quotes and escape any quotes inside the field
          return `"${String(field).replace(/"/g, '""')}"`;
        };
        
        return [
          trade.currencyPair,
          trade.tradeType,
          trade.entryPrice,
          trade.exitPrice,
          trade.lotSize,
          trade.amount || 0,
          escapeCsvField(trade.strategy || ''),
          escapeCsvField(trade.notes || ''),
          escapeCsvField(formattedDate)
        ].join(',');
      });
      
      // Combine header with rows
      const csvContent = [headers, ...csvRows].join('\n');
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const exportFileName = `xcraft-trades-${new Date().toISOString().split('T')[0]}.csv`;
      
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', exportFileName);
      link.click();
      
      // Clean up
      URL.revokeObjectURL(url);
      
      toast({
        title: 'CSV Export Successful',
        description: 'Your trade data has been exported as CSV successfully.',
      });
    } catch (error) {
      console.error('CSV export error:', error);
      toast({
        title: 'CSV Export Failed',
        description: 'There was an error exporting your trade data as CSV.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Button 
      onClick={handleExportCSV}
      variant="outline" 
      className="w-full"
    >
      <Save className="mr-2 h-4 w-4" />
      Export as CSV
    </Button>
  );
};
