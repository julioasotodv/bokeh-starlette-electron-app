const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')

app.allowRendererProcessReuse = true // As false is deprecated. However, this
                                     // doesn't help with the "white flash" shown
                                     // before the bokeh document, as it only
                                     // reuses renderer processes in the same
                                     // page (host:port)

const iconPath = require("url").format({
  pathname: path.join(__dirname, "icon", "icon.png"),
  protocol: "file:",
  slashes: true
})

const iconImage = electron.nativeImage.createFromPath(iconPath)


let mainWindow = null
const createWindow = () => {
  mainWindow = new BrowserWindow({width: 1200, 
                                  height: 800,
                                  //icon: iconImage, // TODO: test in windows and mac
                                  backgroundColor: "#000000",
                                  show: false,
                                  webPreferences: {
                                    nodeIntegration: true
                                  }})
  //mainWindow.loadURL("http://localhost:8000")
  mainWindow.loadURL(require('url').format({
    pathname: htmlFile,
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.webContents.openDevTools()
  mainWindow.uvicorn_server_port = uvicornPort;
  mainWindow.bokeh_server_port = bokehPort;
  mainWindow.setMenu(null);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show()
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}


// 
// PYTHON PROCESS
//

// Check if python is packaged with PyInstaller or not:
const PY_DIST_FOLDER = "starlette_bokeh_server_dist"
const PY_SRC_FOLDER = "starlette_bokeh_server"
const PY_MODULE = "asgi"


const guessIfPackaged= () => {
  const fullPath = path.join(__dirname, PY_DIST_FOLDER)
  return require("fs").existsSync(fullPath)
}

const getScriptName = () => {
  if (!guessIfPackaged()) {
    return PY_MODULE + ".py"
  }

  if (process.platform === "win32") {
    return PY_MODULE + ".exe"
  }

  return PY_MODULE
}

// ELECTRON: load initial html depending whether
// the Python is packaged or not:
let htmlFile = null
if (guessIfPackaged()) {
  htmlFile = path.join(__dirname, PY_DIST_FOLDER, PY_MODULE, "templates", 'redirect_to_bokeh_server.html')
} else {
  htmlFile = path.join(__dirname, PY_SRC_FOLDER, "templates", 'redirect_to_bokeh_server.html')
}

// Get available ports for Python server:
var portfinder = require('portfinder');

let uvicornPort = null
let bokehPort = null

portfinder.getPort(function(err, port) {
  uvicornPort = '' + port;
  portfinder.getPort({port: port + 1,
                      endPort: 65535}, function(err, otherport) {
    bokehPort = '' + otherport;
  })
});

// Spawn Python process:

let pyProc = null

const createPyProc = () => {
  let script = getScriptName()

  console.log(uvicornPort)
  console.log(bokehPort)
  

  if (guessIfPackaged()) {
    let exec_path = path.join(__dirname, PY_DIST_FOLDER, PY_MODULE)
    pyProc = require('child_process').execFile(path.join(exec_path, script), 
                                               [uvicornPort, bokehPort], 
                                               {"cwd": exec_path},
                                               )
    // For debug after packaging; but we have to change
    // execFile for spawn in order to see logs
    /*pyProc.stderr.on('data', function(data) {
    console.log(data.toString());
  }); 
  */                                          
  } else {
    pyProc = require('child_process').spawn('python', 
                                            [script, uvicornPort, bokehPort], 
                                            {"cwd": path.join(__dirname, PY_SRC_FOLDER)})
  }
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

