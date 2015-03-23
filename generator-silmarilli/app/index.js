'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = generators.Base.extend({

  constructor: function () {
    generators.Base.apply(this, arguments);

    this.argument('project_name', { type: String, required: false });
  },

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Alatulya! Let us plant the ' + chalk.red('Silmarils') + '...'
    ));

    var prompts = [];

    if (!this.project_name){
      prompts.splice(0, 0, {
        type: 'input',
        name: 'project_name',
        message: 'What is the name of your project?',
        default: 'project_name'
      });
    }

    this.prompt(prompts, function (props) {
      if (props.project_name){
        this.project_name = props.project_name;
      }

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
    },

    projectfiles: function () {
      this.log('Generating project ' + this.project_name);
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );

      // copy the Django project template
      this.fs.copyTpl(
        this.templatePath('project_name/**'),
        this.destinationPath(this.project_name + '/'),
        this,
        {interpolate: /{{([\s\S]+?)}}/g} // using the {{ }} template delimiters
      );

    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
