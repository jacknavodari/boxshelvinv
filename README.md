# BoxShelvInv - Smart Home Inventory Management

A beautiful and intuitive desktop application for managing your home inventory across shelves and boxes.

## Features

- 📚 **Shelf Management**: Create and organize multiple shelves
- 📦 **Box Management**: Create and organize multiple boxes  
- 🔍 **Smart Search**: Search across all items, shelves, and boxes
- 💾 **JSON Export/Import**: Save and load your inventory data
- ↶ **Undo Delete**: Recover accidentally deleted items
- 📱 **Responsive Design**: Works on different screen sizes
- ⚡ **Fast & Lightweight**: Built with modern web technologies

## Installation

### Option 1: Use Pre-built Installer (Recommended)
1. Download the latest `BoxShelvInv Setup.exe` from the releases
2. Run the installer and follow the setup wizard
3. Launch BoxShelvInv from your desktop or start menu

### Option 2: Build from Source

#### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)

#### Steps
1. Clone or download this repository
2. Open Command Prompt or PowerShell in the project folder
3. Run the build script:
   ```bash
   build-installer.bat
   ```
   
   Or manually:
   ```bash
   npm install
   npm run build-win
   ```

4. Find the installer in the `dist` folder

## Usage

### Basic Operations
- **Add Shelf**: Click "📚 Add Shelf" to create a new shelf
- **Add Box**: Click "📦 Add Box" to create a new box
- **Add Items**: Click on a shelf/box to expand it, then add items
- **Search**: Use the search bar to find specific items
- **Delete**: Use the delete buttons to remove items, boxes, or shelves
- **Undo**: Click "↶ Undo Delete" to restore recently deleted items

### Data Management
- **Export**: Click "💾 Export JSON" to save your inventory to a file
- **Import**: Click "📁 Import JSON" to load inventory from a file
- **Backup**: Regular exports serve as backups of your data

### View Modes
- **Minimize All**: Compact view showing only counts
- **Expand All**: Detailed view showing all items
- **Individual Toggle**: Click on any shelf/box to toggle its view

## Data Storage

- **Local Storage**: Data is automatically saved to your browser's local storage
- **JSON Files**: Export/import functionality allows for external backups
- **Cross-Device**: Use JSON export/import to sync between different devices

## Keyboard Shortcuts

- **Ctrl+E**: Export inventory
- **Ctrl+I**: Import inventory
- **Ctrl+Shift+S**: Add new shelf
- **Ctrl+Shift+B**: Add new box
- **Ctrl+Z**: Undo delete
- **Ctrl+T**: Toggle view mode
- **Ctrl+R**: Reload application
- **F11**: Toggle fullscreen

## File Structure

```
boxshelvinv/
├── boxshelvinv.html    # Main application file
├── main.js             # Electron main process
├── package.json        # Node.js dependencies and build config
├── build-installer.bat # Windows build script
├── assets/             # Application icons
└── dist/              # Built installers (created after build)
```

## Technical Details

- **Framework**: Electron
- **UI**: HTML5, CSS3, JavaScript
- **Build Tool**: electron-builder
- **Package Manager**: npm
- **Platform**: Windows (primary), macOS and Linux (configurable)

## Development

### Running in Development Mode
```bash
npm install
npm start
```

### Building for Different Platforms
```bash
# Windows
npm run build-win

# All platforms
npm run build
```

## Troubleshooting

### Common Issues
1. **Build Fails**: Ensure Node.js and npm are properly installed
2. **App Won't Start**: Check that all dependencies are installed (`npm install`)
3. **Import Fails**: Ensure JSON file is valid BoxShelvInv format
4. **Data Lost**: Check browser's local storage or restore from JSON backup

### Support
If you encounter issues:
1. Check that you're using a supported Node.js version (16+)
2. Try deleting `node_modules` folder and running `npm install` again
3. Ensure you have sufficient disk space for the build process

## License

MIT License - Feel free to modify and distribute.

## Version History

- **v1.0.0**: Initial release with core inventory management features
  - Shelf and box management
  - Item tracking
  - Search functionality
  - JSON export/import
  - Windows installer support

---

**Enjoy organizing your home inventory with BoxShelvInv! 🏠📦**