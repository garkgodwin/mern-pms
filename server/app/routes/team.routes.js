module.exports = (app) => {
  //controller
  const teams = require("../controllers/team.controller.js");

  //router
  var router = require("express").Router();
  //routes

  //?teams crud
  router.get("/all", teams.fetchAllTeamsAndMembers);
  router.get("/team/:teamid", teams.fetchTeamById);
  router.post("/create", teams.createTeam);
  router.patch("/update/:teamid", teams.updateTeam);

  //?team-member crud
  router.post("/add/member/:teamid", teams.addMemberToTeam);
  router.get("/non-members", teams.getNonMemberAccounts);
  router.get("/members/:teamid", teams.fetchMembersByTeamId);
  router.delete("/delete/member/:memberid", teams.removeMemberFromTeam);

  //?fetch team by accountid means employee
  router.get("/your-team/:accountid", teams.fetchYourTeam);

  app.use("/api/v1/teams", router);
};
