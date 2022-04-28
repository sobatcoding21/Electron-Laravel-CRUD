// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron')
const path = require('path')
var appmenu = require( path.resolve( __dirname, "./menu.js" ) )

let mainWindow
let loginWindow

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        webviewTag: true
        
    }
  })

  // and load the index.html of the app.
  mainWindow.setMenu(appmenu)
  mainWindow.maximize();
  mainWindow.loadFile('./app/views/index.html')
  mainWindow.show()

  loginWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    javascript : true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
      
    }
  })

  loginWindow.loadFile('./app/views/login.html')
  loginWindow.show()
  loginWindow.setMenu(null)
  loginWindow.maximize();

  loginWindow.on('close', (event) => { 
    
    let options = {}
    options.type = "question"
    options.buttons = ["&Yes","&No"]
    options.defaultId = 1
    options.cancelId = 1
    options.title = "Information"
    options.message = "Do you really want to quit?"

    let response = dialog.showMessageBoxSync(loginWindow, options);
    if( response == 1 ) event.preventDefault()
    if( response == 0 ) {
      if (process.platform !== 'darwin') app.quit()
    }
     
  })

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  //Menu.setApplicationMenu(appmenu)
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

/** Message */
ipcMain.on('login', (evt, arg) => {
  const options = {
      type: "info",
      buttons: ["OK"],
      title: "Login success!",
      message: 'Login success'
  }
  dialog.showMessageBox(loginWindow, options)
  loginWindow.hide()
})

ipcMain.on('login-error', (evt, arg) => {
  const options = {
      type: "info",
      buttons: ["OK"],
      title: "Login failed!",
      message: 'Invalid username/password'
  }
  dialog.showMessageBox(loginWindow, options)
})

ipcMain.on('message', (evt, arg) => {
    const options = {
        type: "info",
        buttons: ["OK"],
        title: "Info",
        message: arg.message
    }
    dialog.showMessageBox(loginWindow, options)
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.