'use strict';

const mock = require('egg-mock');

describe('test/validate-middleware.test.js', () => {
  let app;
  before(() => {
    mock.consoleLevel('NONE');
    mock.env('format');
    app = mock.app({
      baseDir: 'apps/validate-middleware-test',
      cache: false,
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('no schema', () => {
    return app.httpRequest()
      .get('/test/noSchema')
      .expect('success')
      .expect(200);
  });

  it('query test', () => {
    return app.httpRequest()
      .get('/test/get?name=name&age=12&unuse=value')
      .expect('{"code":200,"data":{"name":"name","age":12}}')
      .expect(200);
  });

  it('params test', () => {
    return app.httpRequest()
      .get('/test/params/name/12.2')
      .expect('{"code":200,"data":{"name":"name","age":12}}')
      .expect(200);
  });

  it('post body test', () => {
    return app.httpRequest()
      .post('/test/post')
      .send({ name: 'name', age: 12 })
      .expect('{"code":200,"data":{"name":"name","age":12}}')
      .expect(200);
  });

  it('response format test', () => {
    return app.httpRequest()
      .post('/test/response')
      .send({ name: 'name', age: 12 })
      .expect('{"code":200,"data":{"name":"name"}}')
      .expect(200);
  });

  it('input error test', () => {
    return app.httpRequest()
      .get('/test/inputError')
      .expect('JSON schema validation failed.')
      .expect(500);
  });

  it('wrong convert config', () => {
    return app.httpRequest()
      .get('/test/wrongConvert?value=a')
      .expect(200);
  });

  it('wrong convert value', () => {
    return app.httpRequest()
      .get('/test/wrongNumber?value=a')
      .expect('{"value":"a"}')
      .expect(200);
  });

  it('no convert number', () => {
    return app.httpRequest()
      .get('/test/noConvert?value=12')
      .expect('{"code":200,"data":{"value":"12"}}')
      .expect(200);
  });
});

describe('without formatResponse', () => {
  let app;
  before(() => {
    mock.consoleLevel('NONE');
    mock.env('unformat');
    app = mock.app({
      baseDir: 'apps/validate-middleware-test',
      cache: false,
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('response without format test', () => {
    return app.httpRequest()
      .post('/test/responseUnformat?age=a')
      .send({ name: 'name', unused: 'value' })
      .expect('{"name":"name"}')
      .expect(200);
  });
});
