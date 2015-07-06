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

  default: function () {
    //if (this.options.django)
    this.log('index ', this.project_name);
    this.composeWith('silmarilli:django', {
      options: {
        project_name: this.project_name,
        author_name: this.author_name,
        author_email: this.author_email
      }
    }, {
      local: require.resolve('../generators/django')
    });
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
