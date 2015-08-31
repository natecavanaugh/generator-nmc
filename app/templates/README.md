# <%= moduleName %>
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
<% if (coverage) { %>[![Test coverage][coveralls-image]][coveralls-url]<% } %>

> <%= description %>


## Install

```
$ npm install --save <%= moduleName %>
```


## Usage

```js
var <%= camelModuleName %> = require('<%= moduleName %>');

<%= camelModuleName %>('belgian');
//=> BEST BEER EVAR!
```<% if (cli) { %>

## CLI

```
$ npm install --global <%= moduleName %>
```
```
$ <%= moduleName %> --help

  Usage
    <%= moduleName %> [input]

  Example
    <%= moduleName %>
    BEER!

    <%= moduleName %> belgian
    BEST BEER EVAR!

  Options
    --foo Lorem ipsum. Default: false
```
<% } %>

## API

### <%= camelModuleName %>(input, [options])

#### input

*Required*
Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`
Default: `false`

Lorem ipsum.


## License

MIT © [<%= name %>](<%= website %>)

[npm-image]: https://img.shields.io/npm/v/<%= moduleName %>.svg?style=flat-square
[npm-url]: https://npmjs.org/package/<%= moduleName %>
[travis-image]: https://img.shields.io/travis/<%= githubUsername %>/<%= moduleName %>/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/<%= githubUsername %>/<%= moduleName %>
<% if (coverage) { %>[coveralls-image]: https://img.shields.io/coveralls/<%= githubUsername %>/<%= moduleName %>/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/<%= githubUsername %>/<%= moduleName %>?branch=master<% } %>