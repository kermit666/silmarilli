'use strict';
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  writing: {
    djangoproject: function () {
      this.log('django ', this.options.project_name);
      // expose the settings in a cookiecutter object for rendering it
      // TODO: expose other properties as options as well
      this.cookiecutter = {
        project_name: this.options.project_name,
        repo_name: this.options.project_name,
        author_name: this.options.author_name,
        email: this.options.author_email,
        description: 'project_description',
        domain_name: 'project_domain',
        version: '0.1.0',
        timezone: 'UTC',
        now: '2015/01/01',
        year: '2015'
      }
      // copy the Django project
      this.log('Generating project ' + this.options.project_name);
      // - first without the project_name module
      this.fs.copyTpl(
        // skip Gruntfile.js, since it uses <% templates, causing clashes
        this.templatePath('project_name/!(project_name|Gruntfile.js){/**/*,*}'),
        this.destinationPath(this.options.project_name + '/'),
        this,
        {interpolate: /{{([\s\S]+?)}}/g} // using the {{ }} template delimiters
      );
      // - now copy and rename the project_name module
      this.fs.copyTpl(
        this.templatePath('project_name/project_name/!(templates){/**/*,*}'),
        // TODO: report this as bug:
        this.destinationPath(this.options.project_name + '/whydoineedthis/'),
        this,
        {interpolate: /{{([\s\S]+?)}}/g} // using the {{ }} template delimiters
      );
      // - now just copy the actual Django templates (without rendering)
      this.fs.copy(
        this.templatePath('project_name/project_name/templates'),
        this.destinationPath(this.options.project_name + '/templates')
      );
    },
  }
});
