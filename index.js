var path = require('path');
var funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-cli-bootstrap-sassy',
  
  included: function included(app) {
    this.app = app;
    var configMessage = [];
    var o = app.options['ember-cli-bootstrap-sassy'] || { js: true, glyphicons: true };
    var bootstrapPath   = 'bower_components/bootstrap-sass/assets/';
    var modulePath      = path.relative(app.project.root, __dirname);
    var path_join = function(){
      // fix path with windows back slash with path_join
      return path.join.apply(this, arguments).replace(/\\/g, '/');
    };
    
    var emberCLIVersion = app.project.emberCLIVersion().split(',').map(function(item) {return Number(item);});
    if (emberCLIVersion[1] === 0  || emberCLIVersion[2] < 8) {
      throw new Error('ember-cli-bootstrap-sassy requires ember-cli version 0.1.8 or greater.\n');
    }

    // Import JS from bootstrap
    if(o.js instanceof Array) {
      o.js.forEach(function(fileName) {
        app.import(bootstrapPath + 'javascripts/bootstrap/' + fileName + '.js');
      });
      configMessage.push('some JS loaded [' + o.js.join(',') + ']');
    } else if (o.js !== false) {
      app.import(bootstrapPath + 'javascripts/bootstrap.js');
      configMessage.push('all JS enabled');
    } else {
      configMessage.push('no JS enabled');
    }
    
    // Import glyphicons from bootstrap
    if(o.glyphicons !== false) {
      app.import(bootstrapPath + 'fonts/bootstrap/glyphicons-halflings-regular.eot', { destDir: '/fonts/bootstrap' });
      app.import(bootstrapPath + 'fonts/bootstrap/glyphicons-halflings-regular.svg', { destDir: '/fonts/bootstrap' });
      app.import(bootstrapPath + 'fonts/bootstrap/glyphicons-halflings-regular.ttf', { destDir: '/fonts/bootstrap' });
      app.import(bootstrapPath + 'fonts/bootstrap/glyphicons-halflings-regular.woff', { destDir: '/fonts/bootstrap' });
      app.import(bootstrapPath + 'fonts/bootstrap/glyphicons-halflings-regular.woff2', { destDir: '/fonts/bootstrap' });
      configMessage.push('glyphicons enabled');
    } else {
      configMessage.push('glyphicons disabled');
    }
    
    if(o.quiet !== false) {
      console.log('bootstrap-sassy config: ', configMessage.join(', '));      
    }
  },
  treeForStyles: function(){
    var bootstrapPath = path.join(this.app.bowerDirectory, 'bootstrap-sass', 'assets/stylesheets');
    var bootstrapTree = new funnel(bootstrapPath, {
      srcDir: '/',
      destDir: '/app/styles'
    });
    return bootstrapTree;
  }

};
