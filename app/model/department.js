'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const DepartmentSchema = new Schema({
    departmentId: { type: Number },
    departmentName: { type: String },
    introduction: { type: String },
    userList: { type: Array },
    children: { type: Array }
  });

  return mongoose.model('Department', DepartmentSchema);
};