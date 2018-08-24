'use strict';

module.exports = {
  keys: '123456',
  validateMiddleware: {
    convertType: true,
    formatResponse(data) {
      return {
        type: 'object',
        properties: {
          code: { type: 'number' },
          message: { type: 'string' },
          data,
        },
      };
    },
  },
};
