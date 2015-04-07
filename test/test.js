'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('generator', function () {
	beforeEach(function (cb) {
		var deps = ['../../app'];

		helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
			if (err) {
				cb(err);
				return;
			}

			this.generator = helpers.createGenerator('nmc:app', deps, '--skip-install');
			cb();
		}.bind(this));
	});

	it('generates expected files', function (cb) {
		var expected = [
			'.gitattributes',
			'.gitignore',
			'.travis.yml',
			'index.js',
			'LICENSE',
			'package.json',
			'README.md',
			'test/test.js'
		];

		helpers.mockPrompt(this.generator, {
			moduleName: 'test',
			githubUsername: 'test',
			website: 'test.com'
		});

		this.generator.run(function () {
			helpers.assertFile(expected);
			cb();
		});
	});
});