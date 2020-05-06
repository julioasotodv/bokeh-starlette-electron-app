// Create icons for different platforms:
const icon_orig_path = "./icon/icon.png"

if (process.platform === "darwin"){
    require('child_process').execFile("./create_icns.sh", [])
} else {
    const fs = require('fs')
    const pngToIco = require('png-to-ico')
    pngToIco(icon_orig_path)
        .then(buf => {
            fs.writeFileSync('./icon/icon.ico', buf);
        }).catch(console.error);
}