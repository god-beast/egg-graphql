module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const Projectchema = new Schema({
        createTime: {
            type: Date,
            default: Date.now
        },
        // 项目简介
        content: {
            type: String
        },
        author: {
            type: String
        },
        // 项目名   
        projectName: {
            type: String
        },
        tagList: {
            type: Array
        },
        userId: {
            type: String
        },
        // 部门id
        departmentId: {
            type: Array
        }
    });
    return mongoose.model('Project', Projectchema);
}