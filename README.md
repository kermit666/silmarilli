Silmarilli [![Build Status](https://secure.travis-ci.org/metakermit/generator-silmarilli.png?branch=master)](https://travis-ci.org/metakermit/generator-silmarilli)
==========

> The Noldor also it was who first achieved the making of gems;
> and the fairest of gems were the Silmarils, and they are lost.
>
> — <cite>J.R.R. Tolkien, The Silmarillion</cite>


This is a collection of the most brilliant gems out there,
forged into a powerful building tool.

**Warning: still work in progress and not ready for usage yet!**


The gems
--------

Silmarilli is packaged as a [Yeoman](http://yeoman.io) generator –
generator-silmarilli. It scaffolds
your application consisting of a [Django](https://www.djangoproject.com/)
REST API server connected to a PostgreSQL database and an
[AngularJS](https://angularjs.org/) web app.

The following gems are included in Silmarilli:

- [generator-django-rest](https://github.com/metakermit/generator-django-rest)
- [generator-gulp-angular](https://github.com/Swiip/generator-gulp-angular)

How is this possible? Through the magic of
[composability](yeoman.io/authoring/composability.html),
[copying files](https://github.com/sboudrias/mem-fs-editor)
based on [template rendering](https://lodash.com/docs#template)
and [glob expressions](https://github.com/isaacs/node-glob).
A good example of composability is
[generator-generator](https://github.com/yeoman/generator-generator/blob/master/app/index.js)
being composed of
[generator-node](https://github.com/yeoman/generator-node).

Getting Started
---------------

To begin, your computer first needs [node.js](https://nodejs.org).
Once you have that, we need Yeoman pre-installed. Yeoman lives in the
[npm](https://npmjs.org) package repository. You only have to ask for him once,
then he packs up and moves into your hard drive.

```bash
npm install -g yo
```

Then, we need the Silmarilli generator, i.e. plug-in. You install
generator-silmarilli from
[npm](https://www.npmjs.com/package/generator-silmarilli).

```bash
npm install -g generator-silmarilli
```

Finally, for every new project you would initiate the generator
in an empty folder.

```bash
mkdir magic-project
cd magic-project
yo silmarilli
```

You will be prompted for some questions. You can optionally pass in the project
name as an argument (you'll be asked for it otherwise).

```bash
yo silmarilli magic-project
```

If you want to skip generating the Angular code, pass the `--skip-angular` flag.

```bash
yo silmarilli awesome-project --skip-angular
```

See all of the available options by running the help flag.

```bash
yo silmarilli --help
```


Development
-----------

### Locally

If you didn't pass `--skip-install`, Yeoman will run `npm install`
and `bower install` for you. After this, start the development environment using

    gulp serve

### Using Docker

Install [Docker Compose](http://docs.docker.com/compose/install/).

When necessary, run the migrations:

    docker-compose run web ./manage.py migrate

afterwards, you can get the development server up and running by simply running:

    docker-compose up

Now, open your browser at <http://localhost:8000> or check the ip address with
`boot2docker ip` if you're on OS X.


License
-------

Original code GPLv3, for the included components see LICENSE.md.


TODO
----

- fill out django-compose.yml
- use something more simliar to Jinja to render {% if %} tags in Cookiecutter
   -> probably cookiecutter directly to handle {% raw %} tags
- Cookiecutter-django as subtree or submodule (probably submodule to KIS...)
- set other cookiecutter-django settings as options (author_name etc.)
- properly prompt the subgenerator
  http://stackoverflow.com/questions/28520937/
- add local cookiecutterrc support to *cookiecutter/cookiecutter/config.py*
