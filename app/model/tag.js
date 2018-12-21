module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    
    const Tagchema = new Schema({
      createTime: {
        type: Date,
        default:Date.now
      },
      content: {
        type: String
      },
      author: {
        type: String
      },
      // 版本名   
      tagName:{
        type: String
      },
      userId: {
        type: String
      },
    });
    return mongoose.model('Tag', Tagchema);
  }