const Controller = require("egg").Controller;

module.exports = class extends Controller{
  async create(){
    const {ctx,app} = this;
    try{
      await (async ()=>{
        await ctx.service.user.checkReqData(ctx.request.body);
        await ctx.service.user.checkUsernameRepeat(ctx.request.body.username);
        return await ctx.service.user.createUserToDB(ctx.request.body);
      })();
      this.ctx.body = {
        code:"success",
        message:"注册成功！"
      }
    }catch(error){
      this.ctx.body = {
        code:"error",
        message:error
      }
    }
  }
}