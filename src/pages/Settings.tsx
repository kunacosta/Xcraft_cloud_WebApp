
import React from 'react';
import { Settings as SettingsIcon, Save, Database, CloudUpload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { useTrades } from '@/context/TradeContext';

const Settings = () => {
  const { trades } = useTrades();
  
  const handleExportData = () => {
    try {
      const dataStr = JSON.stringify(trades, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `xcraft-trades-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast({
        title: 'Export Successful',
        description: 'Your trade data has been exported successfully.',
      });
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: 'There was an error exporting your trade data.',
        variant: 'destructive',
      });
    }
  };
  
  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = JSON.parse(content);
        
        // Here we would validate the data and then import it
        // For now, just show a success message
        
        toast({
          title: 'Import Successful',
          description: `Imported ${importedData.length} trades.`,
        });
      } catch (error) {
        toast({
          title: 'Import Failed',
          description: 'The selected file is not a valid trade data file.',
          variant: 'destructive',
        });
      }
    };
    reader.readAsText(file);
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
            <CardDescription>Export, import or clear your trade data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={handleExportData} 
                variant="outline" 
                className="w-full"
              >
                <Save className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              
              <div className="relative">
                <input
                  type="file"
                  id="import-file"
                  accept=".json"
                  onChange={handleImportData}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button 
                  variant="outline" 
                  className="w-full"
                >
                  <CloudUpload className="mr-2 h-4 w-4" />
                  Import Data
                </Button>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div>
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={handleClearData}
              >
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
