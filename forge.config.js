
const icon_orig_path = "./icon/icon.png"
let icon_path = null

if (process.platform !== 'darwin'){
  const fs = require('fs')
  const pngToIco = require('png-to-ico')
  pngToIco(icon_orig_path)
    .then(buf => {
      fs.writeFileSync('./icon/icon.ico', buf);
    })
    .catch(console.error);
    icon_path="./icon/icon.ico"

} else {
    icon_path="./icon/icon.icns"
}

module.exports = {
    packagerConfig: {ignore: ["starlette_bokeh_server$",
                             "asgi.app$"],
                     icon: icon_path
    },
      makers: [
        {
          name: "@electron-forge/maker-squirrel",
          config: {
            name: "dashboard",
            setupExe: "dashboard.exe",
            noMSI: true,
            setupIcon: icon_path,
            loadingGif: "./icon/loading_icon.gif"
          }
        },
        {
            name: '@electron-forge/maker-dmg',
            platforms: [],
            config: {
                "format": 'ULFO'
              }
        },
        {
          name: "@electron-forge/maker-zip",
          platforms: [
            "darwin"
          ]
        },
        {
          name: "@electron-forge/maker-deb",
          platforms: [],
          config: {}
        },
        {
          name: "@electron-forge/maker-rpm",
          platforms: [],
          config: {}
        }
      ]
}
