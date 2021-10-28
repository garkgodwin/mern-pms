module.exports = (app) => {
  require("./account.routes.js")(app);
  require("./team.routes.js")(app);
  require("./project.routes.js")(app);
  require("./task.routes.js")(app);
};
