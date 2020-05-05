
let icon_path = null

if (process.platform !== 'darwin'){
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
            name: "dashboard"
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
