'use strict';

const Controller = require('egg').Controller;

class QuestionController extends Controller {

    async get(ctx) {
        let result = await ctx.service.question.get(ctx.query);
        ctx.body = {
            code: 200,
            data: result.list,
            total: result.total
        }
    }

    async update(ctx) {
        let result = await ctx.service.question.update(ctx.request.body);
        ctx.body = {
            code: 200,
            data: [],
        }
    }

    async delete(ctx) {
         await ctx.service.question.delete(ctx.query._id);
        ctx.body = {
            code: 200,
            data: [],
        }
    }

    async create(ctx) {
        let result = await ctx.service.question.create(ctx.request.body);
        ctx.body = {
            code: 200,
            data: [],
        }
    }
}

module.exports = QuestionController;