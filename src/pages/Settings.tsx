
import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { DataManagementCard } from '@/components/settings/DataManagementCard';
import { AboutCard } from '@/components/settings/AboutCard';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Settings = () => {
  return (
    <div className="container py-8 space-y-8 animate-fadeIn">
      <div className="flex items-center gap-3 mb-6">
        <SettingsIcon className="h-6 w-6 text-blue-500" />
        <h1 className="text-3xl font-bold font-montserrat">Settings</h1>
      </div>
      
      <Card className="bg-black/30 backdrop-blur-md border border-blue-500/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DataManagementCard />
            <AboutCard />
          </div>
        </CardContent>
      </Card>
      
      <div className="text-xs text-center text-gray-400 pt-4">
        <p>Xcraft Trading Journal - Your data is stored locally in your browser</p>
      </div>
    </div>
  );
};

export default Settings;
