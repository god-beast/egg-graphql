'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  /**
   * Retrieve article records.
   *
   * @return {Object|Array}
   */

  async find (ctx) {
    if (ctx.query._q) {
      return ctx.service.article.search(ctx.query);
    } else {
      let body=await ctx.service.article.fetchAll(ctx.query);
      ctx.body={
        code:200,
        data:body
      }
    }
  }

  /**
   * Retrieve a article record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }
    return ctx.service.article.fetch(ctx.params);
  }

  /**
   * Count article records.
   *
   * @return {Number}
   */

  async count(ctx) {
    return ctx.service.article.count(ctx.query);
  }

  /**
   * Create a/an article record.
   *
   * @return {Object}
   */

  async create(ctx)  {
    let result=await ctx.service.article.add(ctx.query);
    this.ctx.body={
      code:200,
      body:[],
    }
  }

  /**
   * Update a/an article record.
   *
   * @return {Object}
   */

  async update(ctx, next) {
    return ctx.service.article.edit(ctx.params, ctx.request.body) ;
  }

  /**
   * Destroy a/an article record.
   *
   * @return {Object}
   */

   async destroy (ctx, next) {
    return ctx.service.article.remove(ctx.params);
  }
}

module.exports =  ArticleController;



