'use strict';

const Controller = require('egg').Controller;

class DepartmentController extends Controller {

    async get() {
        const {
            ctx
        } = this;
        let result = await ctx.service.department.get();
        ctx.body = {
            code: 200,
            data: result[0]
        }
    }

    async create() {
        const {
            ctx
        } = this;
        let result = await ctx.service.department.get();
        result = result[0];
        let {
            parentId,
            departmentName,
            introduction
        } = ctx.request.body;
        if (parentId != -1) {
            let  aim = result.children;
            const getDepartment=(aim)=>{
                for (let  item  of aim) {
                    if(item.departmentId==parentId){
                        item.children.push({
                            departmentId: item.departmentId + '' + item.children.length - 0,
                            departmentName: departmentName,
                            introduction: introduction,
                            children: [],
                            userList:[]
                        });
                        break;
                    }else{
                        if(item.children.length>0){
                            getDepartment(item.children);
                        }
                    } 
                }
            }
            getDepartment(aim);
        } else {
            result.children.push({
                departmentId: result.children.length,
                departmentName: departmentName,
                introduction: introduction,
                children: [],
            })
        }
        await ctx.service.department.create(result.children);
        ctx.body = {
            code: 200,
            data: []
        }
    }

    async edit() {
        const {
            ctx
        } = this;
        let result = await ctx.service.department.get();
        result = result[0];
        let {
            departmentId,
            departmentName,
            introduction
        } = ctx.request.body;
        if (departmentId != -1) {
            let indexArray = (departmentId + '').split('');
            let flag = 0,
                aim = result.children;
            while (indexArray[flag]) {
                aim = aim[indexArray[flag]];
                flag++;
            }
            aim.departmentName = departmentName;
            aim.introduction = introduction;
            await ctx.service.department.edit(0, result.children);
        } else {
            await ctx.service.department.edit(1, {
                departmentName,
                introduction
            });
        }
        ctx.body = {
            code: 200,
            data: result[0]
        }
    }

    async delete() {
        const {
            ctx
        } = this;
        let result = await ctx.service.department.get();
        let {
            departmentId,
        } = ctx.query;
        result = result[0];
        let indexArray = (departmentId + '').split('');
        let flag = 0,
            aim = result.children;

        while (aim[indexArray[flag]].children.length > 0) {
            aim = aim[indexArray[flag]].children;
            flag++;
        }
        aim.splice(indexArray[flag], 1);
        await ctx.service.department.delete(result.children);
        ctx.body = {
            code: 200,
            data: []
        }
    }

}

module.exports = DepartmentController;