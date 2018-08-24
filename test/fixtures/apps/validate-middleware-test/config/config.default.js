'use strict';

module.exports = {
  keys: '123456',
  security: {
    csrf: { enable: false },
  },
  onerror: {
    all(err, ctx) {
      ctx.body = err.message;
      ctx.status = 500;
    },
  },
};
