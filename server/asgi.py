import os
import sys

import uvicorn

import socket

import pandas as pd

# Bokeh plotting imports
import bokeh

# Holoviz imports
import holoviews
import hvplot
import pyviz_comms
import param
import panel

# Starlette imports
import starlette

# Tornado imports
import tornado

# Jinja imports
import jinja2

## Only used if running Uvicorn programatically
if __name__ == "__main__":
    print(sys.argv)
    os.environ["BOKEH_SERVER_PORT"] = sys.argv[2]
    uvicorn.run("starlette_bokeh_server:app", host="localhost", port=int(sys.argv[1]), log_level="info")
