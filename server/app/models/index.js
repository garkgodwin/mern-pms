const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//!---------------TABLES HERE
//?----------------------------------------PROJECTS
db.accounts = require("./account.model.js")(sequelize, Sequelize);
db.teams = require("./team.model.js")(sequelize, Sequelize);
db.projects = require("./project.model.js")(sequelize, Sequelize); //?1 client
db.teamMembers = require("./team_member.model.js")(sequelize, Sequelize);
db.tasks = require("./task.model.js")(sequelize, Sequelize);

//?FOREIGN KEYS

//!TEAMMEMBERS AND TEAM TABLE
//?-----------------ADD TEAM ID AND ACCOUNT ID TO teamMembers
db.teams.hasMany(db.teamMembers);
db.teamMembers.belongsTo(db.teams, {
  foreignKey: "teamId",
});
db.accounts.hasOne(db.teamMembers);
db.teamMembers.belongsTo(db.accounts, {
  foreignKey: "accountId",
});
//!PROJECTS
//?-----------------PROJECTS-TEAMS-CLIENTS
//team for project
db.teams.hasMany(db.projects, {
  foreignKey: {
    notNull: false,
  },
});
db.projects.belongsTo(db.teams, {
  foreignKey: {
    notNull: false,
  },
});
//client
db.accounts.hasMany(db.projects, {
  foreignKey: {
    notNull: false,
  },
});
db.projects.belongsTo(db.accounts, {
  foreignKey: {
    notNull: false,
  },
});
//
//?-----------------PROJECTS-TASK
db.projects.hasMany(db.tasks, {
  foreignKey: {
    notNull: true,
  },
});
db.tasks.belongsTo(db.projects, {
  foreignKey: {
    notNull: true,
  },
});
db.teamMembers.hasMany(db.tasks, {
  foreignKey: {
    notNull: false,
  },
});
db.tasks.belongsTo(db.teamMembers, {
  foreignKey: {
    notNull: false,
  },
});
module.exports = db;
