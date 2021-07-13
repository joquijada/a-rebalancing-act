#!/bin/bash

script=$1
out_path==/tmp/$script-out.js
npx esbuild --platform=node --bundle --outfile=$out_path $script
node $out_path 
