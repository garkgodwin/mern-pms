module.exports = (app) => {
  //controller
  const tasks = require("../controllers/task.controller.js");

  //router
  var router = require("express").Router();
  //routes
  router.get("/team/:teamid", tasks.fetchAllTeamTasks);
  router.get("/your-tasks/:teammemberid", tasks.fetchYourTasks);
  router.post("/create", tasks.createTask);
  router.patch("/update/:taskid", tasks.updateTask);
  router.patch("/update-status/:taskid", tasks.changeStatus);
  router.delete("/delete/:taskid", tasks.deleteTask);
  router.get("/task/:taskid", tasks.fetchTaskById);
  router.get("/fetch-and-count/:teamid", tasks.fetchAndCountTeamTask);

  app.use("/api/v1/tasks", router);
};
