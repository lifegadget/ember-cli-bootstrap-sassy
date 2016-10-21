/* jshint node: true */
var path = require('path');

module.exports = {
  name: 'ember-cli-bootstrap-sassy',

  _findBootstrapPath: function() {
    if (!this._bootstrapPath) {
      var resolve = require('resolve');
      this._bootstrapPath = path.dirname(resolve.sync('bootstrap-sass/package.json')) + '/assets';
    }
  },

  included: function included(app, parentAddon) {
    var target = parentAddon || app.app || app;
    var configMessage = [];
    var o = target.options['ember-cli-bootstrap-sassy'] || { js: true, glyphicons: true };

    var emberCLIVersion = target.project.emberCLIVersion().split(',').map(function(item) {return Number(item);});
    if (emberCLIVersion[1] === 0  || emberCLIVersion[13] === 13) {
      throw new Error('ember-cli-bootstrap-sassy requires ember-cli version 1.13.13 or greater.\n');
    }

    // Import JS from bootstrap
    if (process.env.EMBER_CLI_FASTBOOT) {
      configMessage.push('no JS enabled [FastBoot]');
    } else {
      if(o.js instanceof Array) {
        o.js.forEach(function(fileName) {
          target.import('vendor/bootstrap/javascripts/bootstrap/' + fileName + '.js');
        });
        configMessage.push('some JS loaded [' + o.js.join(',') + ']');
      } else if (o.js !== false) {
        target.import('vendor/bootstrap/javascripts/bootstrap.js');
        configMessage.push('all JS enabled');
      } else {
        configMessage.push('no JS enabled');
      }
    }

    // Import glyphicons from bootstrap
    if(o.glyphicons !== false) {
      target.import('vendor/bootstrap/fonts/bootstrap/glyphicons-halflings-regular.eot', { destDir: '/fonts/bootstrap' });
      target.import('vendor/bootstrap/fonts/bootstrap/glyphicons-halflings-regular.svg', { destDir: '/fonts/bootstrap' });
      target.import('vendor/bootstrap/fonts/bootstrap/glyphicons-halflings-regular.ttf', { destDir: '/fonts/bootstrap' });
      target.import('vendor/bootstrap/fonts/bootstrap/glyphicons-halflings-regular.woff', { destDir: '/fonts/bootstrap' });
      target.import('vendor/bootstrap/fonts/bootstrap/glyphicons-halflings-regular.woff2', { destDir: '/fonts/bootstrap' });
      configMessage.push('glyphicons enabled');
    } else {
      configMessage.push('glyphicons disabled');
    }

    if(o.quiet !== true) {
      this.ui.writeLine('bootstrap-sassy config: ' + configMessage.join(', '));
    }
  },

  treeForStyles: function() {
    var Funnel = require('broccoli-funnel');

    this._findBootstrapPath();

    return new Funnel(this.treeGenerator(path.join(this._bootstrapPath, 'stylesheets')), {
      destDir: '/app/styles'
    });
  },

  treeForVendor: function() {
    var Funnel = require('broccoli-funnel');

    this._findBootstrapPath();

    return new Funnel(this._bootstrapPath, {
      destDir: '/bootstrap',
    });
  },
};
