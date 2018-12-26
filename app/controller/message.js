'use strict';

const Controller = require('egg').Controller;

class MessageController extends Controller {

    async get(ctx) {
        let result = await ctx.service.message.get(ctx.query);
        ctx.body = {
            code: 200,
            data: result.list,
            total: result.total
        }
    }

    async update(ctx) {
        let result = await ctx.service.message.update(ctx.request.body);
        ctx.body = {
            code: 200,
            data: [],
        }
    }

    async delete(ctx) {
         await ctx.service.message.delete(ctx.query._id);
        ctx.body = {
            code: 200,
            data: [],
        }
    }

    async create(ctx) {
        let result = await ctx.service.message.create(ctx.request.body);
        ctx.body = {
            code: 200,
            data: [],
        }
    }
}

module.exports = MessageController;