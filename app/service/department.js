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
                    introduction  : children.introduction
                }).exec();
        } else {
            return this.ctx.model.Department.updateOne({
                departmentId: -1
            }, {
                    children: children
                }).exec();
        }
    }

    /**
     * @description 删除部门（一般不可使用）
     * @function delete
     * @param  {type} children {description}
     * @return {type} 
     */
    async delete(children) {
        return this.ctx.model.Department.updateOne({
            departmentId: -1
        }, {
                children: children
            }).exec();
    }

    /**
     * @description 获取用户名
     * @function getUser
     * @param  {type} query {description}
     * @return {type} {description}
     */
    async getUser(query) {
        let userList   = [];
        let department = await this.ctx.model.Department.find();
        // 递归添加所有的用户列表
        const countAlluser = (department) => {
            for (let item of department) {
                userList = userList.concat(item.userList);
                if (item.children.length > 0) {
                    countAlluser(item.children);
                }
            }
        }
        // 按条件添加用户
        let   flag        = 0;
        const lookforUser = (department) => {
            for (let item of department) {
                for (let single of item.userList) {
                    if (single.userId == query.userId) {
                        if (new Set(query.roles).has('manager')) {
                            userList=userList.concat(item.userList);
                        } else {
                            userList.push(single);
                        }
                        flag++;
                        break;
                    }
                }
                if (flag > 0) {
                    if (item.children.length > 0) {
                        countAlluser(item.children);
                    }
                } else {
                    if (item.children.length > 0) {
                        lookforUser(item.children);
                    }
                }
            }
        }
        lookforUser(department);

        return userList;
    }

    /**
     * @description 删除部门中的用户
     * @function deleteUser
     * @param  {type} userId {description}
     * @return {type} {description}
     */
    async deleteUser(userId) {
        const {
            ctx
        } = this;
        let deparment = await ctx.service.department.find();
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

    /**
     * @description 变更部门用户-先删除，后增加
     * @function changeDepartmentUser
     * @param  {type} userId       {description}
     * @param  {type} name         {description}
     * @param  {type} departmentId {description}
     * @return {type} {description}
     */
    async changeDepartmentUser(userId, name, departmentId) {
        const {
            ctx
        } = this;
        let deparment    = await ctx.service.department.get();
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
        await deleteUser(deparment);
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
        await addUser(deparment);
        return this.ctx.model.Department.updateOne({
            departmentId: -1
        }, {
                children: deparment[0].children,
                userList: deparment[0].userList
            }).exec();
    }
}

module.exports = DepartmentService;