module.exports = app =>{
  app.once("server",server=>{
    console.info("server is running");
  });
  app.on("error",(error,ctx)=>{
    console.info(error);
  });
  app.on("request",ctx=>{
    console.info(`request happened:${ctx.request.url}`);
  });
  app.on("response",ctx=>{
    console.info("response happened");
  });
}
