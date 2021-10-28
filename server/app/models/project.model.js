module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define("projects", {
    title: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        len: [2, 100],
      },
    },
    description: {
      type: Sequelize.STRING,
    },
    startDate: {
      type: Sequelize.DATE,
      validate: {
        isDate: true,
      },
    },
    endDate: {
      type: Sequelize.DATE,
      validate: {
        isDate: true,
      },
    },
    initialized: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    planned: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    executed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    monitoredControlled: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    closed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });
  return Project;
};
