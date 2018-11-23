'use strict';

const validator = require('validator');
const utility = require('utility');
const uuid = require('uuid');
const Controller = require('egg').Controller;

class UserController extends Controller {

  async logout() {
    const { ctx } = this;
    ctx.session = null;
    ctx.logout();
  }

  async login() {
    const { ctx, service, config } = this;
    let result=await ctx.service.user.login(ctx.request.body);
    if(result.length){
      this.ctx.body={
        code:200,
        data:result[0]
      }
    }else{
      this.ctx.body={
        code:200,
        data:{},
        message:'用户名或密码错误'
      }
    }
  }

  /**
   * @description 获取用户的权限值
   * @function getPermission
   * @return 权限id
   */
  async permission() {
    const { ctx } = this;
    let result=await ctx.service.user.login(ctx.request.body);
    if(result.length){
      this.ctx.body={
        code:200,
        data:result[0]
      }
    }else{
      this.ctx.body={
        code:200,
        data:{},
        message:'token失效'
      }
    }
  }

 }

module.exports = UserController;