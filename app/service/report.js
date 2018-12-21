'use strict';
const Service = require('egg').Service;

class ReportService extends Service {

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
      data:await this.ctx.model.Report.find(querys).sort({
        createTime:-1
    }).skip(jump).limit(limit-0).exec(),
      total:await this.ctx.model.Report.find(querys).count()
    }
  }

  async getOne(query){
    let {id}=query;
    return await this.ctx.model.Report.findOne({
        id
    })
  }


  async create(body) {
    return this.ctx.model.Report.create(body);
  }

  async edit(body) {
    return this.ctx.model.Report.updateOne({
      id: body.id
    }, {
      status:body.status,
      checkName:body.name,
      checkTime:new Date().getTime()
    }).exec();
  }

  async delete(userId) {
    return this.ctx.model.User.deleteOne({
      userId
    }).exec();
  }

}

module.exports = ReportService;