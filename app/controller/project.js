'use strict';

const Controller = require('egg').Controller;

class ProjectController extends Controller {


    async findMetting(ctx) {
        let result = await ctx.service.project.findMetting(ctx.query);
        ctx.body = {
            code: 200,
            data: result.list,
            total: result.total
        }
    }

    /**
     * Create a/an article record.
     *
     * @return {Object}
     */

    async createMetting(ctx) {
        let result = await ctx.service.project.createMetting(ctx.request.body);
        this.ctx.body = {
            code: 200,
            body: [],
        }
    }

    async findDemand(ctx) {
        let result = await ctx.service.project.findDemand(ctx.query);
        ctx.body = {
            code: 200,
            data: result.list,
            total: result.total
        }
    }

    /**
     * Create a/an article record.
     *
     * @return {Object}
     */

    async createDemand(ctx) {
        let result = await ctx.service.project.createDemand(ctx.request.body);
        this.ctx.body = {
            code: 200,
            body: [],
        }
    }

    async getProject(ctx) {
        let result = await ctx.service.project.getProject(ctx.query);
        ctx.body = {
            code: 200,
            data: result.list,
            total: result.total
        }
    }

    async updateProject(ctx) {
        let result = await ctx.service.project.updateProject(ctx.request.body);
        ctx.body = {
            code: 200,
            data: [],
        }
    }

    async deleteProject(ctx) {
         await ctx.service.project.deleteProject(ctx.query._id);
        ctx.body = {
            code: 200,
            data: [],
        }
    }

    async createProject(ctx) {
        let result = await ctx.service.project.createProject(ctx.request.body);
        ctx.body = {
            code: 200,
            data: [],
        }
    }

}

module.exports = ProjectController;