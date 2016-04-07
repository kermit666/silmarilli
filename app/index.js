'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = generators.Base.extend({

  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('skip-django', {desc: "don't generate the Django REST backend",
                                type: 'Boolean', defaults: false});
    this.option('skip-angular', {desc: "don't generate the AngularJS app",
                                type: 'Boolean', defaults: false});
  },

  initializing: function () {
    this.pkg = require('../package.json');
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

      // create the Django REST backend
      if (!this.options['skip-django']){
        this.log('Setting up Django REST.');
        this.composeWith('django:app', {
          skipInstall: this.options['skip-install'],
          skipMessage: false
        }, {
          local: require.resolve('generator-django-rest')
        }).on('end', function(){ done(); });
      } else {
        this.log('Skipping Django REST as requested.');
        done();
      }

      // create the Angular app
      if (!this.options['skip-angular']){
        this.log('Setting up AngularJS.');
        this.composeWith('angular:app', {
          skipInstall: this.options['skip-install'],
          skipMessage: false
        }, {
          local: require.resolve('generator-angular')
        }).on('end', function(){ done(); });
      } else {
        this.log('Skipping AngularJS as requested.');
        done();
      }

      //done();
    }.bind(this));
  },

  writing: {},

  default: function () {
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
