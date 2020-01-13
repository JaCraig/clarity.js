@ECHO OFF
call parcel build build/less/Clarity.min.less --out-dir ./dist/css
call parcel build build/ts/Framework/Clarity.min.ts --out-dir ./dist/js
call parcel build build/index.html --out-dir ./out