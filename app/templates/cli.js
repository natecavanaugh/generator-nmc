#!/usr/bin/env node
'use strict';
var meow = require('meow');
var <%= camelModuleName %> = require('./');

var cli = meow({
	help: [
		'Usage',
		'  $ <%= moduleName %> [input]',
		'',
		'Options',
		'  --foo Lorem ipsum. Default: false',
		'Examples',
		'  $ <%= moduleName %>',
		'  BEER!',
		'',
		'  $ <%= moduleName %> belgian',
		'  BEST BEER EVAR!',
		''
	]
});

console.log(<%= camelModuleName %>(cli.input[0] || 'BEER!'));