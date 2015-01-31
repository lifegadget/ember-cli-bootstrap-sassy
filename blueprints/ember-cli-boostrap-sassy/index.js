module.exports = {
  description: 'installing Bootstrap for SASS to project',

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall: function(options) {
	  return this.addBowerPackageToProject('bootstrap-sass-official');
  }
};
