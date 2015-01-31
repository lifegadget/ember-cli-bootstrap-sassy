module.exports = {
	name: 'ember-cli-bootstrap-sassy',
	
	included: function included(app) {
		this.app = app;

		var emberCLIVersion = app.project.emberCLIVersion().split(',').map(function(item) {return Number(item);});
		if (emberCLIVersion[1] === 0  || emberCLIVersion[2] < 8) {
			throw new Error('ember-cli-bootstrap-sassy requires ember-cli version 0.1.8 or greater.\n');
		}

		var o         		= app.options['ember-cli-bootstrap-sassy'] || {};
		var bootstrapPath   = 'bower_components/bootstrap-sass-official/assets/';
    
		// add paths to SASS install
		app.options.sassOptions = app.options.sassOptions || {};
		app.options.sassOptions.includePaths = app.options.sassOptions.includePaths || [];
  
		app.options.sassOptions.includePaths.push(bootstrapPath + 'stylesheets');
		app.options.sassOptions.includePaths.push(bootstrapPath + 'stylesheets/bootstrap');
		app.options.sassOptions.includePaths.push(bootstrapPath + 'stylesheets/bootstrap/mixins');

		// Import JS from bootstrap
		if(o.js instanceof Array) {
			o.js.forEach(function(fileName) {
				app.import(bootstrapPath + 'javascripts/bootstrap', fileName + '.js');
			});
		} else if (o.js !== false) {
			app.import(bootstrapPath + 'javascripts/bootstrap.js');
		}
		
		// Import glyphicons from bootstrap
		if(o.glyphicons !== false) {
			app.import(bootstrapPath + 'fonts/bootstrap/glyphicons-halflings-regular.eot', { destDir: '/fonts/bootstrap' });
			app.import(bootstrapPath + 'fonts/bootstrap/glyphicons-halflings-regular.svg', { destDir: '/fonts/bootstrap' });
			app.import(bootstrapPath + 'fonts/bootstrap/glyphicons-halflings-regular.ttf', { destDir: '/fonts/bootstrap' });
			app.import(bootstrapPath + 'fonts/bootstrap/glyphicons-halflings-regular.woff', { destDir: '/fonts/bootstrap' });
		}
	}
	
};
