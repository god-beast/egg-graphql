'use strict';

const Controller = require('egg').Controller;

class ProjectController extends Controller {
 

  async findMetting(ctx) {
    let result = await ctx.service.project.findMetting(ctx.query);
    ctx.body = {
      code: 200,
      data: result.list,
      total: result.total
    }
  }

  /**
   * Create a/an article record.
   *
   * @return {Object}
   */

  async createMetting(ctx) {
    let result = await ctx.service.project.createMetting(ctx.request.body);
    this.ctx.body = {
      code: 200,
      body: [],
    }
  }

  async findDemand(ctx) {
    let result = await ctx.service.project.findDemand(ctx.query);
    ctx.body = {
      code: 200,
      data: result.list,
      total: result.total
    }
  }

  /**
   * Create a/an article record.
   *
   * @return {Object}
   */

  async createDemand(ctx) {
    let result = await ctx.service.project.createDemand(ctx.request.body);
    this.ctx.body = {
      code: 200,
      body: [],
    }
  }
  
}

module.exports = ProjectController;