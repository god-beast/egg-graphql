'use strict';
class UserConnector {
    constructor(ctx) {
        this.ctx = ctx;
    }
    async getUserListByService(query) {
        return  await this.ctx.service.user.get(query);
    }
  }
module.exports = UserConnector;
