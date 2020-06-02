const Controller = require("egg").Controller;

module.exports = class extends Controller{
  async login(){
    /*
    * 1、判断数据库用户名密码是否匹配
    * 2、写入数据至redis
    * 3、写入cookie
    * */
    const {ctx} = this;
    try{
      await (async ()=>{
        await ctx.service.auth.matchDB(ctx.request.body);
        const loginData = await ctx.service.auth.storeLoginData(ctx.request.body);
        return await ctx.service.auth.setLoginCookie(loginData);
      })();
      ctx.body = {
        code:"success",
        message:"登录成功！"
      }
    }catch(error){
      ctx.body = {
        code:"error",
        message:error
      }
    }
  }
}
