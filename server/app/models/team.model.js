module.exports = (sequelize, Sequelize) => {
  const Team = sequelize.define("teams", {
    teamName: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        len: [2, 51],
      },
    },
    description: {
      type: Sequelize.STRING,
    },
  });
  return Team;
};
