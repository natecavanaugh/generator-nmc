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
			var tpl = {
				camelModuleName: _s.camelize(props.moduleName),
				cli: props.cli,
				coverage: props.gulp && props.coverage,
				description: props.description,
				githubUsername: props.githubUsername,
				gulp: props.gulp,
				humanizedWebsite: humanizeUrl(props.website),
				moduleName: props.moduleName,
				website: props.website
			};

			var mv = function (from, to) {
				instance.fs.move(instance.destinationPath(from), instance.destinationPath(to));
			}

			npm.load(
				null,
				function() {
					tpl.name = npm.config.get('init.author.name') || instance.user.git.name();
					tpl.email = npm.config.get('init.author.email') || instance.user.git.email();

					instance.fs.copyTpl([
						instance.templatePath() + '/**/*',
						'!**/cli.js',
						'!**/gulp.js'
					], instance.destinationPath(), tpl);

					if (props.cli) {
						instance.fs.copyTpl(instance.templatePath('cli.js'), instance.destinationPath('cli.js'), tpl);
					}

					if (props.gulp) {
						instance.fs.copyTpl(instance.templatePath('gulpfile.js'), instance.destinationPath('gulpfile.js'), tpl);
					}

					mv('gitattributes', '.gitattributes');
					mv('gitignore', '.gitignore');
					mv('travis.yml', '.travis.yml');
					mv('_package.json', 'package.json');

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