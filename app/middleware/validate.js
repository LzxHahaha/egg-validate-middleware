'use strict';

module.exports = options => {
  const { transformQuery } = options;

  return async function validate(ctx, next) {

    // TODO: load schema by url and validate

    if (transformQuery) {
      // TODO: convert type
    }

    const data = await next();
    if (!ctx.body) {
      // TODO: check response schema and stringify
      ctx.body = data;
    }
  };
};
