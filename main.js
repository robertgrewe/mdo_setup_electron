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
                          webPreferences: {
                                devTools: true
                              },
                          // icon: __dirname + ‘/images/favicon.png’ // does not work!!!
                          })
  //win.setMenu(null); //switch off menu
  win.maximize(); //full screen
  // win.webContents.openDevTools(); // start dev tools by default

  win.loadURL(url.format({
    // pathname: path.join(__dirname, 'landing_page.html'),
    pathname: path.join(__dirname, 'index.html'),
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

ipcMain.on('openFolder', (event, id) => {
  const {dialog} = require('electron')

  // console.log(id)

  dialog.showOpenDialog(win, {
    properties: ['openDirectory']
  },
  paths => respondWithPath(paths)
  );

  function respondWithPath(paths) {
    event.sender.send('folderData', paths, id)
  }
})

// initialize optimization
ipcMain.on('InitializeOptimization', (event, pathname_working_directory) => {
  console.log('Working directory: ' + pathname_working_directory)

  // define execution command
  // exec_command = "opt_tools -v alpha init_optimization_turbine -i config.yml"
  // exec_command = "cd " + pathname_working_directory + " && dir"
  exec_command = "dir"
  // exec_command = "FOR /L %N IN () DO @echo Oops"
  // exec_command = "dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir && dir"
  // exec_command = "timeout 5"
  // exec_command = "timeout /t 5"

  // show log
  console.log('Executing the following command:')
  console.log(exec_command)

  // execute command
  executeCommand(event, exec_command, pathname_working_directory)

})

function executeCommand(event, exec_command, cwd){
  // function to execute a system command

  const { exec } = require('child_process');
  exec(exec_command,
    {
            cwd: cwd
        },
    (err, stdout, stderr) => {
    if (err) {
      //some err occurred
      console.error(err);
      event.sender.send('initOptimizationFailed');

    } else {
     // the *entire* stdout and stderr (buffered)
     console.log(`stdout: ${stdout}`);
     console.log(`stderr: ${stderr}`);
     event.sender.send('initOptimizationSuccess');
    }
  });

}
