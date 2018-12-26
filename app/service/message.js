'use strict';
const Service = require('egg').Service;
const _ = require('lodash');
class MessageService extends Service {

    async get(query={
        limit:1,
        page:0,
        userId:null,
    }){
        let jump = (query.limit - 0) * (query.page - 1);
        let searchQuery = {
            userId:query.userId
        }
        if (!query.title) {
            delete searchQuery.title;
        }
        if (!query.userId) {
            delete searchQuery.userId;
        }
        let list = await this.ctx.model.Message
            .find(searchQuery).sort('-createTime').skip(jump).limit(query.limit - 0).exec();
        let total = await this.ctx.model.Message.find(searchQuery).sort('-createTime')
            .count();
        return { list, total }
    }

    async update(body){
        return this.ctx.model.Message.updateOne({
            _id: body._id
          }, {
            status:body.status,
            title:body.title,
            questionList:body.questionList
          }).exec();
    }

    async delete(_id){
        return this.ctx.model.Message.deleteOne({
            _id
          }).exec();
    }

    async create(params){
        return this.ctx.model.Message.create(
            params
        );
    }
}

module.exports = MessageService;