
import React from 'react';
import { Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExportDataButton } from './ExportDataButton';
import { ClearDataButton } from './ClearDataButton';

export const DataManagementCard = () => {
  return (
    <Card className="card-blue">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="h-5 w-5 mr-2 text-blue-500" />
          Data Management
        </CardTitle>
        <CardDescription>Export or clear your trade data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ExportDataButton />
        
        <Separator className="my-4" />
        
        <ClearDataButton />
      </CardContent>
    </Card>
  );
};
