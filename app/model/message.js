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
        // 任务内容
        content:{
            type: String,
        },
        userId:{
            type: String,
        },
    });
  
    return mongoose.model('Mwssage', MessageSchema);
  }