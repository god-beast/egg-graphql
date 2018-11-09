'use strict';

const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
const pump = require('mz-modules/pump');
const md5 = require('md5');

class UploadFormController extends Controller {
  // 读取当前文件夹下的所有文件
  async show() {
    const ctx = this.ctx;
    let components = [];
    const files = fs.readdirSync('app/public/upload');
    files.forEach(item=>{
      components.push(`/upload/${item}`)
    });
    ctx.body = {
      code:200,
      data:{
        urlList: components
      }
    };
  }

  async upload() {
    const ctx = this.ctx;
    const stream = await this.ctx.getFileStream();
    const filename = md5(stream.filename) + path.extname(stream.filename).toLocaleLowerCase();
    const target = path.join(this.config.baseDir, 'app/public/upload', filename);
    const writeStream = fs.createWriteStream(target);
    await pump(stream, writeStream);
    ctx.body = {
      code:200,
      data:{
        url: '/upload/' + filename
      }
    };
  }
}

module.exports = UploadFormController;