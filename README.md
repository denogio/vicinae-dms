# Vicinae DMS Control Extension

A Vicinae extension for controlling DankMaterialShell via DMS IPC interface.

## Features

- **Wallpaper Management**: Set, cycle, and manage wallpapers
- **Theme Control**: Toggle between light and dark themes
- **Modal Controls**: Open and control shell modals (launcher, settings, clipboard, notifications, etc.)
- **Quick Actions**: Lock screen and toggle idle inhibit

## Installation

1. Navigate to the extension directory
2. Install dependencies: `npm install`
3. Start development mode: `npm run dev`
4. Or build for production: `npm run build`

## Requirements

- Vicinae installed and running
- DankMaterialShell installed and running
- DMS binary accessible (configured in preferences)

## Usage

Run the extension from Vicinae root search or use deeplinks:
- `vicinae://extensions/vicinae-dms/dms` - Main control
- `vicinae://extensions/vicinae-dms/dms-wallpaper` - Wallpaper controls
- `vicinae://extensions/vicinae-dms/dms-theme` - Theme controls
- `vicinae://extensions/vicinae-dms/dms-modals` - Modal controls
- `vicinae://extensions/vicinae-dms/dms-lock` - Lock screen
- `vicinae://extensions/vicinae-dms/dms-inhibit` - Toggle idle inhibit

## Configuration

Set the DMS binary path in extension preferences (default: `dms`).

## License

MIT
