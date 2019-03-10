// @flow
import electron, { app, Menu, shell, BrowserWindow, dialog } from 'electron';
import markdownpdf from 'markdown-pdf';
import ipc from 'electron-better-ipc';
import fs from 'fs';
import marked from 'marked';

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu() {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment() {
    this.mainWindow.openDevTools();
    this.mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.inspectElement(x, y);
          }
        }
      ]).popup(this.mainWindow);
    });
  }

  //macs
  buildDarwinTemplate() {
    const subMenuAbout = {
      label: 'Electron',
      submenu: [
        {
          label: 'Save',
          accelerator: 'Command+S',
          click: async () => {
            const win = electron.BrowserWindow.getFocusedWindow();
            await ipc.callRenderer(win, 'save');
          }
        },
        {
          label: 'Save All',
          accelerator: 'Ctrl+Shift+S',
          click: async () => {
            const win = electron.BrowserWindow.getFocusedWindow();
            await ipc.callRenderer(win, 'save all');
          }
        },
        {
          label: 'Export',
          click: async () => {
            //open a new dialoge here
            try {
              const win = electron.BrowserWindow.getFocusedWindow();
              let notes = await ipc.callRenderer(win, 'export');
              let options = {
                title: 'Export As...',
                buttonLabel: 'export',
                filters: [
                  { name: 'Markdown', extensions: ['md'] },
                  { name: 'Text', extensions: ['txt'] },
                  { name: 'Custom File Type', extensions: ['as'] },
                  { name: 'All Files', extensions: ['*'] }
                ]
              };
              let filePath = dialog.showSaveDialog(this.mainWindow, options);
              fs.writeFileSync(filePath, notes.notes, 'binary', err => {
                console.error(err);
              });
              console.log('Success in writing file');
            } catch (err) {
              console.error(err);
            }
          }
        },
        { type: 'separator' },
        {
          label: 'About ElectronReact',
          selector: 'orderFrontStandardAboutPanel:'
        },
        { type: 'separator' },
        { label: 'Services', submenu: [] },
        { type: 'separator' },
        {
          label: 'Hide ElectronReact',
          accelerator: 'Command+H',
          selector: 'hide:'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:'
        },
        { label: 'Show All', selector: 'unhideAllApplications:' },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    };
    const subMenuEdit = {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
        {
          label: 'Select All',
          accelerator: 'Command+A',
          selector: 'selectAll:'
        }
      ]
    };
    const subMenuViewDev = {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Command+R',
          click: () => {
            this.mainWindow.webContents.reload();
          }
        },
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Command+I',
          click: () => {
            this.mainWindow.toggleDevTools();
          }
        }
      ]
    };
    const subMenuViewProd = {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          }
        }
      ]
    };
    const subMenuWindow = {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:'
        },
        { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
        { type: 'separator' },
        { label: 'Bring All to Front', selector: 'arrangeInFront:' }
      ]
    };
    const subMenuHelp = {
      label: 'Help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            shell.openExternal('http://electron.atom.io');
          }
        },
        {
          label: 'Documentation',
          click() {
            shell.openExternal(
              'https://github.com/atom/electron/tree/master/docs#readme'
            );
          }
        },
        {
          label: 'Community Discussions',
          click() {
            shell.openExternal('https://discuss.atom.io/c/electron');
          }
        },
        {
          label: 'Search Issues',
          click() {
            shell.openExternal('https://github.com/atom/electron/issues');
          }
        }
      ]
    };

    const subMenuView =
      process.env.NODE_ENV === 'development' ? subMenuViewDev : subMenuViewProd;

    return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
  }
  //windows and others
  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: '&File',
        submenu: [
          {
            label: '&Open',
            accelerator: 'Ctrl+O',
            click: async () => {
              const options = {
                title: 'Open...',
                defaultPath: 'C:\\',
                buttonLabel: 'Open',
                filters: [
                  { name: 'Markdown/Text', extensions: ['md', 'txt'] },
                  { name: 'All Files', extensions: ['*'] }
                ],
                properties: ['openFile']
              };
              //this returns an array so get the first element
              // console.log(marked(data), 'data from my file'); //this gives me html which is cool
              let openPath = dialog.showOpenDialog(this.mainWindow, options);
              await fs.readFile(openPath[0], 'utf-8', async (err, data) => {
                if (err) throw err;
                const win = electron.BrowserWindow.getFocusedWindow();
                await ipc.callRenderer(win, 'open', data);
              });
            }
          },
          {
            label: '&Save',
            accelerator: 'Ctrl+S',
            click: async () => {
              const win = electron.BrowserWindow.getFocusedWindow();
              await ipc.callRenderer(win, 'save');
            }
          },
          {
            label: '&Save All',
            accelerator: 'Ctrl+Shift+S',
            click: async () => {
              const win = electron.BrowserWindow.getFocusedWindow();
              await ipc.callRenderer(win, 'save all');
            }
          },
          {
            label: '&Export',
            click: async () => {
              //open a new dialoge here
              try {
                const win = electron.BrowserWindow.getFocusedWindow();
                let notes = await ipc.callRenderer(win, 'export');
                if (!notes) {
                  //if none is selected
                  const errorOptions = {
                    type: 'error',
                    message: 'No note selected!'
                  };
                  dialog.showMessageBox(this.mainWindow, errorOptions);
                } else {
                  let options = {
                    title: 'Export As...',
                    buttonLabel: 'export',
                    defaultPath: 'C:\\Untitled',
                    filters: [
                      { name: 'Markdown', extensions: ['md'] },
                      { name: 'Text', extensions: ['txt'] },
                      { name: 'Custom File Type', extensions: ['as'] },
                      { name: 'All Files', extensions: ['*'] }
                    ]
                  };
                  let filePath = dialog.showSaveDialog(
                    this.mainWindow,
                    options
                  );
                  // console.log(marked(notes.notes, {headerIds: false}), 'notes marked');//this saves as html but we can do that later on

                  fs.writeFileSync(filePath, notes.notes, 'binary', err => {
                    console.error(err);
                  });
                  console.log('Success in writing file');
                }
              } catch (err) {
                console.error(err);
              }
            }
          },
          { type: 'separator' },
          {
            label: '&Close',
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close();
            }
          }
        ]
      },
      {
        label: '&View',
        submenu:
          process.env.NODE_ENV === 'development'
            ? [
                {
                  label: '&Reload',
                  accelerator: 'Ctrl+R',
                  click: () => {
                    this.mainWindow.webContents.reload();
                  }
                },
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  }
                },
                {
                  label: 'Toggle &Developer Tools',
                  accelerator: 'Alt+Ctrl+I',
                  click: () => {
                    this.mainWindow.toggleDevTools();
                  }
                }
              ]
            : [
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  }
                }
              ]
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'Learn More',
            click() {
              shell.openExternal('http://electron.atom.io');
            }
          },
          {
            label: 'Documentation',
            click() {
              shell.openExternal(
                'https://github.com/atom/electron/tree/master/docs#readme'
              );
            }
          },
          {
            label: 'Community Discussions',
            click() {
              shell.openExternal('https://discuss.atom.io/c/electron');
            }
          },
          {
            label: 'Search Issues',
            click() {
              shell.openExternal('https://github.com/atom/electron/issues');
            }
          }
        ]
      }
    ];

    return templateDefault;
  }
}
