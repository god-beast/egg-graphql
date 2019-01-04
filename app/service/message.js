'use strict';
const Service = require('egg').Service;
const _ = require('lodash');
function GenNonDuplicateID(randomLength) {
    return Number(Math.random().toString().substr(3, randomLength) + Date.now()).toString(36)
}
class MessageService extends Service {

    async get(query) {
        let searchQuery = {
            taskUserId: query.userId
        }
        if (!query.userId) {
            delete searchQuery.taskUserId;
        }
        console.log(searchQuery);
        let list = await this.ctx.model.Message
            .find(searchQuery).sort('-createTime').exec();
        let total = await this.ctx.model.Message.find(searchQuery)
            .count();
        return { list, total }
    }

    async getTask(query) {
        let searchQuery = {
            taskName: query.taskName,
            author: query.author
        }
        let jump = (query.limit - 0) * (query.page - 1);
        if (!query.taskName) {
            delete searchQuery.taskName;
        }
        if (!query.author) {
            delete searchQuery.author;
        }
        let list = await this.ctx.model.Task.find(searchQuery).skip(jump).limit(query.limit - 0);
        let total = await this.ctx.model.Task.find(searchQuery).count();

        return { list, total }
    }

    async update(body) {
        
        let message = await this.ctx.model.Message.findOne({
            userId: body.userId,
            taskId: body.taskId
        })
        if (message.status == 0) {
            let questionList = (JSON.parse(body.content)).questionList;
            let taskObj = await this.ctx.model.Task.findOne({
                taskId: body.taskId
            })
            for (let item of taskObj.userList) {
                if (item.userId == body.userId) {
                    item.status = 1;
                    break;
                }
            }
            taskObj.questionList.forEach((item, index) => {
                // 单选情况
                if (item.type == 1) {
                    for (let option of item.optionList) {
                        if (option.questionOption == questionList[index].result) {
                            if (option.sum) {
                                option.sum += 1;
                            } else {
                                option.sum = 1;
                            }
                        }
                    }
                }
                // 多选
                if (item.type == 2) {
                    for (let option of item.optionList) {
                        for (let ite of questionList[index].result) {
                            if (option.questionOption == ite) {
                                if (option.sum) {
                                    option.sum += 1;
                                } else {
                                    option.sum = 1;
                                }
                            }
                        }
                    }
                }
                // 时间和简答
                if (item.type == 3 || item.type == 4) {
                    item.optionList.push(questionList[index].result);
                }
            });
            this.ctx.model.Task.updateOne({
                taskId: body.taskId,
            }, {
                    questionList: taskObj.questionList,
                    userList: taskObj.userList,
                }).exec();
            return await this.ctx.model.Message.updateOne({
                taskId: body.taskId,
                userId: body.userId
            }, {
                    status: body.status,
                    content: body.content,
                }).exec();
        } else {
            return await this.ctx.model.Message.updateOne({
                taskId: body.taskId,
                userId: body.userId
            }, {
                    status: body.status,
                }).exec();
        }

    }

    async delete(_id) {
        return await this.ctx.model.Message.deleteOne({
            _id
        }).exec();
    }

    async deleteTask(taskId) {
        console.log(taskId);
        return false;
        await this.ctx.model.Message.delete({
            taskId
        }).exec();
        return await this.ctx.model.Task.deleteOne({
            taskId
        }).exec();
    }

    async create(params) {
        let taskId = GenNonDuplicateID(20);
        this.ctx.model.Task.create({
            taskId,
            ...params
        }
        );
        let mesList = [];
        for (let item of params.userList) {
            mesList.push({
                ...params,
                taskId,
                taskUserId: item.userId,
                taskUserName: item.name,
            })
        }
        return await this.ctx.model.Message.insertMany(
            mesList
        );
    }
}

module.exports = MessageService;