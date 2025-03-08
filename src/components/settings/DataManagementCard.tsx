
import React from 'react';
import { Database, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExportDataButton } from './ExportDataButton';
import { ClearDataButton } from './ClearDataButton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const DataManagementCard = () => {
  return (
    <Card className="elegant-card overflow-hidden shadow-card">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-gray-100">
        <CardTitle className="flex items-center text-gray-800">
          <div className="p-2 bg-blue-100 rounded-lg mr-3">
            <Database className="h-5 w-5 text-blue-600" />
          </div>
          Data Management
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 ml-2 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>Manage your trade data by exporting it or clearing it from your browser's storage.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <CardDescription className="text-gray-500">
          Export or clear your trade data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6 bg-white">
        <div className="group">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <span className="text-blue-600 mr-1">•</span> Export Your Data
          </h3>
          <p className="text-sm text-gray-500 mb-3">
            Download all your trading records as a JSON file for backup or analysis in other tools.
          </p>
          <ExportDataButton />
        </div>
        
        <Separator className="my-4" />
        
        <div className="group">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <span className="text-red-500 mr-1">•</span> Clear All Data
          </h3>
          <p className="text-sm text-gray-500 mb-3">
            Remove all your trading records from the application. This action cannot be undone.
          </p>
          <ClearDataButton />
        </div>
      </CardContent>
    </Card>
  );
};
