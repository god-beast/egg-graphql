'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const ReportSchema = new Schema({
        name: { type: String },
        checkName: { type: String,default:'' },
        userId: { type: String },
        reportName: { type: String },
        status: { type: String, default:'0' },
        createTime: {
            type: Date,
            default: Date.now
        },
        checkTime: {
            type: Date,
        },
        id:{type: String},
        total: { type: Number },
        closed: { type: Number },
        remain: { type: Number },
        probability: { type: String },
        new: { type: String },
        change: { type: String },
        important: { type: String },
        bugList: { type: Array }
    });

    return mongoose.model('Report', ReportSchema);
};