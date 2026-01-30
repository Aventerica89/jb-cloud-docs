---
title: Mobile App - LinkShort
description: React Native companion app for managing shortened links on iOS and Android
sidebar:
  order: 2
---

## Overview

The LinkShort Mobile App is a React Native companion app built with Expo, providing native iOS and Android access to your shortened links.

**Status**: In active development (Beta)

**Directory**: `/mobile-app` (within cf-url-shortener repository)

**Source Project**: `/Users/jb/cf-url-shortener/mobile-app`

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | Expo | ~50.0.0 |
| **Runtime** | React Native | 0.73.2 |
| **Navigation** | React Navigation | 6.x |
| **UI** | Custom components | Shadcn-inspired |
| **State** | React Hooks | - |
| **Storage** | Expo Secure Store | 12.8.1 |
| **Build** | EAS (Expo Application Services) | - |

## Features

### Phase 1 (In Progress)
- View all shortened links
- Search and filter by category/tag
- Quick copy short URL to clipboard
- View click analytics for each link
- Bottom tab navigation (Links, Analytics, Categories, Profile)
- Dark theme matching web UI
- Haptic feedback on interactions

### Planned (Phase 2)
- Create new short links
- Edit existing links
- Delete links
- Manage categories and tags
- QR code scanner
- Share links to other apps
- Offline mode with sync

## Project Structure

```
mobile-app/
├── App.js                  # Root component, navigation setup
├── app.json                # Expo configuration
├── eas.json                # EAS Build configuration
├── package.json            # Dependencies
├── src/
│   ├── screens/            # Screen components
│   │   ├── LinksScreen.js
│   │   ├── AnalyticsScreen.js
│   │   ├── CategoriesScreen.js
│   │   └── ProfileScreen.js
│   ├── components/         # Reusable components
│   │   ├── LinkCard.js
│   │   ├── CategoryBadge.js
│   │   └── SearchBar.js
│   ├── services/           # API clients
│   │   └── api.js
│   └── utils/              # Helpers
│       └── auth.js
└── assets/                 # Images, icons, fonts
```

## Setup

### Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli`
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
cd mobile-app
npm install
```

### Development

```bash
# Start Expo dev server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

### Testing on Device

**Option 1: Expo Go**
1. Install Expo Go app on your phone
2. Run `npm start`
3. Scan QR code with Expo Go

**Option 2: Expo Snack** (Web-based testing)
1. Open `snack-demo.js`
2. Visit [snack.expo.dev](https://snack.expo.dev)
3. Paste code to test on virtual devices

## Authentication

The mobile app uses the same Cloudflare Access authentication as the web app.

### Auth Flow

1. User taps "Sign In"
2. App opens Cloudflare Access login in web browser
3. User authenticates (Google, GitHub, etc.)
4. Browser redirects back to app with JWT token
5. App stores JWT in Expo Secure Store
6. All API requests include JWT in `Cf-Access-Jwt-Assertion` header

**Implementation**:
```javascript
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';

async function signIn() {
  const result = await WebBrowser.openAuthSessionAsync(
    'https://links.jbcloud.app/auth/login',
    'linkshort://auth/callback'
  );

  if (result.type === 'success') {
    const jwt = extractJWT(result.url);
    await SecureStore.setItemAsync('cf_access_jwt', jwt);
  }
}
```

## API Integration

The mobile app communicates with the same REST API as the web dashboard.

**Base URL**: `https://links.jbcloud.app/api`

### API Client

```javascript
// src/services/api.js
import * as SecureStore from 'expo-secure-store';

async function fetchAPI(endpoint, options = {}) {
  const jwt = await SecureStore.getItemAsync('cf_access_jwt');

  const response = await fetch(`https://links.jbcloud.app/api${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Cf-Access-Jwt-Assertion': jwt,
      ...options.headers,
    },
  });

  return response.json();
}

export const api = {
  getLinks: () => fetchAPI('/links'),
  getLink: (id) => fetchAPI(`/links/${id}`),
  createLink: (data) => fetchAPI('/links', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  // ... more methods
};
```

## Design System

The mobile app matches the web UI's dark Shadcn-inspired theme.

### Colors

```javascript
const colors = {
  background: '#0a0a0a',
  surface: '#18181b',
  surfaceHover: '#27272a',
  border: '#3f3f46',
  text: {
    primary: '#fafafa',
    secondary: '#a1a1aa',
    muted: '#71717a',
  },
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  success: '#22c55e',
  warning: '#eab308',
  error: '#ef4444',
};
```

### Typography

- **Font**: System default (San Francisco on iOS, Roboto on Android)
- **Sizes**: 12px, 14px, 16px, 20px, 24px, 32px
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Components

All components follow React Native best practices with custom styling to match web UI.

## Building for Production

### iOS

```bash
# Development build
eas build --platform ios --profile development

# Production build
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios
```

### Android

```bash
# Development build
eas build --platform android --profile development

# Production build
eas build --platform android --profile production

# Submit to Google Play
eas submit --platform android
```

### EAS Configuration

`eas.json`:
```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "production": {
      "distribution": "store"
    }
  },
  "submit": {
    "production": {}
  }
}
```

## Mockup Design

A detailed mobile app mockup is available in the project root:

**File**: `mobile-app-mockup.html`

Open in browser to view:
- Full UI design for all screens
- Dark theme color palette
- Component layouts
- Navigation structure
- Interaction patterns

This mockup serves as the design reference for the React Native implementation.

## Development Progress

### Completed
- Project scaffolding with Expo
- React Navigation setup
- Basic screen structure
- API service architecture
- Authentication flow design
- Expo Snack demo for testing
- Mobile mockup design

### In Progress
- Links screen UI implementation
- API integration with real endpoints
- Category and tag filtering
- Click analytics visualization

### Next Steps
1. Complete Links screen with full CRUD
2. Implement Analytics screen with charts
3. Add Categories management
4. Build Profile screen with settings
5. Test authentication flow end-to-end
6. Optimize for offline usage
7. Add haptic feedback
8. Beta testing on TestFlight/Play Console

## Testing

### Manual Testing

**Expo Snack** (Web-based):
- No local setup required
- Test on virtual iOS/Android devices
- Share link for remote testing

**Expo Go** (Physical devices):
- Install Expo Go from App Store/Play Store
- Scan QR code from `npm start`
- Real device testing

### Automated Testing (Planned)

- Jest for unit tests
- React Native Testing Library for component tests
- Detox for E2E tests

## Known Issues

1. **Auth redirect** - Deep linking needs testing on production builds
2. **Offline mode** - Not yet implemented
3. **Image optimization** - Need to optimize asset sizes for mobile
4. **Push notifications** - Planned for Phase 2

## Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Navigation Docs](https://reactnavigation.org)
- [EAS Build Guide](https://docs.expo.dev/build/introduction/)
- [Mockup Design](../mobile-app-mockup.html)

## Using with Claude Code

Claude Code can help you develop, test, and deploy the LinkShort mobile app.

### Development Setup

**Initialize the project:**
```bash
cd mobile-app
npm install
npm start
```

**Ask Claude Code for help:**
```
"Set up the mobile app development environment on a fresh Mac"
```

Claude Code will guide you through:
- Installing Expo CLI
- Setting up iOS Simulator
- Configuring Android Emulator
- EAS CLI setup

### Feature Implementation

**Build new screens:**
```
"Create the Analytics screen with:
- Click chart using victory-native
- Date range selector
- Top links list
- Export button
- Dark theme styling matching web UI"
```

**Add functionality:**
```
"Implement pull-to-refresh for the Links screen:
- RefreshControl component
- API call to fetch latest links
- Update state after refresh
- Show loading indicator"
```

### API Integration

**Connect to backend:**
```
"Set up the API client to connect to the Cloudflare Worker:
- Base URL configuration
- JWT authentication headers
- Error handling
- Retry logic"
```

**Test API calls:**
```bash
# Test from the mobile app
# Add console logging to API client
npm start

# Then in the running app:
# Trigger API call and check Metro bundler logs
```

### Authentication Flow

**Implement auth:**
```
"Build the authentication flow:
1. Open Cloudflare Access login in browser
2. Handle OAuth callback
3. Store JWT in Expo Secure Store
4. Attach JWT to all API requests
5. Refresh token when expired"
```

**Debug auth issues:**
```
"The auth redirect isn't working. Debug:
- Check deep link configuration in app.json
- Verify redirect URL in Cloudflare Access
- Test with expo-auth-session logs
- Validate JWT storage/retrieval"
```

### UI/UX Development

**Match web design:**
```
"Create a LinkCard component matching the web UI:
- Dark background (#18181b)
- Rounded corners (8px)
- Blue accent color (#3b82f6)
- Copy button with haptic feedback
- Long-press for options menu"
```

**Responsive layout:**
```
"Make the app layout responsive for:
- iPhone SE (small screen)
- iPhone 14 Pro (standard)
- iPhone 14 Pro Max (large)
- iPad (tablet mode)"
```

### Testing

**Manual testing workflow:**
```bash
# Test on iOS Simulator
npm run ios

# Test on Android Emulator
npm run android

# Test on physical device with Expo Go
npm start
# Scan QR code
```

**Write tests:**
```
"Create tests for the Links screen:
- Renders link list correctly
- Handles empty state
- Copy button works
- Pull-to-refresh triggers API call
- Error handling displays error message"
```

### Building for Production

**Configure EAS Build:**
```
"Set up EAS build profiles for:
- Development builds (internal testing)
- Preview builds (TestFlight/Play Console)
- Production builds (App Store/Google Play)"
```

**Build commands:**
```bash
# iOS development build
eas build --platform ios --profile development

# Android production build
eas build --platform android --profile production

# Both platforms
eas build --platform all --profile production
```

### Real-World Examples

**Example 1: Offline mode**
```
"Implement offline support:
- Cache links locally with AsyncStorage
- Queue create/update actions when offline
- Sync when connection restored
- Show offline indicator in UI"
```

**Example 2: Share sheet**
```
"Add share functionality:
- Share link to other apps
- Generate QR code for sharing
- Copy link to clipboard
- Share analytics image"
```

**Example 3: Push notifications**
```
"Set up push notifications for:
- New link created
- Link clicked (threshold reached)
- Weekly summary
- Configure Expo push notifications"
```

### Debugging

**Debug common issues:**
```bash
# Clear Metro bundler cache
npm start -- --clear

# Reset Expo cache
expo start -c

# Check logs
# iOS: Use Xcode Console
# Android: Use Logcat
adb logcat
```

**Ask Claude Code for help:**
```
"The app crashes when opening the Analytics screen. Help me debug:
- Check component imports
- Verify API response format
- Add error boundaries
- Check state updates"
```

### Performance Optimization

**Optimize rendering:**
```
"Optimize the LinksList component for 1000+ items:
- Implement FlatList with virtualization
- Add item separators
- Optimize re-renders with React.memo
- Lazy load images"
```

**Profile performance:**
```
"Use React DevTools Profiler to identify:
- Slow components
- Unnecessary re-renders
- Heavy computations
- Memory leaks"
```
