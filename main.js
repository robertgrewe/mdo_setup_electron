const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

//const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win;

function createWindow () {

  win = new BrowserWindow({width: 1200,
                          height: 700,
                          // icon: __dirname + ‘/images/favicon.png’ // does not work!!!
                          })
  //win.setMenu(null); //switch off menu
  win.maximize(); //full screen

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'landing_page.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.on('closed', () => {
    win = null
  });
}

app.on('ready', createWindow);


// works
// const { shell } = require('electron')
// shell.openExternal('https://www.google.com')

// const { exec } = require('child_process');
// exec('/usr/bin/chromium-browser https://example.com', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`exec error: ${error}`);
//         return;
//         }
//     console.log(`stdout: ${stdout}`);
//     console.log(`stderr: ${stderr}`);
//     });
//
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});


const {ipcMain} = require('electron')

ipcMain.on('openFolder', (event, path) => {
 const {dialog} = require('electron')

  dialog.showOpenDialog(win, {
    properties: ['openDirectory']
  },
    paths => respondWithPath(paths)
  );

function respondWithPath(paths) {
  event.sender.send('folderData', paths)
}
})
