#!/usr/bin/env bash
rm -rf ./dist;
../node_modules/webpack/bin/webpack.js --mode development #production
mkdir -p dist/libs/mqtt;cp src/libs/mqtt/mqttws31.js dist/libs/mqtt
