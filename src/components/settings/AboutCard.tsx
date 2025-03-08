
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Star } from 'lucide-react';

export const AboutCard = () => {
  return (
    <Card className="bg-black/20 backdrop-blur-sm border border-blue-500/10">
      <CardHeader>
        <CardTitle>About Xcraft</CardTitle>
        <CardDescription>Forex Trading Journal</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center py-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full blur opacity-50"></div>
            <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="font-bold text-blue-500">Xcraft Trading Journal</h3>
          <p className="text-sm text-muted-foreground">Version 1.0.0</p>
        </div>
        
        <p className="text-sm text-center">
          A professional Forex Trading Journal to help you track, analyze, and improve your trading performance.
        </p>
        
        <div className="flex items-center justify-center gap-1 pt-2 text-blue-400">
          <Star className="h-3 w-3 fill-blue-400" />
          <Star className="h-4 w-4 fill-blue-400" />
          <Star className="h-5 w-5 fill-blue-400" />
          <Star className="h-4 w-4 fill-blue-400" />
          <Star className="h-3 w-3 fill-blue-400" />
        </div>
      </CardContent>
    </Card>
  );
};
