#!/bin/bash

rm -rf asgi.spec
rm -rf build
rm -rf ../starlette_bokeh_server_dist

#--onefile \
pyinstaller \
  --windowed \
  --onedir \
  --additional-hooks-dir pyinstaller_extra_hooks \
  --hidden-import starlette.applications \
  --hidden-import starlette.templating \
  --hidden-import starlette.staticfiles \
  --hidden-import uvicorn.logging \
  --hidden-import uvicorn.loops \
  --hidden-import uvicorn.loops.auto \
  --hidden-import uvicorn.loops.asyncio \
  --hidden-import uvicorn.loops.uvloop \
  --hidden-import uvicorn.protocols \
  --hidden-import uvicorn.protocols.http \
  --hidden-import uvicorn.protocols.http.auto \
  --hidden-import uvicorn.protocols.http.h11_impl \
  --hidden-import uvicorn.protocols.http.httptools_impl \
  --hidden-import uvicorn.protocols.websockets \
  --hidden-import uvicorn.protocols.websockets.auto \
  --hidden-import uvicorn.protocols.websockets.websockets_impl \
  --hidden-import uvicorn.protocols.websockets.wsproto_impl \
  --hidden-import uvicorn.lifespan \
  --hidden-import uvicorn.lifespan.on \
  --hidden-import uvicorn.lifespan.off \
  --distpath ../starlette_bokeh_server_dist \
  --add-data starlette_bokeh_server.py:. \
  --add-data static:static \
  --add-data templates:templates \
  asgi.py

