module.exports = app => {
  const {router,controller} = app;
  router.post("/auth/autoLogin",controller.auth.autoLogin);
  router.post("/auth/login",controller.auth.login);
  router.post("/user/create",controller.user.create);
  router.get("/",controller.home.index);
  router.get("/home",controller.news.list);
}
