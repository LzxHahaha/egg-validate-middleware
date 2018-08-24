'use strict';

/**
 * egg-validate-middleware default config
 * @member Config#validateMiddleware
 * @property {String} SOME_KEY - some description
 */
exports.validateMiddleware = {
  convertType: true,
  formatResponse(data) {
    return {
      type: 'object',
      properties: {
        code: { type: 'number' },
        data: { type: data.type },
        message: { type: 'string' },
      },
    };
  },
};
