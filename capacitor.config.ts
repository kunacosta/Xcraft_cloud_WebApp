
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.236074cf93c4415ba21bdf82f6f0c411',
  appName: 'forex-journal-galaxy',
  webDir: 'dist',
  server: {
    url: 'https://236074cf-93c4-415b-a21b-df82f6f0c411.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: null,
      keystoreAlias: null,
      keystorePassword: null,
      keystoreAliasPassword: null,
    }
  }
};

export default config;
