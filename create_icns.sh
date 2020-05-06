#!/bin/bash

ORIGIN_PNG=$1

if [ "$(uname)" == "Darwin" ]; then
  mkdir -p icon/icon.iconset
  sips -z 16 16     ${ORIGIN_PNG} --out icon/icon.iconset/icon_16x16.png
  sips -z 32 32     ${ORIGIN_PNG} --out icon/icon.iconset/icon_16x16@2x.png
  sips -z 32 32     ${ORIGIN_PNG} --out icon/icon.iconset/icon_32x32.png
  sips -z 64 64     ${ORIGIN_PNG} --out icon/icon.iconset/icon_32x32@2x.png
  sips -z 128 128   ${ORIGIN_PNG} --out icon/icon.iconset/icon_128x128.png
  sips -z 256 256   ${ORIGIN_PNG} --out icon/icon.iconset/icon_128x128@2x.png
  sips -z 256 256   ${ORIGIN_PNG} --out icon/icon.iconset/icon_256x256.png
  sips -z 512 512   ${ORIGIN_PNG} --out icon/icon.iconset/icon_256x256@2x.png
  sips -z 512 512   ${ORIGIN_PNG} --out icon/icon.iconset/icon_512x512.png
  cp ${ORIGIN_PNG} icon/icon.iconset/icon_512x512@2x.png
  iconutil -c icns icon/icon.iconset
  rm -r icon/icon.iconset
fi

