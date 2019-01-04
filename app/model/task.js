module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    
    const TaskSchema = new Schema({
        // 创建时间
        createTime: {
            type: Date,
            default:Date.now
        },
        // 任务名称
        taskName:{
            type: String,
        },
        taskId:{
            type: String,
        },
        // 关联版本
        userId:{
            type: String,
        },
        // 任务创建人
        author:{
            type: String,
        },
        // 关联用户列表
        userList:{
            type: Array,
        },
        // {
        //     userName:'',
        //     userId:'',
        //     status:0,
        // }
        // 关联问卷名称
        questionName:{
            type: String,
        },
        // 关联问卷id
        questionId:{
            type: String, 
        },
        // 任务内容
        questionList:{
            type: Array,
        },
        content:{
            type: String, 
        }
        // {
        //     title:"",
        //     options:[
        //         {
        //             title:,
        //             sum:
        //         },
        //         {

        //         }
        //     ],
        //     type:,
        // }
        
    });
  
    return mongoose.model('Task', TaskSchema);
  }