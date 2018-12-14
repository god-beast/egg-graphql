'use strict';
class ArticleConnector {
    constructor(ctx) {
        this.ctx = ctx;
    }
    async getArticleInfoByService(query) {
        let result = await this.ctx.service.article.fetchAll(query);
        return result.list;
    }
  }
module.exports = ArticleConnector;
