module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  
  const ArticleSchema = new Schema({
    createTime: {
      type: Date,
      default:Date.now
    },
    departmentId:{
      type: Array
    },
    content: {
      type: String
    },
    author: {
      type: String
    },
    userId: {
      type: String
    },
  });

  return mongoose.model('Article', ArticleSchema);
}