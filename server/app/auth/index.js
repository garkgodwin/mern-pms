const jwt = require("jsonwebtoken");
const db = require("../models");
const Account = db.accounts;

const SECRET = process.env.SECRET_KEY;

exports.generate = (username, password, type) => {
  return jwt.sign(
    {
      username: username,
      password: password,
      type: type,
    },
    SECRET
  );
};

const decode = (token) => {
  return jwt.verify(token, SECRET);
};

exports.validateToken = async (token) => {
  let result = {
    isValid: false,
    isInvalid: false,
    isError: false,
    message: "",
    type: 0,
    username: "",
    password: "",
  };
  try {
    const decodedToken = decode(token);
    const username = decodedToken.username;
    const password = decodedToken.password;
    const type = decodedToken.type;
    const validAccount = await Account.findOne({
      where: { username: username, password: password },
    });
    if (validAccount) {
      result = {
        ...result,
        isValid: true,
        message: "Your credentials are valid",
        type: type,
        username: username,
        password: password,
      };
    } else {
      result = {
        ...result,
        isInvalid: true,
        message: "Your credentials are invalid.",
      };
    }
  } catch (error) {
    if (error.message.includes("invalid token")) {
      result = {
        ...result,
        isInvalid: true,
        message: "Your credentials are invalid.",
      };
    } else {
      result = {
        ...result,
        isError: true,
        message: error.message,
      };
    }
  }

  return result;
};
