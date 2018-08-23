'use strict';

function getSchema(path, root) {
  if (path === '' || path === '/') {
    return root;
  }
  if (!path) {
    return null;
  }
  let schema = root;
  const pathArr = path.split('/').filter(el => !!el);
  for (const key of pathArr) {
    if (!schema[key]) {
      return null;
    }
    schema = schema[key];
  }
  return schema;
}

function convert(obj, schema) {
  for (const key of Object.getOwnPropertyNames(obj)) {
    if (!schema[key]) {
      continue;
    }
    const type = schema[key].type;
    // convert only when there is only one type define
    if (typeof type === 'string' && type !== 'string') {
      if (type === 'number' || type === 'integer') {
        const value = +obj[key];
        if (!isNaN(value)) {
          obj[key] = type === 'integer' ? Math.floor(value) : value;
        }
      } else if (type === 'boolean') {
        obj[key] = obj[key] === 'true';
      }
    }
  }
}

module.exports = options => {
  const { convertType } = options;

  return async function validate(ctx, next) {
    const schema = getSchema(this.request.path, ctx.schema);
    if (!schema) {
      return await next();
    }

    if (schema.validate) {
      if (convertType) {
        if (schema.rowData.request) {
          convert(ctx.query, ctx.rowData.request);
        }
        if (schema.rowData.params) {
          convert(ctx.params, ctx.rowData.params);
        }
      }
      const valid = schema.validate({
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
    if (!ctx.body && schema.stringify) {
      ctx.body = schema.stringify(data);
    } else {
      return data;
    }
  };
};
