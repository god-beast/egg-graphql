'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller,io } = app;
  router.get('/', controller.home.index);

  // form表单图片展示和上传接口
  router.get('/form', controller.form.show);
  router.post('/form', controller.form.upload);

  //登录相关接口
  router.post('/login', controller.user.login);
  router.post('/logout', controller.user.logout);
  router.get('/permission', controller.user.permission);

  //日报系统相关接口
  router.get('/articles', controller.article.find);
  router.get('/articles/date', controller.article.findDateList);
  router.post('/articles/userList', controller.article.userList);
  router.get('/articles/:_id', controller.article.findOne);
  router.post('/articles', controller.article.create);
  router.put('/articles/:_id', controller.article.update);
  router.delete('/articles/:_id', controller.article.destroy);

  // 用户管理和权限相关
  router.get('/department', controller.department.get);
  router.post('/department', controller.department.create);
  router.put('/department', controller.department.edit);
  router.delete('/department', controller.department.delete);

  router.get('/user', controller.user.get);
  router.post('/user', controller.user.create);
  router.put('/user', controller.user.edit);
  router.delete('/user', controller.user.delete);
  router.post('/disabledUser', controller.user.disabledUser);

  // 自测报告相关
  router.get('/report', controller.report.get);
  router.get('/oneReport', controller.report.getById);
  router.post('/report', controller.report.create);
  router.put('/report', controller.report.edit);

  // 项目管理相关
  router.get('/mettingList', controller.project.findMetting);
  router.post('/createMetting', controller.project.createMetting);

  router.get('/demandList', controller.project.findDemand);
  router.post('/createDemand', controller.project.createDemand);

  // 版本管理
  router.get('/project', controller.project.getProject);
  router.post('/project', controller.project.createProject);
  router.put('/project', controller.project.updateProject);
  router.delete('/project', controller.project.deleteProject);

  // 问卷相关
  router.get('/question', controller.question.get);
  router.post('/question', controller.question.create);
  router.put('/question', controller.question.update);
  router.delete('/question', controller.question.delete);

  // 任务相关
  router.get('/message', controller.message.get);
  router.post('/message', controller.message.create);
  router.put('/message', controller.message.update);
  router.delete('/message', controller.message.delete);

  router.get('/task', controller.message.getTask);
  router.delete('/task', controller.message.deleteTask);

  // webscoket
  io.of('/').route('datacount', io.controller.monitor.datacount);
};
