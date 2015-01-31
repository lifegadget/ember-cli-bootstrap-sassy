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

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

module.exports = app.toTree();
