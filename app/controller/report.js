'use strict';
const Controller = require('egg').Controller;
function GenNonDuplicateID(randomLength) {
    return Number(Math.random().toString().substr(3, randomLength) + Date.now()).toString(36)
  }
class ReportController extends Controller {

  /**
   * @description 获取用户的权限值
   * @function getPermission
   * @return 权限id
   */
  async permission() {
    const {
      ctx
    } = this;
    let result = await ctx.service.user.login(ctx.query);
    if (result.length) {
      this.ctx.body = {
        code: 200,
        data: result[0]
      }
    } else {
      this.ctx.body = {
        code   : 200,
        data   : {},
        message: 'token失效'
      }
    }
  }

  async get() {
    const {
      ctx
    } = this;
    let {data,total} = await ctx.service.report.get(ctx.query);

    ctx.body = {
      code: 200,
      data: data,
      total:total
    }
  }

  async getById(){
    const {
      ctx
    } = this;
    let data = await ctx.service.report.getOne(ctx.query);

    ctx.body = {
      code: 200,
      data: data,
    }
  }

  async create() {
    const {
      ctx
    } = this;
    let body = ctx.request.body;
    body.id = GenNonDuplicateID(20);
    // 添加userId
    await ctx.service.report.create(body);
    ctx.body = {
      code: 200,
      data: []
    }
  }

  async edit() {
    const {
      ctx
    } = this;
    let body = ctx.request.body;
    await ctx.service.report.edit(body);
    ctx.body = {
      code: 200,
      data: []
    }
  }

  /**
   * @description 删除用户
   * @memberof ReportController
   */
  async delete() {
    const {
      ctx
    } = this;
    let {
      userId,
    } = ctx.query;
    await ctx.service.user.delete(userId);
    await ctx.service.department.deleteUser(userId);
    ctx.body = {
      code: 200,
      data: []
    }
  }


}

module.exports = ReportController;