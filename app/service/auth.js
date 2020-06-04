const Service = require("egg").Service;

module.exports = class extends Service{
  /*
  * 查询数据库user表，判断用户名和密码是否匹配
  * */
  async matchDB({username,password}={}){
    try{
      const result = await this.ctx.app.mysql.get("user",{username,password});
      return result?Promise.resolve():Promise.reject("用户名或密码错误！");
    }catch (e) {
      return Promise.reject("用户名或密码错误！");
    }
  }
  /*
  * 将登录用户的状态写入redis，并设置7天失效时间
  * */
  async recordToRedis({username}){
    const storeData = JSON.stringify({
      username,
      loginTimestamp:new Date().valueOf(),
    });
    try{
      await this.ctx.app.redis.set(`login_${username}`,storeData,"px",7*24*3600*1000);
      return Promise.resolve(storeData);
    }catch (e) {
      return Promise.reject(e);
    }
  }
  /*
  * 将存储与redis的数据加密以后以uid为键写入cookie，并返回cookie
  * */
  async recordToCookie(storeData,remember){
    const {CryptoAES} = this.ctx.helper;
    const cookie = CryptoAES.Encrypt(storeData);
    try {
      this.ctx.cookies.set("uid",cookie,remember?{
        maxAge:7*24*3600*1000
      }:{});
      return Promise.resolve(cookie);
    }catch (e) {
      return Promise.reject(e);
    }
  }
  /*
  * 校验cookie是否合法，判断解密后的值与存储在redis中的值是否相匹配
  * */
  async checkCookieAvailable(){
    const {ctx} = this;
    const {CryptoAES} = ctx.helper;
    const cookie = ctx.cookies.get("uid");
    console.log(cookie);
    if(!cookie){
      return Promise.reject("请重新登录！");
    }
    const storeData = CryptoAES.Decrypt(cookie);
    let username;
    try{
      username = JSON.parse(storeData).username;
    }catch (e) {
      return Promise.reject("请重新登录！");
    }
    const result = await ctx.app.redis.get(`login_${username}`);
    return storeData === result?Promise.resolve(cookie):Promise.reject({
      statusCode:304,
      message:"请重新登录！"
    });
  }
}
