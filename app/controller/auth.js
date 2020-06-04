const Controller = require("egg").Controller;

module.exports = class extends Controller{
  async autoLogin(){
    /*
    * 自动登录
    * */
    const {ctx} = this;
    try{
      const token = await ctx.service.auth.checkCookieAvailable();
      ctx.body = {
        code:"success",
        message:"登录成功！",
        token
      }
    }catch (e) {
      ctx.body = {
        code:"error",
        message:e
      }
    }
  }
  async login(){
    /* 登录
    * 1、判断数据库用户名密码是否匹配
    * 2、写入数据至redis
    * 3、写入cookie
    * */
    const {ctx} = this;
    try{
      const cookie = await (async ()=>{
        await ctx.service.auth.matchDB(ctx.request.body);
        const storeData = await ctx.service.auth.recordToRedis(ctx.request.body);
        return await ctx.service.auth.recordToCookie(storeData,ctx.request.body.remember);
      })();
      ctx.body = {
        code:"success",
        message:"登录成功！",
        token:cookie
      }
    }catch(error){
      ctx.body = {
        code:"error",
        message:error
      }
    }
  }
}
