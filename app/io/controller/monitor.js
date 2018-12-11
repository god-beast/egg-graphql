'use strict'

const Controller = require('egg').Controller;

class Monitor extends Controller {
  async datacount() {
    const { ctx, app } = this;
    const message = ctx.args[0];
    await ctx.socket.emit('res', `Hi! I've got your message: ${message}`);
  }
}

module.exports = Monitor;