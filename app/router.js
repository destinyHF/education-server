module.exports = app => {
  const {router,controller} = app;
  router.post("/user/create",controller.user.create);
  router.post("/auth/login",controller.auth.login);
  router.get("/",controller.home.index);
  router.get("/home",controller.news.list);
}
