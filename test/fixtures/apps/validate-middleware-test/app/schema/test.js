'use strict';

module.exports = {
  query: {
    request: {
      query: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          age: { type: 'number' },
        },
        require: [ 'name' ],
      },
    },
  },

  params: {
    request: {
      params: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          age: { type: [ 'integer', 'string' ] },
        },
        require: [ 'name' ],
      },
    },
  },

  post: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
      },
    },
  },

  response: {
    response: {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
    },
  },

  inputError: {
    request: {
      query: {
        type: 'object',
        properties: {
          name: { type: 'string' },
        },
        required: [ 'name' ],
      },
    },
  },

  responseUnformat: {
    response: {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
    },
  },

  wrongConvert: {
    request: {
      query: {
        type: 'object',
        properties: {
          value: { type: [ 'string', 'number', 'boolean' ] },
        },
      },
    },
  },

  wrongNumber: {
    request: {
      query: {
        type: 'object',
        properties: {
          value: { type: [ 'number', 'string' ] },
        },
      },
    },
  },

  noConvert: {
    request: {
      query: {
        type: 'object',
        properties: {
          value: { type: [ 'number', 'string' ] },
        },
      },
    },
  },
};
