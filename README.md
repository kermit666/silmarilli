Silmarilli [![Build Status](https://secure.travis-ci.org/kermit666/silmarilli.png?branch=master)](https://travis-ci.org/kermit666/silmarilli)
==========

> The Noldor also it was who first achieved the making of gems;
> and the fairest of gems were the Silmarils, and they are lost.
>
> — <cite>J.R.R. Tolkien, The Silmarillion</cite>


This is a collection of the most brilliant gems out there,
forged into a powerful building tool.


The gems
--------

Silmarilli is packaged as a [Yeoman](http://yeoman.io) generator. It scaffolds
your application consisting of a [Django](https://www.djangoproject.com/)
REST API server connected to a PostgreSQL database and a
[AngularJS](https://angularjs.org/) web app.

The following gems are included in Silmarilli:

- [cookiecutter-django](https://github.com/pydanny/cookiecutter-django)
  ([@pydanny](https://github.com/pydanny))
- [generator-angular](https://github.com/yeoman/generator-angular)

How is this possible? Through the magic of
[composability](yeoman.io/authoring/composability.html),
[copying files](https://github.com/sboudrias/mem-fs-editor)
based on [template rendering](https://lodash.com/docs#template)
and [glob expressions](https://github.com/isaacs/node-glob).

Getting Started
---------------

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell
him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the
[npm](https://npmjs.org) package repository. You only have to ask for him once,
then he packs up and moves into your hard drive. *Make sure you clean up, he
likes new and shiny things.*

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can
think of a generator like a plug-in. You get to choose what type of application
you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-silmarilli from
[npm](https://www.npmjs.com/package/generator-silmarilli), run:

```bash
npm install -g generator-silmarilli
```

Finally, initiate the generator:

```bash
yo silmarilli
```

You can optionally pass in the project name as an argument (you'll be asked for
it otherwise).

```bash
yo silmarilli awesome_thingy
```

If you want to skip generating the Angular code, pass the `--skip-angular` flag.

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's
very easy to work with. If you think he's too opinionated, he can be easily
convinced.

If you'd like to get to know Yeoman better and meet some of his friends,
[Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete
[Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


License
-------

Original code GPLv3, for the included components see LICENSE.md.


Hacking
-------

For when it should be updated, Cookiecutter-django is included from
[kermit's fork](https://github.com/kermit666/cookiecutter-django) as:

    cd app/templates
    cookiecutter --no-input -c kermit gh:kermit666/cookiecutter-django


TODO
----

- use something more simliar to Jinja to render {% if %} tags in Cookiecutter
- Cookiecutter-django as subtree or submodule (probably submodule to KIS...)
- set other cookiecutter-django settings as options (author_name etc.)
- properly prompt the subgenerator
  http://stackoverflow.com/questions/28520937/
- add local cookiecutterrc support to *cookiecutter/cookiecutter/config.py*
