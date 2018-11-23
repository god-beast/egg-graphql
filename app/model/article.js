module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  
  const ArticleSchema = new Schema({
    title: {
      type: String
    },
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
    userId: {
      type: String
    },
    tag: {
      type: Number
    }
  });

  return mongoose.model('Article', ArticleSchema);
}