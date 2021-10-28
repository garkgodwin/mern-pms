const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

require("dotenv").config();

//?MIDDLEWARES
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//?SETUP DATABASE

const db = require("./app/models");
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to database");
    db.sequelize
      .sync({
        force: true, //change to true if limited error
        alter: true,
      })
      .then(() => {
        console.log("Altered some tables.");
        //! This will create the admin on server start
        const seed = require("./app/seed.js");
        const adminCreated = seed.createAdmin();
        //?THIS IS ONLY A TEST
        if (adminCreated) {
          console.log("Admin is created");
          seed.createDefaults();
        }
      })
      .catch((err) => {
        console.log("Some error occured while syncing database");
        console.log(err);
      });
  })
  .catch((err) => {
    if (err.parent.code === "ECONNREFUSED") {
      console.log("Error connecting to database");
    } else {
      console.log(err);
    }
  });

//?SETUP ROUTES
require("./app/routes/")(app);

app.listen(PORT, () => {
  console.log(`Server Listening on port: ${PORT}`);
});
