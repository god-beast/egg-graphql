'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    roles:{ type: Array ,default:['admin']},
    token: { type: String,default:'admin' },
    introduction: { type: String },
    avatar: { type: String ,default:'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'},
    name: { type: String },
    username: { type: String },
    password: { type: String },

  });

  return mongoose.model('User', UserSchema);
};