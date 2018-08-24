'use strict';

module.exports = {
  validateMiddleware: {
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
