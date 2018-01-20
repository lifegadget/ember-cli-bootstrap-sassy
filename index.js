'use strict';
const path = require('path');
const Funnel = require('broccoli-funnel');
const resolve = require('resolve');
const fs = require('fs');
const map = require('broccoli-stew').map;
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-bootstrap-sassy',

  // Cache path
  _bootstrapPath: '',

  init() {
    this._super.init && this._super.init.apply(this, arguments);

    this._bootstrapPath = path.dirname(resolve.sync('bootstrap-sass/package.json')) + '/assets';
  },

  included(app, parentAddon) {
    const target = parentAddon || app.app || app;
    let configMessage = [];
    const o = target.options['ember-cli-bootstrap-sassy'] || { js: true, glyphicons: true };

    const emberCLIVersion = target.project.emberCLIVersion().split(',').map(item => Number(item));
    if (emberCLIVersion[1] === 0 || emberCLIVersion[13] === 13) {
      throw new Error('ember-cli-bootstrap-sassy requires ember-cli version 1.13.13 or greater.\n');
    }

    // Import JS from bootstrap
    if (o.js instanceof Array) {

      o.js.forEach(fileName => target.import(`vendor/bootstrap/javascripts/bootstrap/${fileName}.js`));
      configMessage.push(`some JS loaded [${o.js.join(',')}]`);

    } else if (o.js !== false) {

      target.import('vendor/bootstrap/javascripts/bootstrap.js');
      configMessage.push('all JS enabled');

    } else {

      configMessage.push('no JS enabled');

    }

    // Import glyphicons from bootstrap
    if (o.glyphicons !== false) {

      target.import('vendor/bootstrap/fonts/bootstrap/glyphicons-halflings-regular.eot', { destDir: '/fonts/bootstrap' });
      target.import('vendor/bootstrap/fonts/bootstrap/glyphicons-halflings-regular.svg', { destDir: '/fonts/bootstrap' });
      target.import('vendor/bootstrap/fonts/bootstrap/glyphicons-halflings-regular.ttf', { destDir: '/fonts/bootstrap' });
      target.import('vendor/bootstrap/fonts/bootstrap/glyphicons-halflings-regular.woff', { destDir: '/fonts/bootstrap' });
      target.import('vendor/bootstrap/fonts/bootstrap/glyphicons-halflings-regular.woff2', { destDir: '/fonts/bootstrap' });
      this._toggleGlyphiconsStyles(true);
      configMessage.push('glyphicons enabled');

    } else {

      this._toggleGlyphiconsStyles(false);
      configMessage.push('glyphicons disabled');

    }

    if (o.quiet !== true) {
      this.ui.writeLine(`bootstrap-sassy config: ${configMessage.join(', ')}`);
    }
  },

  treeForStyles() {

    return new Funnel(this.treeGenerator(path.join(this._bootstrapPath, 'stylesheets')), {
      destDir: '/app/styles'
    });
  },

  treeForVendor(vendorTree) {

    let trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(
      new Funnel(this._bootstrapPath, {
        destDir: '/bootstrap'
      })
    );

    return map(mergeTrees(trees), '**/*.js', (content, relativePath) => {
      if (relativePath.match(/\.js$/i)) {
        return `if (typeof FastBoot === 'undefined') { ${content} }`;
      }
      return content;
    });
  },

  _toggleGlyphiconsStyles(enable) {

    const bsStyles = path.join(this._bootstrapPath, 'stylesheets', '_bootstrap.scss');

    fs.readFile(bsStyles, 'utf8', (err, data) => {
      if (err) {
        return console.log(err); //eslint-disable-line no-console
      }

      const result = enable
        ? data.replace('//@import "bootstrap/glyphicons";', '@import "bootstrap/glyphicons";')
        : data.replace('@import "bootstrap/glyphicons";', '//@import "bootstrap/glyphicons";');

      fs.writeFile(bsStyles, result, 'utf8', (err) => {
        if (err) {
          return console.log(err); //eslint-disable-line no-console
        }
      });
    });
  }
};
