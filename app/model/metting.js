module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    
    const MettingSchema = new Schema({
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
    });
    return mongoose.model('Metting', MettingSchema);
  }