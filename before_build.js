// Create icons for different platforms:
const icon_orig_path = "./icon/icon.png"
const dmg_orig_path = "./icon/dmg_background.png"

if (process.platform === "darwin"){
    require('child_process').execFile("./create_icns.sh", 
                                      [icon_orig_path])

    // DMG image background:
    var dmg_dest_png = dmg_orig_path.replace(".png", "") + "_dest.png"
    var dmg_dest_png_hires = dmg_orig_path.replace(".png", "") + "_dest@2x.png"
    var dmg_dest_tiff = dmg_orig_path.replace(".png", ".tiff")

    require("child_process").execFile("./create_dmg_background.sh",
                                        [dmg_orig_path,
                                         dmg_dest_png,
                                         dmg_dest_png_hires,
                                         dmg_dest_tiff])
} else {
    const fs = require('fs')
    const pngToIco = require('png-to-ico')
    pngToIco(icon_orig_path)
        .then(buf => {
            fs.writeFileSync('./icon/icon.ico', buf);
        }).catch(console.error);
}