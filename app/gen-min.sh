#!/bin/bash

SCRIPT_PATH=$(realpath $0)
SCRIPT_DIR=$(dirname $SCRIPT_PATH)

MIN_FILE="$SCRIPT_DIR/dash.min.js"

pushd $SCRIPT_DIR/../scripts > /dev/null

npx uglify-js --compress -- \
   dotnet-random.js locations.js items.js loadout.js \
   logic.js majorMinorLogic.js fullLogic.js \
   modeStandard.js modeRecall.js \
   bps-patch.js ips-patch.js sm-rando.js > $MIN_FILE

popd > /dev/null
