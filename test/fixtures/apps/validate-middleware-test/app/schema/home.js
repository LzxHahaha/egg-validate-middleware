'use strict';

module.exports = {
  index: {
    request: {
      query: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          age: { type: 'number' },
        },
        require: [ 'name' ],
      },
      params: {
        type: 'object',
        properties: {
          address: { type: 'string' },
          no: { type: [ 'number', 'string' ] },
        },
      },
    },
    response: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
      },
    },
  },
};
