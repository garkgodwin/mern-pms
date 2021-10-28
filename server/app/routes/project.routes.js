module.exports = (app) => {
  //controller
  const projects = require("../controllers/project.controller.js");

  //router
  var router = require("express").Router();
  //routes

  router.get("/fetch-all", projects.fetchAllProjects);
  router.post("/create", projects.createProject);
  router.get("/project/:projectid", projects.fetchProjectById);
  router.patch("/update/:projectid", projects.updateProject);
  router.patch("/update-phase/:projectid", projects.updateProjectPhase);

  router.delete("/delete/:projectid", projects.deleteProject);

  router.get("/fetch-by-teamid/:teamid", projects.fetchProjectsByTeamId);

  router.get("/fetch-and-count/:teamid", projects.fetchAndCountTeamProject);
  app.use("/api/v1/projects", router);
};
