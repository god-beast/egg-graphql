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

};
