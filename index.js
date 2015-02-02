module.exports = {
	name: 'ember-cli-bootstrap-sassy',
	
	included: function included(app) {
		this.app = app;
		var configMessage = []; 
		var path 			= require('path');
		var o         		= app.options['ember-cli-bootstrap-sassy'] || { js: true, glyphicons: true };
		var bootstrapPath   = 'bower_components/bootstrap-sass-official/assets/';
		var modulePath      = path.relative(app.project.root, __dirname);
		var path_join = function(){
		  // fix path with windows back slash with path_join
		  return path.join.apply(this, arguments).replace(/\\/g, '/');
		};
		
		var emberCLIVersion = app.project.emberCLIVersion().split(',').map(function(item) {return Number(item);});
		if (emberCLIVersion[1] === 0  || emberCLIVersion[2] < 8) {
			throw new Error('ember-cli-bootstrap-sassy requires ember-cli version 0.1.8 or greater.\n');
		}
    
		// add paths to SASS install
		app.options.sassOptions = app.options.sassOptions || {};
		app.options.sassOptions.includePaths = app.options.sassOptions.includePaths || [];

		app.options.sassOptions.includePaths.push(path_join(bootstrapPath, 'stylesheets'));
		app.options.sassOptions.includePaths.push(path_join(bootstrapPath, 'stylesheets/bootstrap'));
		app.options.sassOptions.includePaths.push(path_join(bootstrapPath, 'stylesheets/bootstrap/mixins'));

		// Import JS from bootstrap
		if(o.importBootstrapJS instanceof Array) {
			o.importBootstrapJS.forEach(function(fileName) {
				app.import(path_join(bootstrapPath + 'javascripts/bootstrap', fileName + '.js'));
			});
			configMessage.push('some JS loaded ['+o.importBootstrapJS.join(',')+']');
		} else if (o.importBootstrapJS !== false) {
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
			configMessage.push('glphicons enabled');
		} else {
			configMessage.push('glphicons disabled');
		}
		
		console.log('bootstrap-sassy config: ', configMessage.join(', '));
		
	}
	
};
