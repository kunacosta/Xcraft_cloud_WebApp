
import React from 'react';
import { Settings as SettingsIcon, Sliders, User, Tablet, Database, ShieldCheck } from 'lucide-react';
import { DataManagementCard } from '@/components/settings/DataManagementCard';
import { AboutCard } from '@/components/settings/AboutCard';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Settings = () => {
  return (
    <div className="container py-10 space-y-8 animate-fadeIn">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <SettingsIcon className="h-5 w-5 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold font-poppins text-gray-800">Settings</h1>
      </div>
      
      <Tabs defaultValue="data">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full sm:w-auto bg-gray-100">
            <TabsTrigger value="data" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Database className="h-4 w-4" /> Data
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2 data-[state=active]:bg-white">
              <ShieldCheck className="h-4 w-4" /> About
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="data" className="space-y-4">
          <DataManagementCard />
        </TabsContent>
        
        <TabsContent value="about" className="space-y-4">
          <AboutCard />
        </TabsContent>
      </Tabs>
      
      <div className="text-xs text-center text-gray-400 pt-4">
        <p>Xcraft Trading Journal - Your data is stored locally in your browser</p>
      </div>
    </div>
  );
};

export default Settings;
