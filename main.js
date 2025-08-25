const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
    // Create the browser window
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        icon: path.join(__dirname, 'assets', 'icon.png'),
        show: false,
        titleBarStyle: 'default'
    });

    // Load the HTML file
    mainWindow.loadFile('boxshelvinv.html');

    // Show window when ready to prevent visual flash
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        
        // Focus on window
        if (process.platform === 'darwin') {
            app.focus();
        } else {
            mainWindow.focus();
        }
    });

    // Handle window closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Create application menu
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Export Inventory',
                    accelerator: 'CmdOrCtrl+E',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('exportInventory()');
                    }
                },
                {
                    label: 'Import Inventory',
                    accelerator: 'CmdOrCtrl+I',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('importInventory()');
                    }
                },
                { type: 'separator' },
                {
                    label: 'Exit',
                    accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Add Shelf',
                    accelerator: 'CmdOrCtrl+Shift+S',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('addShelf()');
                    }
                },
                {
                    label: 'Add Box',
                    accelerator: 'CmdOrCtrl+Shift+B',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('addBox()');
                    }
                },
                { type: 'separator' },
                {
                    label: 'Undo Delete',
                    accelerator: 'CmdOrCtrl+Z',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('undoDelete()');
                    }
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Toggle View Mode',
                    accelerator: 'CmdOrCtrl+T',
                    click: () => {
                        mainWindow.webContents.executeJavaScript('toggleViewMode()');
                    }
                },
                { type: 'separator' },
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click: () => {
                        mainWindow.reload();
                    }
                },
                {
                    label: 'Force Reload',
                    accelerator: 'CmdOrCtrl+Shift+R',
                    click: () => {
                        mainWindow.webContents.reloadIgnoringCache();
                    }
                },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I',
                    click: () => {
                        mainWindow.webContents.toggleDevTools();
                    }
                },
                { type: 'separator' },
                {
                    label: 'Actual Size',
                    accelerator: 'CmdOrCtrl+0',
                    click: () => {
                        mainWindow.webContents.zoomLevel = 0;
                    }
                },
                {
                    label: 'Zoom In',
                    accelerator: 'CmdOrCtrl+Plus',
                    click: () => {
                        const currentZoom = mainWindow.webContents.zoomLevel;
                        mainWindow.webContents.zoomLevel = currentZoom + 0.5;
                    }
                },
                {
                    label: 'Zoom Out',
                    accelerator: 'CmdOrCtrl+-',
                    click: () => {
                        const currentZoom = mainWindow.webContents.zoomLevel;
                        mainWindow.webContents.zoomLevel = currentZoom - 0.5;
                    }
                },
                { type: 'separator' },
                {
                    label: 'Toggle Fullscreen',
                    accelerator: process.platform === 'darwin' ? 'Ctrl+Cmd+F' : 'F11',
                    click: () => {
                        mainWindow.setFullScreen(!mainWindow.isFullScreen());
                    }
                }
            ]
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'About BoxShelvInv',
                    click: () => {
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'About BoxShelvInv',
                            message: 'BoxShelvInv v1.0.0',
                            detail: 'Smart Home Inventory Management\\n\\nA simple and efficient way to organize your belongings in shelves and boxes.\\n\\n© 2024 BoxShelvInv Team'
                        });
                    }
                },
                {
                    label: 'Learn More',
                    click: () => {
                        shell.openExternal('https://github.com/boxshelvinv/boxshelvinv');
                    }
                }
            ]
        }
    ];

    // macOS specific menu adjustments
    if (process.platform === 'darwin') {
        template.unshift({
            label: app.getName(),
            submenu: [
                {
                    label: 'About ' + app.getName(),
                    click: () => {
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'About BoxShelvInv',
                            message: 'BoxShelvInv v1.0.0',
                            detail: 'Smart Home Inventory Management\\n\\nA simple and efficient way to organize your belongings in shelves and boxes.\\n\\n© 2024 BoxShelvInv Team'
                        });
                    }
                },
                { type: 'separator' },
                {
                    label: 'Services',
                    submenu: []
                },
                { type: 'separator' },
                {
                    label: 'Hide ' + app.getName(),
                    accelerator: 'Command+H',
                    click: () => {
                        app.hide();
                    }
                },
                {
                    label: 'Hide Others',
                    accelerator: 'Command+Shift+H',
                    click: () => {
                        app.hideOthersExcept(mainWindow);
                    }
                },
                {
                    label: 'Show All',
                    click: () => {
                        app.showAllWindows();
                    }
                },
                { type: 'separator' },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        });

        // Window menu
        template[4].submenu.push(
            { type: 'separator' },
            {
                label: 'Bring All to Front',
                click: () => {
                    app.focus();
                }
            }
        );
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    // Handle external links
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });
}

// App event handlers
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
    contents.on('new-window', (event, navigationUrl) => {
        event.preventDefault();
        shell.openExternal(navigationUrl);
    });
});

// Handle certificate errors
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    event.preventDefault();
    callback(false);
});

// Prevent navigation to external websites
app.on('web-contents-created', (event, contents) => {
    contents.on('will-navigate', (event, navigationUrl) => {
        const parsedUrl = new URL(navigationUrl);
        
        if (parsedUrl.origin !== 'file://') {
            event.preventDefault();
        }
    });
});