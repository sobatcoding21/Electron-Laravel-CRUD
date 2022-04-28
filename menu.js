const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron');
const path = require('path')
const isMac = process.platform === 'darwin'
const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Console',
        role: 'toggleDevTools',
      },
      {
        label: 'Refresh',
        role: 'reload',
      },
      {
        label: 'Exit',
        role: isMac ? 'close' : 'quit',
      }
    ]
  },
  {
    label: 'CRUD',
    submenu: [
      {
        label: 'List Data',
        click: function (menuItem, browserWindow, event) {
          browserWindow.webContents.send('add-tab', {
            title: 'Data table',
            id: 'table',
            src: path.resolve( __dirname, "./app/views/table.html"),
            visible: true
          })          
        }
      },
      {
        label: 'Add Data',
        click: function (menuItem, browserWindow, event) {
          browserWindow.webContents.send('add-tab', {
            title: 'Form Data',
            id: 'form',
            src: path.resolve( __dirname, "./app/views/form.html"),
            visible: true
          })          
        }
      }
    ]
  }
];

module.exports = Menu.buildFromTemplate(template);

