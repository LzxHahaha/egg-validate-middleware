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

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, validateMiddleware')
      .expect(200);
  });
});
