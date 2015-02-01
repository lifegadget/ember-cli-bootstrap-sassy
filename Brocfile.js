/* jshint node: true */
/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

var app = new EmberAddon();
var bootstrapPath   = 'bower_components/bootstrap-sass-official/assets/';
var path 			= require('path');
var modulePath      = path.relative(app.project.root, __dirname);
var path_join = function(){
  // fix path with windows back slash with path_join
  return path.join.apply(this, arguments).replace(/\\/g, '/');
};

app.options.sassOptions = app.options.sassOptions || {};
app.options.sassOptions.includePaths = app.options.sassOptions.includePaths || [];

app.options.sassOptions.includePaths.push(path_join(modulePath,bootstrapPath, 'stylesheets'));
app.options.sassOptions.includePaths.push(path_join(modulePath,bootstrapPath, 'stylesheets/bootstrap'));
app.options.sassOptions.includePaths.push(path_join(modulePath,bootstrapPath, 'stylesheets/bootstrap/mixins'));

app.import(bootstrapPath + 'javascripts/bootstrap.js');

module.exports = app.toTree();
