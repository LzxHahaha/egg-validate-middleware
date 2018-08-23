'use strict';

const path = require('path');
const Ajv = require('ajv');
const fastJson = require('fast-json-stringify');

module.exports = app => {
  const ajv = new Ajv();

  const dir = path.join(app.config.baseDir, 'app/schema');
  app.loader.loadToContext(dir, 'schema', {
    inject: app,
    initializer(model) {
      for (const key of Object.getOwnPropertyNames(model)) {
        const { request, response } = model[key];
        const newModel = {};
        if (request) {
          newModel.validate = ajv.compile({
            type: 'object',
            properties: request,
          });
        }
        if (response) {
          newModel.stringify = fastJson(response);
        }
        model[key] = newModel;
      }
      return model;
    },
    caseStyle: 'lower',
  });
};
