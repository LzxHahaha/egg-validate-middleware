'use strict';

function convert(obj, schema) {
  for (const key of Object.getOwnPropertyNames(obj)) {
    if (!schema.properties[key]) {
      continue;
    }
    let type = schema.properties[key].type;

    let canConvert = false;
    // convert only when there is only one type define
    if (typeof type === 'string') {
      canConvert = type !== 'string';
    } else {
      // type can only be string or array
      const typeSet = new Set(type);
      typeSet.delete('string');
      if (type.size === 1) {
        canConvert = true;
        type = Array.from(typeSet)[0];
      }
    }

    if (canConvert && (type === 'number' || type === 'integer')) {
      const value = +obj[key];
      if (!isNaN(value)) {
        obj[key] = type === 'integer' ? Math.floor(value) : value;
      }
    }
  }
}

module.exports = (options = {}) => {
  const { convertNumber = true, schema } = options;

  return async function validate(ctx, next) {
    if (!schema) {
      return await next();
    }

    const { rawData, validate, stringify } = schema;

    if (validate) {
      if (convertNumber && rawData.request) {
        if (rawData.request.query) {
          convert(ctx.query, rawData.request.query);
        }
        if (rawData.request.params) {
          convert(ctx.params, rawData.request.params);
        }
      }

      const valid = validate({
        query: ctx.query,
        body: ctx.request.body,
        params: ctx.params,
      });

      if (!valid) {
        const error = new Error('Validation Failed');
        error.errors = valid.errors;
        throw error;
      }
    }

    const data = await next();
    if (stringify) {
      ctx.body = stringify(data);
      return ctx.body;
    }
    return data;
  };
};
