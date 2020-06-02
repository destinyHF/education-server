const Service = require("egg").Service;

module.exports = class extends Service{
  async matchDB({username,password}={}){
    return new Promise(async (resolve, reject)=>{
      const result = await this.ctx.app.mysql.get("user",{username,password});
      result?resolve():reject("用户名或密码错误！");
    });
  }
  async storeLoginData({username,password,remember}){
    return new Promise(async (resolve, reject)=>{
      const {moment} = this.ctx.helper;
      const loginData = JSON.stringify({
        username,
        loginTimestamp:new Date().valueOf(),
      });
      /*保存至redis，有效期为7天*/
      const result = await this.ctx.app.redis.set(`login_${username}`,loginData,"px",7*24*3600*1000);
      result?resolve(loginData,remember):reject("redis写入失败");
    });

  }
  async setLoginCookie(loginData,remember){
    const {CryptoAES} = this.ctx.helper;
    try {
      this.ctx.cookies.set("uid",CryptoAES.Encrypt(loginData),remember?{
        maxAge:7*24*3600*1000
      }:{});
    }catch (e) {
      return Promise.resolve(e);
    }
  }
}
