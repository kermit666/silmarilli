'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = generators.Base.extend({

  constructor: function () {
    generators.Base.apply(this, arguments);

    this.argument('project_name', { type: String, required: false });

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

  writing: {
    djangoproject: function () {
      // copy the Django project
      this.log('Generating project ' + this.project_name);
      // - first without the project_name module
      this.fs.copyTpl(
        // skip Gruntfile.js, since it uses <% templates, causing clashes
        this.templatePath('project_name/!(project_name|Gruntfile.js)'),
        this.destinationPath(this.project_name + '/'),
        this,
        {interpolate: /{{([\s\S]+?)}}/g} // using the {{ }} template delimiters
      );
      // - now copy and rename the project_name module
      this.fs.copyTpl(
        this.templatePath('project_name/project_name/**!(templates)'),
        this.destinationPath(this.project_name + '/' + this.project_name),
        this,
        {interpolate: /{{([\s\S]+?)}}/g} // using the {{ }} template delimiters
      );
      // - now just copy the actual Django templates (without rendering)
      this.fs.copy(
        this.templatePath('project_name/project_name/templates'),
        this.destinationPath(this.project_name + '/' +
                             this.project_name + '/templates')
      );

    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
