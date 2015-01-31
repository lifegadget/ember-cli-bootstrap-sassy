#ember-cli-bootstrap-**sassy**

> a fork of [ember-cli-bootstrap-sass](https://github.com/unionups/ember-cli-bootstrap-sass) but without any references to the now defunct *bootstrap_for_ember*

#Installation

In the root of your ember-cli project directory, run:
```bash
ember install:addon ember-cli-bootstrap-sassy
```

You should now have access to Bootstrap, SCSS pre-processor style. Now go out and have a good time. 

> **Note:** 
> this assumes that you already have SCSS installed as you can't very well use Bootstrap for SASS without SASS can you? At some point it may make sense just to build that in but right now I'm just trying to fix up the 
> old addon so it works for modern Ember builds

#Usage

Import Bootstrap styles in `app/styles/app.scss`

```javascript
@import "bootstrap";
```

By default all of Bootstrap is imported, however, you can also include optional bootstrap theme:

```javascript
@import "bootstrap/theme";
```

The full list of bootstrap variables can be found [here](http://getbootstrap.com/customize/#less-variables). You can override these by simply redefining the variable before the `@import` directive, e.g.:

```javascript
$navbar-default-bg: #312312;
$light-orange: #ff8c00;
$navbar-default-color: $light-orange;

@import "bootstrap";
```

You can also import components explicitly. To start with a full list of modules copy [bootstrap.scss](https://github.com/twbs/bootstrap-sass/blob/master/assets/stylesheets/_bootstrap.scss) file into your `app/styles` folder as `_bootstrap-custom.scss`. Then comment out components you do not want from bootstrap-custom. In the application Sass file, replace `@import 'bootstrap'` with:

```javascript
@import 'bootstrap-custom';
```

## Bootstrap Javascript
All of Bootstrap's JS libraries are included by default but if you wish to remove them you can do so with the following configuration:

```javascript
// in your path/to/app/Brocfile.js

var app = new EmberApp({
  'ember-cli-bootstrap-sassy': {
    'importBootstrapJS': false
  }
});
```

Alternatively you can specify exactly which plugins should be imported into the project via the `importBootstrapJS` option, like so:

```javascript
// in your path/to/app/Brocfile.js

var app = new EmberApp({
  'ember-cli-bootstrap-sassy': {
    'importBootstrapJS': ['affix','collapse']
  }
});
```

## Glyphicons ##
Included by default, if you wish to have them removed:

```javascript
// in your path/to/app/Brocfile.js

var app = new EmberApp({
  'ember-cli-bootstrap-sassy': {
    'glyphicons': false
  }
});
```


You can check dependencies in the [Bootstrap JS documentation](http://getbootstrap.com/javascript/#transitions).


