/* jshint node: true */
var path = require('path');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-cli-bootstrap-sassy',

  included: function included(app, parentAddon) {
    var target = parentAddon || app;
    var configMessage = [];
    var _this = this;
    var o = target.options['ember-cli-bootstrap-sassy'] || { js: true, glyphicons: true };
    this.bootstrapPath = target.bowerDirectory + '/bootstrap-sass/assets/';

    var emberCLIVersion = target.project.emberCLIVersion().split(',').map(function(item) {return Number(item);});
    if (emberCLIVersion[1] === 0  || emberCLIVersion[13] === 13) {
      throw new Error('ember-cli-bootstrap-sassy requires ember-cli version 1.13.13 or greater.\n');
    }

    // Import JS from bootstrap
    if(o.js instanceof Array) {
      o.js.forEach(function(fileName) {
        target.import(_this.bootstrapPath + 'javascripts/bootstrap/' + fileName + '.js');
      });
      configMessage.push('some JS loaded [' + o.js.join(',') + ']');
    } else if (o.js !== false) {
      target.import(this.bootstrapPath + 'javascripts/bootstrap.js');
      configMessage.push('all JS enabled');
    } else {
      configMessage.push('no JS enabled');
    }

    // Import glyphicons from bootstrap
    if(o.glyphicons !== false) {
      target.import(this.bootstrapPath + 'fonts/bootstrap/glyphicons-halflings-regular.eot', { destDir: '/fonts/bootstrap' });
      target.import(this.bootstrapPath + 'fonts/bootstrap/glyphicons-halflings-regular.svg', { destDir: '/fonts/bootstrap' });
      target.import(this.bootstrapPath + 'fonts/bootstrap/glyphicons-halflings-regular.ttf', { destDir: '/fonts/bootstrap' });
      target.import(this.bootstrapPath + 'fonts/bootstrap/glyphicons-halflings-regular.woff', { destDir: '/fonts/bootstrap' });
      target.import(this.bootstrapPath + 'fonts/bootstrap/glyphicons-halflings-regular.woff2', { destDir: '/fonts/bootstrap' });
      configMessage.push('glyphicons enabled');
    } else {
      configMessage.push('glyphicons disabled');
    }

    if(o.quiet !== true) {
      this.ui.writeLine('bootstrap-sassy config: ' + configMessage.join(', '));
    }
  },
  treeForStyles: function(){
    var bootstrapTree = new Funnel(this.treeGenerator(path.join(this.bootstrapPath, 'stylesheets')), {
      srcDir: '/',
      destDir: '/app/styles'
    });

    return bootstrapTree;
  }

};
