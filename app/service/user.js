'use strict';

const utility = require('utility');
const uuid = require('uuid');
const Service = require('egg').Service;

class UserService extends Service {

  async login(params) {
    // const query = { loginname: { $in: names } };
    return this.ctx.model.User.find(params).exec();
  }


  async permission(params) {
    // const query = { loginname: { $in: names } };
    return this.ctx.model.User.find({
      token: params.token
    }).exec();
  }

  async get(query) {
    let {name,
    username,
    page,
    limit}=query;
    const querys = { 
      name: { $in: name },
      username : { $in: username },
    };
    return this.ctx.model.User.find().exec();
  }


  async create(children) {
    return this.ctx.model.Department.updateOne({
      departmentId: -1
    }, {
      children: children
    }).exec();
  }

  async edit(type, children) {
    if (type === 1) {
      return this.ctx.model.Department.updateOne({
        departmentId: -1
      }, {
        departmentName: children.departmentName,
        introduction: children.introduction
      }).exec();
    } else {
      return this.ctx.model.Department.updateOne({
        departmentId: -1
      }, {
        children: children
      }).exec();
    }
  }

  async delete(children) {
    return this.ctx.model.Department.updateOne({
      departmentId: -1
    }, {
      children: children
    }).exec();
  }

}

module.exports = UserService;