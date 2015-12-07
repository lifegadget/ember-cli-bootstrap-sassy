module.exports = {
	description: 'installing Bootstrap for SASS to project',

	normalizeEntityName: function() {
		// this prevents an error when the entityName is
		// not specified (since that doesn't actually matter
		// to us
	},

	afterInstall: function(options) {
		return this.addBowerPackageToProject('bootstrap-sass').then(function() {
		  return this.addAddonToProject('ember-cli-sass', '^5.2.0');
		}.bind(this));
	}
};
