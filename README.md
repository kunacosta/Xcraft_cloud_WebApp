
# Forex Trading Journal - Mobile App

This forex trading journal app allows you to track and analyze your trades on both web and mobile devices.

## Running the Mobile App

To run this app on a mobile device, follow these steps:

### Prerequisites

- Node.js and NPM installed
- For Android: Android Studio installed
- For iOS: Xcode installed (Mac only)

### Steps to Run the App

1. Clone this repository to your local machine
2. Install dependencies:
   ```
   npm install
   ```
3. Build the web app:
   ```
   npm run build
   ```
4. Sync the build with Capacitor:
   ```
   npx cap sync
   ```
5. Add Android platform (if not already added):
   ```
   npx cap add android
   ```
6. Open the project in Android Studio:
   ```
   npx cap open android
   ```
7. Run the app on your device or emulator from Android Studio

### Development

During development, you can make changes to the web app and then:

1. Rebuild the web app:
   ```
   npm run build
   ```
2. Sync with Capacitor:
   ```
   npx cap sync
   ```
3. Run on your device again

## Features

- Track forex trades with detailed metrics
- Analyze performance with visual charts
- Review trading history
- Identify patterns in your trading behavior
- Mobile-friendly design

