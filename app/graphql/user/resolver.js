'use strict';
module.exports = {
    Query: {
        async getUser(root, {
            name,username,page,limit
        }, ctx) {
            let result= await ctx.connector.user.getUserListByService({name,username,page,limit});
            return result.data;
        },
    },
};