/* jshint node: true */
/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

var app = new EmberAddon();
var bootstrapPath   = 'bower_components/bootstrap-sass-official/assets/';
var path = require('path');

app.options.sassOptions = app.options.sassOptions || {};
app.options.sassOptions.includePaths = app.options.sassOptions.includePaths || [];

app.options.sassOptions.includePaths.push(bootstrapPath + 'stylesheets');
app.options.sassOptions.includePaths.push(bootstrapPath + 'stylesheets/bootstrap');
app.options.sassOptions.includePaths.push(bootstrapPath + 'stylesheets/bootstrap/mixins');

app.import(bootstrapPath + 'javascripts/bootstrap.js');

module.exports = app.toTree();
