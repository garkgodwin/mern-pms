module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("tasks", {
    task: {
      type: Sequelize.STRING,
      validate: {
        len: [2, 100],
      },
    },
    description: {
      type: Sequelize.STRING,
    },
    isStarted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    onHold: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    isDone: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    startDate: {
      type: Sequelize.DATE,
      required: true,
      validate: {
        isDate: true,
      },
    },
    endDate: {
      type: Sequelize.DATE,
      required: true,
      validate: {
        isDate: true,
      },
    },
    category: {
      type: Sequelize.TINYINT(1),
      defaultValue: 1,
    },
  });
  return Task;
};
