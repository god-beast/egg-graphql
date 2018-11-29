'use strict';

const validator = require('validator');
const utility = require('utility');
const uuid = require('uuid');
const Controller = require('egg').Controller;

class UserController extends Controller {

  async logout() {
    const {
      ctx
    } = this;
    ctx.session = null;
    ctx.logout();
  }

  async login() {
    const {
      ctx,
      service,
      config
    } = this;
    let result = await ctx.service.user.login(ctx.request.body);
    if (result.length) {
      this.ctx.body = {
        code: 200,
        data: result[0]
      }
    } else {
      this.ctx.body = {
        code: 200,
        data: {},
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
    let result = await ctx.service.user.login(ctx.request.body);
    if (result.length) {
      this.ctx.body = {
        code: 200,
        data: result[0]
      }
    } else {
      this.ctx.body = {
        code: 200,
        data: {},
        message: 'token失效'
      }
    }
  }


  async get() {
    const {
      ctx
    } = this;
    let result = await ctx.service.user.get(ctx.query);
    ctx.body = {
      code: 200,
      data: result
    }
  }

  async create() {
    const {
      ctx
    } = this;
    let result = await ctx.service.department.get();
    result = result[0];
    let {
      parentId,
      departmentName,
      introduction
    } = ctx.request.body;
    if (parentId != -1) {
      let indexArray = (parentId + '').split('');
      let flag = 0,
        aim = result.children;
      while (indexArray[flag]) {
        aim = aim[indexArray[flag]];
        flag++;
      }
      aim.children.push({
        departmentId: aim.departmentId + '' + aim.children.length - 0,
        departmentName: departmentName,
        introduction: introduction,
        children: [],
        userList: []
      })
    } else {
      result.children.push({
        departmentId: result.children.length,
        departmentName: departmentName,
        introduction: introduction,
        children: [],
      })
    }
    await ctx.service.department.create(result.children);
    ctx.body = {
      code: 200,
      data: []
    }
  }

  async edit() {
    const {
      ctx
    } = this;
    let result = await ctx.service.department.get();
    result = result[0];
    let {
      departmentId,
      departmentName,
      introduction
    } = ctx.request.body;
    if (departmentId != -1) {
      let indexArray = (departmentId + '').split('');
      let flag = 0,
        aim = result.children;
      while (indexArray[flag]) {
        aim = aim[indexArray[flag]];
        flag++;
      }
      aim.departmentName = departmentName;
      aim.introduction = introduction;
      await ctx.service.department.edit(0, result.children);
    } else {
      await ctx.service.department.edit(1, {
        departmentName,
        introduction
      });
    }
    ctx.body = {
      code: 200,
      data: result[0]
    }
  }

  async delete() {
    const {
      ctx
    } = this;
    let result = await ctx.service.department.get();
    let {
      departmentId,
    } = ctx.query;
    result = result[0];
    let indexArray = (departmentId + '').split('');
    let flag = 0,
      aim = result.children;

    while (aim[indexArray[flag]].children.length > 0) {
      aim = aim[indexArray[flag]].children;
      flag++;
    }
    aim.splice(indexArray[flag], 1);
    await ctx.service.department.delete(result.children);
    ctx.body = {
      code: 200,
      data: []
    }
  }

}

module.exports = UserController;