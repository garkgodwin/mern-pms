module.exports = (sequelize, Sequelize) => {
  const TeamMember = sequelize.define("team_members", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    memberType: {
      type: Sequelize.TINYINT(1), //? manager - 1 | member -2
      required: true,
    },
  });
  return TeamMember;
};
