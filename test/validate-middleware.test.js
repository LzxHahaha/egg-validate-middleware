'use strict';

const mock = require('egg-mock');

describe('test/validate-middleware.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/validate-middleware-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('/home/:address', () => {
    return app.httpRequest()
      .get('/home/address?name=name&age=12')
      .expect('{"code":200,"data":{"name":"name","age":12}}')
      .expect(200);
  });
});
