module.exports = {
    schedule: {
      interval: '20m', // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
    },
    async task(ctx) {
        let endTime = new Date().getTime();
        let beginTime = endTime - 20 * 60 * 1000;
        let url = `http://47.99.126.185:8112/api/v1/statistical?endTime=${endTime}&beginTime=${beginTime}`
        const res = await ctx.curl(url, {
            dataType: 'json',
        });
        // 过滤待转换的ppt
        let pptList = res.data.data.filter((item) => {
            return item.taskStatus == 2;
        });
        let lastList=ctx.app.cache || [];
        if(lastList[0] & pptList[0]){
            if(lastList[0].id==lastList[0].id){
                ctx.app.email.sendEmail('任务队列卡顿', lastList[0].id, '1191992727@qq.com');
            }
             ctx.app.cache=pptList;
        }
        // 邮件发送成功
        // await ctx.app.email.sendEmail('test', 'testContent', '1191992727@qq.com');
    }
  };