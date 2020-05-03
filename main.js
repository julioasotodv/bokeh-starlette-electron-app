const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')


let mainWindow = null
const createWindow = () => {
  mainWindow = new BrowserWindow({width: 1200, height: 800})
  mainWindow.loadURL(require('url').format({
    pathname: path.join(__dirname, "server", "templates", 'redirect_to_bokeh_server.html'),
    protocol: 'file:',
    slashes: true
  }))
  //mainWindow.loadURL("http://localhost:8000")
  //mainWindow.webContents.openDevTools()
  mainWindow.setMenu(null);
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// Python proc

let pyProc = null
let pyPort = null

var portfinder = require('portfinder');

portfinder.getPort(function(err, port) {
  uvicorn_port = '' + port
});

portfinder.getPort(function(err, port) {
  bokeh_port = '' + port
});

const createPyProc = () => {
  let script = 'asgi.py'
  console.log(uvicorn_port)
  console.log(bokeh_port)
  mainWindow.bokeh_server_port = bokeh_port;
  pyProc = require('child_process').spawn('python', [script, uvicorn_port, bokeh_port], {"cwd": path.join(__dirname, "server")})
  if (pyProc != null) {
    console.log('child process success')
  }
}

const exitPyProc = () => {
  pyProc.kill()
  pyProc = null
  pyPort = null
}


app.on('ready', createPyProc)
app.on('will-quit', exitPyProc)

