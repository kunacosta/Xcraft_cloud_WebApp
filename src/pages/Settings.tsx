
import React from 'react';
import { Settings as SettingsIcon, Save, Database, Trash } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { useTrades } from '@/context/TradeContext';

const Settings = () => {
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
        'Profit/Loss (pips)',
        'Amount',
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
          trade.profitLoss,
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
  
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all trade data? This action cannot be undone.')) {
      localStorage.removeItem('xcraft-trades');
      window.location.reload();
    }
  };
  
  return (
    <div className="container py-8 space-y-8 animate-fadeIn">
      <div className="flex items-center space-x-2">
        <SettingsIcon className="h-6 w-6 text-xcraft-secondary" />
        <h1 className="text-3xl font-bold font-montserrat">Settings</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black/30 backdrop-blur-sm border border-xcraft-accent/10">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2 text-xcraft-secondary" />
              Data Management
            </CardTitle>
            <CardDescription>Export or clear your trade data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleExportCSV}
              variant="outline" 
              className="w-full"
            >
              <Save className="mr-2 h-4 w-4" />
              Export as CSV
            </Button>
            
            <Separator className="my-4" />
            
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
          </CardContent>
        </Card>
        
        <Card className="bg-black/30 backdrop-blur-sm border border-xcraft-accent/10">
          <CardHeader>
            <CardTitle>About Xcraft</CardTitle>
            <CardDescription>Forex Trading Journal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center py-4">
              <div className="bg-xcraft-secondary w-16 h-16 rounded-lg flex items-center justify-center">
                <span className="text-white font-montserrat font-bold text-3xl">X</span>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="font-bold text-xcraft-secondary">Xcraft Trading Journal</h3>
              <p className="text-sm text-muted-foreground">Version 1.0.0</p>
            </div>
            
            <p className="text-sm text-center">
              A professional Forex Trading Journal to help you track, analyze, and improve your trading performance.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
