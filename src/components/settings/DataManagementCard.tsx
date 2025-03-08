
import React from 'react';
import { Database, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExportDataButton } from './ExportDataButton';
import { ClearDataButton } from './ClearDataButton';

export const DataManagementCard = () => {
  return (
    <Card className="card-blue relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl"></div>
      <CardHeader>
        <CardTitle className="flex items-center">
          <div className="mr-2 p-1.5 bg-gradient-to-br from-blue-400 to-blue-600 rounded-md">
            <Database className="h-4 w-4 text-white" />
          </div>
          Data Management
        </CardTitle>
        <CardDescription>Export or clear your trade data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        <div className="relative group">
          <ExportDataButton />
          <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Sparkles className="h-4 w-4 text-blue-400" />
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <ClearDataButton />
      </CardContent>
    </Card>
  );
};
