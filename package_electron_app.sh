#!/bin/bash

./node_modules/.bin/electron-packager . \
  --overwrite \
  --ignore="starlette_bokeh_server$" \
  --ignore="asgi.app$"
