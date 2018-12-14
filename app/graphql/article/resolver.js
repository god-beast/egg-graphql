'use strict';
module.exports = {
    Query: {
        async getArticle(root, {
            userId,createTime,page,limit
        }, ctx) {
            let result = await ctx.connector.article.getArticleInfoByService({userId,createTime,page,limit});
            return  result
        },
    },
};