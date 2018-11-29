'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
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
  router.get('/articles/count', controller.article.count);
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
};
