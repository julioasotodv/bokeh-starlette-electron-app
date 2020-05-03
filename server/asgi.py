import os
import sys

import uvicorn

## Only used if running Uvicorn programatically
if __name__ == "__main__":
    print(sys.argv)
    os.environ["BOKEH_SERVER_PORT"] = sys.argv[2]
    uvicorn.run("starlette_bokeh_server:app", host="localhost", port=int(sys.argv[1]), log_level="info")

"""
import asyncio
from hypercorn.asyncio import serve
from hypercorn.config import Config

from starlette_bokeh_server import app

config = Config()
config.bind = ["localhost:%s" % sys.argv[1]]
asyncio.run(serve(app, config))
"""