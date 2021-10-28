module.exports = (sequelize, Sequelize) => {
  const Account = sequelize.define("accounts", {
    type: {
      type: Sequelize.TINYINT(1), //? types - 1 is admin, 2 is employee(non-admin), 3 is  client
      required: true,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      required: true,
      unique: true,
      minLength: 5,
    },
    email: {
      type: Sequelize.STRING,
      required: true,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      minLength: 5,
    },
    firstName: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      require: true,
      allowNull: false,
    },
    sex: {
      type: Sequelize.TINYINT(1),
      defaultValue: 0,
    },
    title: {
      type: Sequelize.STRING,
    },
    specialization: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.TINYINT(1),
      defaultValue: 0,
    },
    activated: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      required: true,
    },
    otp: {
      type: Sequelize.STRING,
    },
    otpSent: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

  return Account;
};
