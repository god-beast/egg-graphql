
module.exports = options => {
  return async function timeout(ctx, next) {
    ctx.res.setTimeout(0);
    await next();
  };
};