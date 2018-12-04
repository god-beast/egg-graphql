'use strict';

const Service = require('egg').Service;

class DepartmentService extends Service {

    async get() {
        return this.ctx.model.Department.find({}).exec();
    }


    async create(children) {
        return this.ctx.model.Department.updateOne({
            departmentId: -1
        }, {
            children: children
        }).exec();
    }

    async edit(type, children) {
        if (type === 1) {
            return this.ctx.model.Department.updateOne({
                departmentId: -1
            }, {
                departmentName: children.departmentName,
                introduction: children.introduction
            }).exec();
        } else {
            return this.ctx.model.Department.updateOne({
                departmentId: -1
            }, {
                children: children
            }).exec();
        }
    }

    async delete(children) {
        return this.ctx.model.Department.updateOne({
            departmentId: -1
        }, {
            children: children
        }).exec();
    }

    async deleteUser(userId) {
        const {
            ctx
        } = this;
        let deparment = await ctx.service.department.get();
        // 清除存在的user
        const deleteUser = (deparment) => {
            for (let item of deparment) {
                for (let index = 0; index < item.userList.length; index++) {
                    if (item.userList[index].userId == userId) {
                        item.userList.splice(index, 1);
                        return;
                    }
                }
                if (item.children.length > 0) {
                    deleteUser(item.children);
                }
            }
        }
        deleteUser(deparment);
        
        return this.ctx.model.Department.updateOne({
            departmentId: -1
        }, {
            children: deparment[0].children
        }).exec();
    }
    

    async changeDepartmentUser(userId, name, departmentId) {
        const {
            ctx
        } = this;
        let deparment = await ctx.service.department.get();
        departmentId = departmentId[departmentId.length - 1];
        // 清除存在的user
        const deleteUser = (deparment) => {
            for (let item of deparment) {
                for (let index = 0; index < item.userList.length; index++) {
                    if (item.userList[index].userId == userId) {
                        item.userList.splice(index, 1);
                        return;
                    }
                }
                if (item.children.length > 0) {
                    deleteUser(item.children);
                }
            }
        }
        deleteUser(deparment);
        // 新增user
        const addUser = (deparment) => {
            for (let item of deparment) {
                if (item.departmentId == departmentId) {
                    item.userList.push({
                        name,
                        userId
                    })
                } else {
                    if (item.children.length > 0) {
                        addUser(item.children);
                    }
                }
            }
        }
        addUser(deparment);
        return this.ctx.model.Department.updateOne({
            departmentId: -1
        }, {
            children: deparment[0].children
        }).exec();
    }
}

module.exports = DepartmentService;