'use strict';

const Service = require('egg').Service;

class DepartmentService extends Service {
  
  async get() {
    return this.ctx.model.Department.find({}).exec();
  }


  async create(children) {
    return this.ctx.model.Department.updateOne({
        departmentId:-1
    },{children:children}).exec();
  }

  async edit(type,children) {
      if(type===1){
        return this.ctx.model.Department.updateOne({
            departmentId:-1
        },{departmentName:children.departmentName,introduction:children.introduction}).exec(); 
      }else{
        return this.ctx.model.Department.updateOne({
            departmentId:-1
        },{children:children}).exec(); 
      }
  }

  async delete(children) {
    return this.ctx.model.Department.updateOne({
        departmentId:-1
    },{children:children}).exec();
  }

}

module.exports = DepartmentService;