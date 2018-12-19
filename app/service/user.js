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
    let {
      name,
      username,
      page,
      limit
    } = query;
    let jump  = (limit-0)*(page-1);
    const querys = {
      name:name,
      username:username
    };
    if(!querys.name){
      delete querys.name;
    }
    if(!querys.username){
      delete querys.username;
    }
    return {
      data:await this.ctx.model.User.find(querys).skip(jump).limit(limit-0).exec(),
      total:await this.ctx.model.User.find(querys).count()
    }
  }


  async create(body) {
    return this.ctx.model.User.create(body);
  }

  async edit(body) {
    return this.ctx.model.User.updateOne({
      userId: body.userId
    }, {
      ...body
    }).exec();
  }

  async delete(userId) {
    return this.ctx.model.User.deleteOne({
      userId
    }).exec();
  }

}

module.exports = UserService;