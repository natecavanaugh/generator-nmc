'use strict';

var superb = require('superb');
var normalizeUrl = require('normalize-url');
var humanizeUrl = require('humanize-url');
var yeoman = require('yeoman-generator');
var npm = require('npm');
var _s = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
	init: function () {
		var instance = this;

		var cb = this.async();

		instance.prompt([
			{
				name: 'moduleName',
				message: 'What do you want to name your module?',
				default: this.appname.replace(/\s/g, '-'),
				filter: function (val) {
					return _s.slugify(val);
				}
			},
			{
				name: 'githubUsername',
				message: 'What is your GitHub username?',
				store: true,
				validate: function (val) {
					return val.length > 0 ? true : 'You have to provide a username';
				}
			},
			{
				name: 'website',
				message: 'What is the URL of your website?',
				store: true,
				validate: function (val) {
					return val.length > 0 ? true : 'You have to provide a website URL';
				},
				filter: function (val) {
					return normalizeUrl(val);
				}
			},
			{
				name: 'description',
				message: 'Short description of your module?',
				default: 'My ' + superb() + ' module',
				validate: function (val) {
					return val.length > 0 ? true : 'You have to provide a website URL';
				}
			},
			{
				name: 'cli',
				message: 'Do you need a CLI?',
				type: 'confirm',
				default: false
			},
			{
				name: 'gulp',
				default: true,
				message: 'Do you want gulp as a dependency?',
				type: 'confirm',
				validate: function (val) {
					return val.length > 0 ? true : 'You have to provide a website URL';
				}
			},
			{
				name: 'coverage',
				default: true,
				message: 'Do you want test coverage (istanbul, chai, and coveralls)?',
				type: 'confirm',
				when: function(props) {
					return props.gulp;
				}
			}
		],
		function (props) {
			instance.moduleName = props.moduleName;
			instance.camelModuleName = _s.slugify(props.moduleName);
			instance.githubUsername = props.githubUsername;
			instance.website = props.website;
			instance.humanizedWebsite = humanizeUrl(instance.website);
			instance.description = props.description;
			instance.gulp = props.gulp;
			instance.coverage = instance.gulp && props.coverage;
			instance.cli = props.cli;

			npm.load(
				null,
				function() {
					instance.name = npm.config.get('init.author.name') || instance.user.git.name();
					instance.email = npm.config.get('init.author.email') || instance.user.git.email();

					instance.template('gitattributes', '.gitattributes');
					instance.template('gitignore', '.gitignore');
					instance.template('travis.yml', '.travis.yml');
					instance.template('index.js');
					instance.template('LICENSE');
					// needed so npm doesn't try to use it and fail
					instance.template('_package.json', 'package.json');
					instance.template('README.md');

					if (instance.cli) {
						instance.template('cli.js');
					}

					if (instance.gulp) {
						instance.template('gulpfile.js');
					}

					instance.template('test/test.js');

					cb();
				}
			);

		});
	},

	install: function () {
		this.installDependencies(
			{
				bower: false,
				skipInstall: this.options['skip-install']
			}
		);
	}
});