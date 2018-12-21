module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    
    const DemandSchema = new Schema({
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
      tag:{
        type: String
      },
      type:{
        type: String
      },
    });
  
    return mongoose.model('Demand', DemandSchema);
  }