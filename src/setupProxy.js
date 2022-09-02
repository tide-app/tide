module.exports = function (app) {
  app.use(function (req, res, next) {
    res.setHeader("Document-Policy", "js-profiling");
    next();
  });
};
