
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const AboutCard = () => {
  return (
    <Card className="bg-black/20 backdrop-blur-sm border border-blue-500/10">
      <CardHeader>
        <CardTitle>About Xcraft</CardTitle>
        <CardDescription>Forex Trading Journal</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center py-4">
          <img 
            src="/lovable-uploads/25d1d2e2-bd4f-4e21-8907-0169b19db59a.png" 
            alt="Xcraft Logo" 
            className="h-40 w-auto" // Increased from h-28 to h-40 for an even larger image
          />
        </div>
        
        <div className="text-center">
          <h3 className="font-bold text-blue-500">Xcraft Trading Journal</h3>
          <p className="text-sm text-muted-foreground">Version 1.0.0</p>
        </div>
        
        <p className="text-sm text-center">
          A professional Forex Trading Journal to help you track, analyze, and improve your trading performance.
        </p>
      </CardContent>
    </Card>
  );
};
