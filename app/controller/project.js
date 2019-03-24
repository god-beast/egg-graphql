'use strict';

const Controller = require('egg').Controller;

class ProjectController extends Controller {


    /**
     * @function findMetting
     * @description 获取会议
     */
    async findMetting(ctx) {
        let result = await ctx.service.project.findMetting(ctx.query);
        ctx.body = {
            code: 200,
            data: result.list,
            total: result.total
        }
    }

    /**
     * @function createMetting
     * @description 创建会议
     */
    async createMetting(ctx) {
        let result = await ctx.service.project.createMetting(ctx.request.body);
        this.ctx.body = {
            code: 200,
            body: [],
        }
    }

    /**
     * @function findDemand
     * @description 获取需求列表
     */
    async findDemand(ctx) {
        let result = await ctx.service.project.findDemand(ctx.query);
        ctx.body = {
            code: 200,
            data: result.list,
            total: result.total
        }
    }

    /**
     * @function createDemand
     * @description 创建需求
     */
    async createDemand(ctx) {
        let result = await ctx.service.project.createDemand(ctx.request.body);
        this.ctx.body = {
            code: 200,
            body: [],
        }
    }

    /**
     * @function getProject
     * @description 获取项目
     */
    async getProject(ctx) {
        let result = await ctx.service.project.getProject(ctx.query);
        ctx.body = {
            code: 200,
            data: result.list,
            total: result.total
        }
    }

    /**
     * @function updateProject
     * @description 更新项目
     */
    async updateProject(ctx) {
        let result = await ctx.service.project.updateProject(ctx.request.body);
        ctx.body = {
            code: 200,
            data: [],
        }
    }

    /**
     * @function deleteProject
     * @description 删除项目
     */
    async deleteProject(ctx) {
         await ctx.service.project.deleteProject(ctx.query._id);
        ctx.body = {
            code: 200,
            data: [],
        }
    }

    /**
     * @function createProject
     * @description 创建项目
     */
    async createProject(ctx) {
        let result = await ctx.service.project.createProject(ctx.request.body);
        ctx.body = {
            code: 200,
            data: [],
        }
    }

}

module.exports = ProjectController;