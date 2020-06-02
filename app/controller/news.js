const Controller = require("egg").Controller;

class NewsController extends Controller{
  async list(){
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    // const newsList = await ctx.service.home.list(page);
    await ctx.render("home/index.tpl", {list:[]});
  }
}

module.exports = NewsController;