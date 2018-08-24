'use strict';

module.exports = app => {
  const { router, controller, middleware, schema } = app;
  const { validate } = middleware;

  router.get('/test/noSchema', validate(), controller.test.noSchema);

  router.get('/test/get', validate({ schema: schema.test.query }), controller.test.query);

  router.get('/test/params/:name/:age', validate({ schema: schema.test.params }), controller.test.params);

  router.post('/test/post', validate({ schema: schema.test.post }), controller.test.post);

  router.post('/test/response', validate({ schema: schema.test.response }), controller.test.response);

  router.get('/test/inputError', validate({ schema: schema.test.inputError }), controller.test.inputError);

  router.post('/test/responseUnformat', validate({ schema: schema.test.responseUnformat }), controller.test.responseUnformat);

  router.get('/test/wrongConvert', validate({ schema: schema.test.wrongConvert }), controller.test.wrongConvert);

  router.get('/test/wrongNumber', validate({ schema: schema.test.wrongNumber }), controller.test.wrongNumber);

  router.get('/test/noConvert', validate({ schema: schema.test.noConvert, convertNumber: false }), controller.test.noConvert);
};
