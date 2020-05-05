#!/bin/bash

if [ "$(uname)" == "Darwin" ]; then
  echo "Creating icon for app..."
  mkdir -p icon/icon.iconset
  sips -z 16 16     icon/icon.png --out icon/icon.iconset/icon_16x16.png
  sips -z 32 32     icon/icon.png --out icon/icon.iconset/icon_16x16@2x.png
  sips -z 32 32     icon/icon.png --out icon/icon.iconset/icon_32x32.png
  sips -z 64 64     icon/icon.png --out icon/icon.iconset/icon_32x32@2x.png
  sips -z 128 128   icon/icon.png --out icon/icon.iconset/icon_128x128.png
  sips -z 256 256   icon/icon.png --out icon/icon.iconset/icon_128x128@2x.png
  sips -z 256 256   icon/icon.png --out icon/icon.iconset/icon_256x256.png
  sips -z 512 512   icon/icon.png --out icon/icon.iconset/icon_256x256@2x.png
  sips -z 512 512   icon/icon.png --out icon/icon.iconset/icon_512x512.png
  cp icon/icon.png icon/icon.iconset/icon_512x512@2x.png
  iconutil -c icns icon/icon.iconset
  rm -r icon/icon.iconset
  echo "Icon created."
fi

npm run make

