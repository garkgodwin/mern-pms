module.exports = (app) => {
  //controller
  const accounts = require("../controllers/account.controller.js");

  //router
  var router = require("express").Router();
  //routes
  //?OUTSIDE
  router.post("/login", accounts.loginToSystem);
  router.patch("/activate", accounts.activateAccount);

  //?INSIDE
  router.get("/loggedin", accounts.checkAndFetchLoggedIn);
  router.get("/fetch/:type", accounts.fetchAllAccountsByType);
  router.get("/fetch-all", accounts.fetchAllAccounts);
  router.get("/account/:id", accounts.fetchAccountById);
  router.post("/create", accounts.createAccount);
  router.patch("/update/:id", accounts.updateAccount);
  router.patch("/send/:id", accounts.sendOtp);

  app.use("/api/v1/accounts", router);
};
