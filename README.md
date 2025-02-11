# AR Control App Example

A simple React application for controlling AR features through a Twitch plugin. This app demonstrates how to interact with Snap Lenses and Video Animations through a REST API.

## Features

- Fetch and display user's inventory of Snap Lenses and Animations
- Activate and deactivate Snap Lenses
- Play Video Animations
- Simple, dependency-free implementation
- Basic error handling and loading states

## Prerequisites

- Node.js 16.0 or higher
- npm or yarn
- A valid API endpoint with authentication

## Quick Start

1. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or similar port if 5173 is taken).

## API Endpoints

The app interacts with the following endpoints:

- `GET /inventory/:id` - Fetch user's inventory
- `POST /activateLens` - Activate a Snap Lens
- `POST /disableLens` - Disable the active Snap Lens
- `POST /playVideoAnim` - Play a video animation

## Configuration

The app requires three pieces of configuration:

- `Remote ID`: The remote control identifier
- `Client ID`: The client identifier for API authentication

These values can be entered through the UI when the app is running.

## Project Structure

```
src/
  ├── App.tsx      # Main application component
  ├── App.css      # Styles
  └── main.tsx     # Entry point
```

## API Response Types

```typescript
interface Animation {
  id: string;
  name: string;
  thumbnail: string;
}

interface SnapLens {
  id: string;
  name: string;
  iconUrl?: string;
  preview?: any;
  snapcode?: any;
  voicemodId?: string;
  launchParams?: any;
}

interface InventoryAsset {
  userId: string;
  animations: TransformedAnimation[];
  snapLenses: TransformedSnapLens[];
}
```
