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
        token:params.token
    }).exec();
  }
}

module.exports = UserService;