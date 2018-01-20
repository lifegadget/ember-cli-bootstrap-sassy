'use strict';

const fs = require('fs');
const path = require('path');

const originalGlyphiconFilePath = path.resolve(__dirname, '../node_modules/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.woff');
const importedGlyphiconFilePath = path.resolve(__dirname, '../dist/fonts/bootstrap/glyphicons-halflings-regular.woff');

const originalGlyphiconBuffer = fs.readFileSync(originalGlyphiconFilePath);
const importedGlyphiconBuffer = fs.readFileSync(importedGlyphiconFilePath);

const isTheSame = originalGlyphiconBuffer === importedGlyphiconBuffer;
if (isTheSame) {
  console.info('Glyphicon files are the same.') // eslint-disable-line no-console
} else {
  throw new Error('Glyphicon files are not the same.');
}
