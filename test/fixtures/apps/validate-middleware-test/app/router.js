'use strict';

module.exports = app => {
  const { router, controller, middleware, schema } = app;
  const { validate } = middleware;

  router.get('/home/:address', validate({ schema: schema.home.index }), controller.home.index);
};
