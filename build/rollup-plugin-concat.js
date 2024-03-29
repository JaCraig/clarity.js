// import { createFilter } from '@rollup/pluginutils';
import fs from 'fs';
import os from 'os';
import path from 'path';

var ensureTrailingNewLine = function(code) {
  if (!code.endsWith(os.EOL)) code += os.EOL;
  return code;
};

var load = function(path) {
    let data=fs.readFileSync(path,"utf8");
    let code=ensureTrailingNewLine(data.toString());
    return concatFiles(code, path);
};

var concatFiles = function(code, id) {
    if(id === undefined)
        return code;
    let dir = path.dirname(id);
    let regex = /\/\/=include\s+'([^\n\r]+)'/gi;
    return code.replace(regex, function(match, p1) {
        var targetPath = path.join(dir, p1);
        return load(targetPath);
    });
};

export default function concat (options = {}) {
    const output = options.output;
    return {
      transform ( code, id ) {
          let generatedCode = concatFiles(code, id);
          if(generatedCode === code|| output === undefined)
            return null;
  
            fs.writeFileSync(output, generatedCode);
        return null;
      }
    };
  }