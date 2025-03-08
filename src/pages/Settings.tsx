
import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { DataManagementCard } from '@/components/settings/DataManagementCard';
import { AboutCard } from '@/components/settings/AboutCard';

const Settings = () => {
  return (
    <div className="container py-8 space-y-8 animate-fadeIn">
      <div className="flex items-center space-x-2">
        <SettingsIcon className="h-6 w-6 text-xcraft-secondary" />
        <h1 className="text-3xl font-bold font-montserrat">Settings</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DataManagementCard />
        <AboutCard />
      </div>
    </div>
  );
};

export default Settings;
