'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = generators.Base.extend({

  constructor: function () {
    generators.Base.apply(this, arguments);

    this.argument('project_name', { type: String, required: false });
    this.argument('author_name', { type: String, required: false });
    this.argument('author_email', { type: String, required: false });

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

    // TODO: move these to a separate module
    if (!this.author_email){
      prompts.splice(0, 0, {
        type: 'input',
        name: 'author_email',
        message: "What is the author's e-mail address?",
        default: 'author_email'
      });
    }
    if (!this.author_name){
      prompts.splice(0, 0, {
        type: 'input',
        name: 'author_name',
        message: 'Who is the author of your project?',
        default: 'author_name'
      });
    }
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
      // expose the settings in a cookiecutter object for rendering it
      // TODO: expose other properties as options as well
      this.cookiecutter = {
        project_name: this.project_name,
        repo_name: this.project_name,
        author_name: this.author_name,
        email: this.author_email,
        description: 'project_description',
        domain_name: 'project_domain',
        version: '0.1.0',
        timezone: 'UTC',
        now: '2015/01/01',
        year: '2015'
      }
      // copy the Django project
      this.log('Generating project ' + this.project_name);
      // - first without the project_name module
      this.fs.copyTpl(
        // skip Gruntfile.js, since it uses <% templates, causing clashes
        this.templatePath('project_name/!(project_name|Gruntfile.js){/**/*,*}'),
        this.destinationPath(this.project_name + '/'),
        this,
        {interpolate: /{{([\s\S]+?)}}/g} // using the {{ }} template delimiters
      );
      // - now copy and rename the project_name module
      this.fs.copyTpl(
        this.templatePath('project_name/project_name/!(templates){/**/*,*}'),
        // TODO: report this as bug:
        this.destinationPath(this.project_name + '/whydoineedthis/'),
        this,
        {interpolate: /{{([\s\S]+?)}}/g} // using the {{ }} template delimiters
      );
      // - now just copy the actual Django templates (without rendering)
      this.fs.copy(
        this.templatePath('project_name/project_name/templates'),
        this.destinationPath(this.project_name + '/templates')
      );
    },
    silmarilli_root: function () {
      // copy the silmarilli custom files to the root
      this.fs.copyTpl(
        // skip Gruntfile.js, since it uses <% templates, causing clashes
        this.templatePath('root/{/**/*,*}'),
        this.destinationPath(this.project_name + '/'),
        this
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
