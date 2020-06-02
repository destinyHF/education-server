
const Controller = require("egg").Controller;

class HomeController extends Controller{
  async index(){
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    // const newsList = await ctx.service.home.list(page);
    await ctx.render("home/index.tpl");
  }
}

module.exports = HomeController;