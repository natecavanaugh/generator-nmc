'use strict';
var <%= camelModuleName %> = require('../');

<%
	if (!coverage) {
%>var assert = require('assert');<% }
	else {
%>var sinon = require('sinon');
var chai = require('chai');

chai.use(require('chai-string'));

var assert = chai.assert;<%
}
%>

it(
	'should ',
	function() {
		assert.strictEqual(<%= camelModuleName %>('unicorns'), 'unicorns & rainbows');
	}
);