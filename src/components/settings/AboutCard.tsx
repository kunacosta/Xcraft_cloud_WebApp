
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const AboutCard = () => {
  return (
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
  );
};
