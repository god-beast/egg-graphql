'use strict';
const Controller = require('egg').Controller;
const  fetch  =require('../utils/response');

function GenNonDuplicateID(randomLength) {
  return Number(Math.random().toString().substr(3, randomLength) + Date.now()).toString(36)
}

/**
 * @class UserController
 * @extends {Controller}
 */
class UserController extends Controller {

  /**
   *
   *
   * @memberof UserController
   */
  async logout() {
    const {
      ctx
    } = this;
    fetch(200,ctx,{data:[]});
  }

  /**
   *
   *
   * @memberof UserController
   */
  async login() {
    const {
      ctx
    } = this;
    let result = await ctx.service.user.login(ctx.request.body);
    if (result.length) {
      if(result[0].disabled){
        fetch(200,ctx,{data:[]},'用户已被锁定');
      }else{
        fetch(200,ctx,{data:result[0]},'成功登陆');
      }
    } else {
      this.ctx.body = {
        code   : 400,
        data   : {},
        message: '用户名或密码错误'
      }
    }
  }

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


  /**
   *
   *
   * @memberof UserController
   */
  async get() {
    const {
      ctx
    } = this;
    let {data,total} = await ctx.service.user.get(ctx.query);
    ctx.body = {
      code: 200,
      data: data,
      total:total
    }
  }


  /**
   *
   *
   * @memberof UserController
   */
  async create() {
    const {
      ctx
    } = this;
    let body = ctx.request.body;
    // 添加userId
    body.userId = GenNonDuplicateID(20);
    body.token  = body.userId;
    await ctx.service.user.create(body);
    await ctx.service.department.changeDepartmentUser(body.userId, body.name, body.departmentId);
    ctx.body = {
      code: 200,
      data: []
    }
  }

  /**
   *
   *
   * @memberof UserController
   */
  async edit() {
    const {
      ctx
    } = this;
    let body = ctx.request.body;
    await ctx.service.user.edit(body);
    await ctx.service.department.changeDepartmentUser(body.userId, body.name, body.departmentId);
    ctx.body = {
      code: 200,
      data: []
    }
  }

  /**
   * @description 删除用户
   * @memberof UserController
   */
  async delete() {
    const {
      ctx
    } = this;
    let {
      userId,
    } = ctx.query;
    await ctx.service.user.delete(userId);
    // 因为用户和部门相互关联，需要删除对应部门下的用户
    await ctx.service.department.deleteUser(userId);
    fetch(200,ctx);
  }

  /**
   *
   * @description 更新用户状态（禁用或者启用用户）
   * @memberof UserController
   */
  async disabledUser() {
    const {
      ctx
    } = this;
    let userId = ctx.request.body.userId;
    // console.log(typeof (ctx.request.body.disabled));
    await ctx.model.User.updateOne({
      userId
    }, {
      disabled: ctx.request.body.disabled
    }).exec();
    fetch(200,ctx);
  }

}

module.exports = UserController;