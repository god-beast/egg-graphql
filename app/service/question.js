'use strict';
const Service = require('egg').Service;
const _ = require('lodash');
class QuestionService extends Service {

    async get(query={
        limit:1,
        page:0,
        title:null,
        _id:null,
    }){
        let jump = (query.limit - 0) * (query.page - 1);
        let searchQuery = {
            title: query.title,
            _id:query._id
        }
        if (!query.title) {
            delete searchQuery.title;
        }
        if (!query._id) {
            delete searchQuery._id;
        }
        let list = await this.ctx.model.Question
            .find(searchQuery).sort('-createTime').skip(jump).limit(query.limit - 0).exec();
        let total = await this.ctx.model.Question.find(searchQuery).sort('-createTime')
            .count();
        return { list, total }
    }

    async update(body){
        return this.ctx.model.Question.updateOne({
            _id: body._id
          }, {
            status:body.status,
            title:body.title,
            questionList:body.questionList
          }).exec();
    }

    async delete(_id){
        return this.ctx.model.Question.deleteOne({
            _id
          }).exec();
    }

    async create(params){
        return this.ctx.model.Question.create(
            params
        );
    }
}

module.exports = QuestionService;