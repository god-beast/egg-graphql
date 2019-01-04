module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    
    const MessageSchema = new Schema({
        // 创建时间
        createTime: {
            type: Date,
            default:Date.now
        },
        // 任务状态 0未完成 1已完成 2已删除
        status:{
            type: Number,
            default:0
        },
        // 任务名称
        taskName:{
            type: String,
        },
        taskId:{
            type: String,
        },
        // 任务内容
        content:{
            type: String,
        },
        tag:{
            type: Array,
        },
        userId:{
            type: String,
        },
        author:{
            type: String,
        },
        questionId:{
            type: String,
        },
        // 任务关联用户id
        taskUserId:{
            type: String,
        },
        taskUserName:{
            type: String,
        },
    });
  
    return mongoose.model('Message', MessageSchema);
  }