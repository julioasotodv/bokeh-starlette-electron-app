#!/bin/bash

ORIGIN_PNG=$1
DEST_PNG=$2
DEST_PNG_HIRES=$3
DEST_TIFF=$4

if [ "$(uname)" == "Darwin" ]; then
  sips -z 300 500 $ORIGIN_PNG --out $DEST_PNG
  cp $ORIGIN_PNG $DEST_PNG_HIRES
  tiffutil -cathidpicheck $DEST_PNG $DEST_PNG_HIRES -out $DEST_TIFF
fi
