# egg-validate-middleware

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-validate-middleware.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-validate-middleware
[travis-image]: https://img.shields.io/travis/LzxHahaha/egg-validate-middleware.svg?style=flat-square
[travis-url]: https://travis-ci.org/LzxHahaha/egg-validate-middleware
[codecov-image]: https://img.shields.io/codecov/c/github/LzxHahaha/egg-validate-middleware.svg?style=flat-square
[codecov-url]: https://codecov.io/github/LzxHahaha/egg-validate-middleware?branch=master
[david-image]: https://img.shields.io/david/LzxHahaha/egg-validate-middleware.svg?style=flat-square
[david-url]: https://david-dm.org/LzxHahaha/egg-validate-middleware
[snyk-image]: https://snyk.io/test/npm/egg-validate-middleware/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-validate-middleware
[download-image]: https://img.shields.io/npm/dm/egg-validate-middleware.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-validate-middleware

<!--
Description here.
-->

## Install

```bash
$ npm i egg-validate-middleware --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.validateMiddleware = {
  enable: true,
  package: 'egg-validate-middleware',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.validateMiddleware = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/LzxHahaha/egg-validate-middleware/issues).

## License

[MIT](LICENSE)
