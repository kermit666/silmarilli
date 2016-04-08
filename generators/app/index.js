'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({

  constructor: function () {
    yeoman.Base.apply(this, arguments);
    this.option('skip-install', {desc: "skip npm install and bower install",
                                 type: 'Boolean', defaults: false});
    this.option('skip-django', {desc: "don't generate the Django REST backend",
                                type: 'Boolean', defaults: false});
    this.option('skip-angular', {desc: "don't generate the AngularJS app",
                                 type: 'Boolean', defaults: false});
  },

  initializing: function() {
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      // (Quenya pl. Silmarilli)
      'Alatulya! Let us plant the ' + chalk.red('Silmarils') + '...'
    ));

    var prompts = [];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someAnswer;
      done();
    }.bind(this));
  },

  default: function () {
    if (!this.options['skip-angular']){
      this.composeWith('gulp-angular:app', {
        options: {
          skipInstall: this.options.skipInstall
        }
      }, {
        local: require.resolve('generator-gulp-angular/generators/app')
      });
    }

    // this.log('this.options', [ this.options ]);
    // this.log('this.args', this.args);
    if (!this.options['skip-django']){
      this.composeWith('django:app', {
        args: this.args,
        options: {
          skipInstall: this.options.skipInstall
        }
      }, {
        local: require.resolve('generator-django-rest/generators/app')
      });
    }
  },

  writing: function () {
  },

  install: function () {
    this.installDependencies();
  }
});
