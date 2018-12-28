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
    async findDemand(params) {
        let tagArray=JSON.parse(params.tag);
        let jump = (params.limit - 0) * (params.page - 1);
        let searchQuery = {
            createTime: params.createTime,
            tag:tagArray[1],
            projectName:tagArray[0]
        }
        if (!params.createTime) {
            delete searchQuery.createTime;
        }
        if (!tagArray[1]) {
            delete searchQuery.tag;
        }
        if (!tagArray[0]) {
            delete searchQuery.projectName;
        }
        let total=[{count:0}];
        let list=  await this.ctx.model.Demand
        .aggregate([
            {
            $group:{
                _id:{createTime:'$createTime',tag:'$tag',projectName:'$projectName'},
                children:{$push:{
                    content:'$content',
                    markdown:'$markdown',
                    author:'$author',
                    userId:'$userId',
                    type:'$type'
                }},
                count:{$sum:1}
            }
        },{
            $project:{
                createTime:"$_id.createTime",
                tag:"$_id.tag",
                projectName:"$_id.projectName",
                _id:0,
                children:"$children",
                count:"$count"
            }
        },{
            $match:searchQuery
        },{
            $sort:{createTime:-1}
        },{
            $skip:jump
        },{
            $limit:params.limit - 0
        }]);
         await this.ctx.model.Demand.aggregate([{
            $group:{
                _id:{createTime:'$createTime',tag:'$tag',projectName:'$projectName'},
                children:{$push:{
                    content:'$content',
                    author:'$author',
                    userId:'$userId',
                    type:'$type'
                }},
                count:{$sum:1}
            }
        },{
            $project:{
                createTime:"$_id.createTime",
                tag:"$_id.tag",
                _id:0,
                children:"$children",
                count:"$count"
            }
        },{
            $match:searchQuery
        },{
            $count:"count"
        }],function(err,count){
            if(count.length>0){
                total=count;
            }
        }).exec();
        return { list, total:total[0].count }
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


    async getProject(query){
        let jump = (query.limit - 0) * (query.page - 1);
        let searchQuery = {
            createTime: query.createTime
        }
        if (!query.createTime) {
            delete searchQuery.createTime;
        }
        let list = await this.ctx.model.Project
            .find(searchQuery).sort('-createTime').skip(jump).limit(query.limit - 0).exec();
        let total = await this.ctx.model.Project.find(searchQuery).sort('-createTime')
            .count();
        return { list, total }
    }

    async updateProject(body){
        let updateQuery={
            projectName:body.projectName,
            content:body.content,
            tagList:body.tagList,
        }
        for (const key in updateQuery) {
            if (!updateQuery[key]) {
                delete updateQuery[key]
            }
        }
        return this.ctx.model.Project.updateOne({
            _id: body._id
          }, updateQuery).exec();
    }

    async deleteProject(_id){
        return this.ctx.model.Project.deleteOne({
            _id
          }).exec();
    }

    async createProject(params){
        return this.ctx.model.Project.create(
            params
        );
    }
}

module.exports = ProjectService;