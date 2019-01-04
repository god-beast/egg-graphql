'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  /**
   * Retrieve article records.
   *
   * @return {Object|Array}
   */

  async find(ctx) {
    let query = ctx.query;
    query.userId = JSON.parse(query.userId);
    let result = await ctx.service.article.fetchAll(ctx.query);
    ctx.body = {
      code: 200,
      data: result.list,
      total: result.total
    }
  }


  async findDateList(ctx) {
    let result = await ctx.service.article.fetchDate(ctx.query);
    ctx.body = {
      code: 200,
      data: result,
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

  async userList() {
    const { ctx, app } = this;
    let userList = await ctx.service.department.getUser(ctx.request.body);
    ctx.body = {
      code: 200,
      data: userList,
    }
    return false;
    let result = await app.redis.smembers('content:list');
    let departmentId = [-1, 5, 50];
    let usermap = {
      '2': '陈亚洲?bbnwnjj75s80000000',
      '6': '王文召?g6ijs4dxd9k0000000',
      '7': '袁嘉俊?x4phsechiyo0000000',
      '8': '曹仕林?3o6ehc8rg3y00000000',
      '9': '陈阳杰?udm1b5wy8pc0000000',
      '11': '赵豪?rqkovl76vtc0000000',
      '12': '汤剑超?7k207u859ks00000000',
      '15': '李文涛?b1gxh169j8w0000000',
      '16': '刘东?18dh8kidtujk00000000',
      '19': '李伟红?spwjxs2p8800000000',
      '20': '万朱浩?1oco1lgkkfwg00000000',
    };
    let all = [];
    for (let item of result) {
      let ff=JSON.parse(item);
       let dd=usermap[ff.userId];
       if(!dd){
         continue;
       }
       let name=dd.split('?')[0];
       let id=dd.split('?')[1];
       ff.userId=id;
       ff.author=name;
       ff.departmentId=departmentId;
       ff.createTime=ff.time;
       delete ff.time;
       all.push(ff);
    }
    ctx.model.Article.insertMany(all);
    ctx.body = {
      code: 200,
      data: all,
    }
  }

  /**
   * Create a/an article record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let result = await ctx.service.article.add(ctx.request.body);
    this.ctx.body = {
      code: 200,
      body: [],
    }
  }

  /**
   * Update a/an article record.
   *
   * @return {Object}
   */

  async update(ctx, next) {
    return ctx.service.article.edit(ctx.params, ctx.request.body);
  }

  /**
   * Destroy a/an article record.
   *
   * @return {Object}
   */

  async destroy(ctx, next) {
    return ctx.service.article.remove(ctx.params);
  }
}

module.exports = ArticleController;