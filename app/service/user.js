const Service = require("egg").Service;
const descriptor = {
  username:[
    {type:"string",message:"用户名类型必须是字符串！"},
    {required:true,message:"请输入用户名！"},
    {max:30,message:"用户名不能超过30个字符！"}
  ],
  password:[
    {type:"string",message:"密码类型必须是字符串！"},
    {required:true,message:"请输入密码！"},
    {min:9,max:30,message:"密码长度必须在9-30个字符之间！"}
  ]
}

module.exports = class extends Service{
  /*
  * 请求参数校验，返回promise
  * */
  async checkReqData(value){
    return new Promise(async (resolve, reject)=>{
      const errors = await this.ctx.asyncValidate(descriptor,value).catch(({errors})=>errors);
      (errors && errors.length)?reject(errors[0].message):resolve();
    });
  }
  /*
  * 校验用户名是否重复
  * */
  async checkUsernameRepeat(username){
    return new Promise(async (resolve, reject)=>{
      const results = await this.ctx.app.mysql.get("user",{username});
      results?reject("用户名已存在！"):resolve();
    });
  }
  /*
  * 创建用户
  * */
  async createUserToDB(data){
    return new Promise(async (resolve, reject)=>{
      const result = await this.ctx.app.mysql.insert("user",{
        ...data,
        "create-time":new Date()
      }).catch(e=>e);
      (result instanceof Error)?reject(result.code):resolve();
    });
  }
}