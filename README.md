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

JSON schema validator middleware for Egg.js.

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
    formatResponse: null
};
```

`formatResponse` is used to pack response's schema define to make sure all response data has same format. Only effective when schema had `response` define.

```js
// response schema
const schema = {
  response: {
    type: 'string'
  }
}
// will allow response like { code: 200, message: 'message', data: 'response' }
formatResponse(responseSchema) {
  return {
    type: 'object',
    properties: {
      code: { type: 'number' },
      message: { type: 'string' },
      data: responseSchema,
    },
  };
}
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

### Define schema

All schemas must defined at `app/schema`, and will auto load to `app.schema`.

```js
// app/schema/home.js
module.exports = {
  index: {
    // [option] Used to validte input params
    request: {
      query: {
        type: 'object',
        properties: {
          // query string params
        }
      },
      params: {
        type: 'object',
        properties: {
          // url params
        }
      },
      body: {
        // request body
      }
    },
    // [option] Used to format and fast stringify response data
    response: {
      type: 'object',
      properties: {
        // response format
      }
    }
  }
};
```

Schema and controller should be one-to-one correspondence.

```js
// app/schema/home.js
module.exports = {
  index: {
    // ...
  }
};

// should match to

// app/controller/home.js
class HomeController extends Controller {
  async index() {
    // return data, no need to set ctx.body
    return 'something';
  }
}
```

### Use middleware

This middleware should be placed in front of the controller:

```js
// app/router.js
module.exports = app => {
  const { router, controller, middleware, schema } = app;
  const { validate } = middleware;

  router.get('/home/index', validate({ schema: schema.home.index }), controller.home.index);
}
```

see [test](test/fixtures/apps/validate-middleware-test) for more detail.

## Questions & Suggestions

Please open an issue [here](https://github.com/LzxHahaha/egg-validate-middleware/issues).

## License

[MIT](LICENSE)
