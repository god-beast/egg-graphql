'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const QuestionSchema = new Schema({
        createTime: {
            type: Date,
            default:Date.now
          },
        status:{ type: String },
        title:{ type: String },
        questionList:{type: Array},
    });

    return mongoose.model('Question', QuestionSchema);
};