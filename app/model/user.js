'use strict';



module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    userId:{ type: String },
    roles:{ type: Array ,default:['normal']},
    token: { type: String,default:'developer' },
    introduction: { type: String },
    avatar: { type: String ,default:'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'},
    name: { type: String },
    username: { type: String },
    password: { type: String ,default:'123456'},
    departmentId:{ type: Array,default:[-1] },
    departmentName:{ type: String },
    office:{type: String},
    disabled:{type:Boolean,default:false},
  });

  return mongoose.model('User', UserSchema);
};