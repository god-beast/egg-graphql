'use strict';

const validator  = require('validator');
const utility    = require('utility');
const uuid       = require('uuid');
const Controller = require('egg').Controller;

const  fetch  =require('../utils/response');

function GenNonDuplicateID(randomLength) {
  return Number(Math.random().toString().substr(3, randomLength) + Date.now()).toString(36)
}

class UserController extends Controller {

  async logout() {
    const {
      ctx
    } = this;
    fetch(200,ctx,{data:[]});
  }

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


  async get() {
    const {
      ctx
    } = this;
    let {data,total} = await ctx.service.user.get(ctx.query);

    // ctx.connection.setTimeout(0);

    // function timeout(ms) {
    //   return new Promise((resolve) => {
    //     setTimeout(resolve, ms);
    //   });
    // }

    // await timeout(3*60*1000);
    
    ctx.body = {
      code: 200,
      data: data,
      total:total
    }
  }


  // 添加账号
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
    await ctx.service.department.deleteUser(userId);
    ctx.body = {
      code: 200,
      data: []
    }
  }

  async disabledUser() {
    const {
      ctx
    } = this;
    let userId = ctx.request.body.userId;
    console.log(typeof (ctx.request.body.disabled));
    await ctx.model.User.updateOne({
      userId
    }, {
      disabled: ctx.request.body.disabled
    }).exec();

    ctx.body = {
      code: 200,
      data: []
    }
  }

}

module.exports = UserController;