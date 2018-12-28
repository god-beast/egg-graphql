'use strict';
const Service = require('egg').Service;
const _ = require('lodash');
class MessageService extends Service {

    async get(query){
        let searchQuery = {
            taskUserId:query.userId
        }
        if (!query.userId) {
            delete searchQuery.taskUserId;
        }
        console.log(searchQuery);
        let list = await this.ctx.model.Message
            .find(searchQuery).sort('-createTime').exec();
        let total = await this.ctx.model.Message.find(searchQuery)
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
        let mesList=[];
        for (let item of params.userList) {
            mesList.push({
                ...params,
                taskUserId:item.userId,
                taskUserName:item.name,
            })
        }
        return this.ctx.model.Message.insertMany(
            mesList
        );
    }
}

module.exports = MessageService;