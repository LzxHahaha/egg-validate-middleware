'use strict';

const path = require('path');
const Ajv = require('ajv');
const fastJson = require('fast-json-stringify');

module.exports = app => {
  // load schemas
  const ajv = new Ajv();
  const dir = path.join(app.config.baseDir, 'app/schema');
  app.loader.loadToApp(dir, 'schema', {
    inject: app,
    initializer(model) {
      const res = {};
      for (const key of Object.getOwnPropertyNames(model)) {
        const { request, response } = model[key];
        const newModel = { rawData: model[key] };
        if (request) {
          newModel.validate = ajv.compile({
            type: 'object',
            properties: request,
          });
        }
        if (response) {
          const { formatResponse } = app.config.validateMiddleware;
          const format = formatResponse ? formatResponse(response) : response;
          newModel.stringify = fastJson(format);
        }
        res[key] = newModel;
      }
      return res;
    },
    caseStyle: 'lower',
  });
};
