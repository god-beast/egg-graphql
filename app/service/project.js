'use strict';
const Service = require('egg').Service;
const _ = require('lodash');
class ProjectService extends Service {
    /**
     * @function findMetting
     * @param  {type} query {description}
     * @return {type} {description}
     */
    async findMetting(query) {
        let jump = (query.limit - 0) * (query.page - 1);
        let searchQuery = {
            createTime: query.createTime
        }
        if (!query.createTime) {
            delete searchQuery.createTime;
        }
        let list = await this.ctx.model.Metting
            .find(searchQuery).sort('-createTime').skip(jump).limit(query.limit - 0).exec();
        let total = await this.ctx.model.Metting.find(searchQuery).sort('-createTime')
            .count();
        return { list, total }
    }

    /**
     * @description 创建晨会
     * @function createMetting
     * @param  {type} params {description}
     * @return {type} {description}
     */
    async createMetting(params) {
        return this.ctx.model.Metting.create(
            params
        );
    }

    
    /**
     * @function findMetting
     * @param  {type} query {description}
     * @return {type} {description}
     */
    async findDemand(query) {
        let jump = (query.limit - 0) * (query.page - 1);
        let searchQuery = {
            createTime: query.createTime,
            tag:query.tag
        }
        if (!query.createTime) {
            delete searchQuery.createTime;
        }
        if (!query.tag) {
            delete searchQuery.tag;
        }
        let list = await this.ctx.model.Demand
            .find(searchQuery).sort('-createTime').skip(jump).limit(query.limit - 0).exec();
        let total = await this.ctx.model.Demand.find(searchQuery).sort('-createTime')
            .count();
        return { list, total }
    }

    /**
     * @description 创建晨会
     * @function createMetting
     * @param  {type} params {description}
     * @return {type} {description}
     */
    async createDemand(params) {
        return this.ctx.model.Demand.create(
            params
        );
    }


    async getTag(query){
        let jump = (query.limit - 0) * (query.page - 1);
        let searchQuery = {
            createTime: query.createTime
        }
        if (!query.createTime) {
            delete searchQuery.createTime;
        }
        let list = await this.ctx.model.Tag
            .find(searchQuery).sort('-createTime').skip(jump).limit(query.limit - 0).exec();
        let total = await this.ctx.model.Tag.find(searchQuery).sort('-createTime')
            .count();
        return { list, total }
    }

    async updateTag(body){
        return this.ctx.model.Tag.updateOne({
            _id: body._id
          }, {
            content:body.content,
            tagName:body.tagName
          }).exec();
    }

    async deleteTag(_id){
        return this.ctx.model.Tag.deleteOne({
            _id
          }).exec();
    }

    async createTag(params){
        return this.ctx.model.Tag.create(
            params
        );
    }
}

module.exports = ProjectService;