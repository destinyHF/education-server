exports.keys = "hfxxx1234567890";
exports.view = {
  defaultViewEngine:"nunjucks",
  mapping:{
    ".tpl":"nunjucks"
  }
}
exports.news = {
  pageSize:5,
  serverUrl:"https://hacker-news.firebaseio.com/v0"
}
exports.mysql = {
  client:{
    host:"127.0.0.1",
    port:"3306",
    user:"root",
    password:"root",
    database:"egg-test"
  },
  app:true,
  agent:false
}
exports.security = {
  csrf: false
};
exports.redis = {
  client:{
    port:6379,
    host:"127.0.0.1",
    password: "",
    db:0
  }
}