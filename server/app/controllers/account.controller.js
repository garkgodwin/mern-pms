const { QueryTypes } = require("sequelize");
const db = require("../models");
const Account = db.accounts;

//?generate otpp
const otpGenerator = require("otp-generator");

//?validate token
const authToken = require("../auth/");

exports.loginToSystem = async (req, res) => {
  let result = {
    isSuccess: false,
    isFailure: false,
    isInvalid: false,
    isError: false,
    message: "",
    token: "",
  };
  const data = req.body.data;
  const username = data.username;
  const password = data.password;
  if (username !== "" && password !== "") {
    const account = await Account.findOne({ where: { username: username } });
    if (account.activated) {
      const userAndPassword = await Account.findOne({
        where: { username: username, password: password },
      });
      if (userAndPassword) {
        const type = account.type;
        const token = authToken.generate(username, password, type);
        result = {
          ...result,
          isSuccess: true,
          message: "Your credentials are valid!",
          token: token,
        };
      } else {
        result = {
          ...result,
          isInvalid: true,
          message: "Your credentials are invalid.",
        };
      }
    } else {
      result = {
        ...result,
        isInvalid: true,
        message: "This account is not yet activated.",
      };
    }
  } else {
    result = {
      ...result,
      isInvalid: true,
      message: "Please make sure you have completed the given fields.",
    };
  }

  res.send(result);
};

const activateInputsValid = (data) => {
  if (!data) {
    return false;
  }
  const username = data.username;
  const password = data.password;
  const otp = data.otp;
  if (otp === "" && username === "" && password === "") {
    return false;
  }
  if (otp.length !== 6) {
    return false;
  }
  if (username.length < 5) {
    return false;
  }
  if (password.length < 5) {
    return false;
  }
  return true;
};
exports.activateAccount = async (req, res) => {
  let result = {
    isSuccess: false,
    isFailure: false,
    isInvalid: false,
    isError: false,
    message: "",
  };
  //? no token needed since this is before login
  const data = req.body.data;
  if (activateInputsValid(data)) {
    const username = data.username;
    const password = data.password;
    const otp = data.otp;
    const usernameExists = await Account.findOne({
      where: { username: username },
    });
    if (usernameExists) {
      const notActivated = await Account.findOne({
        where: { username: username, activated: false },
      });
      if (notActivated) {
        const otpValid = await Account.findOne({
          where: { username: username, activated: false, otp: otp },
        });
        if (otpValid) {
          //?update
          await Account.update(
            { otpSent: false, otp: "", activated: true, password: password },
            { where: { username: username } }
          )
            .then((response) => {
              if (response[0]) {
                result = {
                  ...result,
                  isSuccess: true,
                  message: "Successfully activated this account.",
                };
              } else {
                result = {
                  ...result,
                  isFailure: true,
                  message: "Failed to activate this account.",
                };
              }
            })
            .catch((error) => {
              result = {
                ...result,
                isError: true,
                message: "Encountered an error while activating this account.",
              };
            });
        } else {
          result = {
            ...result,
            isInvalid: true,
            message:
              "Your one-time password is invalid or your admin did not send one.\nPlease confirm it to your admin.",
          };
        }
      } else {
        result = {
          ...result,
          isInvalid: true,
          message: "This account was already activated.",
        };
      }
    } else {
      result = {
        ...result,
        isInvalid: true,
        message: "This username does not exist.",
      };
    }
  } else {
    result = {
      ...result,
      isInvalid: true,
      message: "Please complete the given fields.",
    };
  }
  res.send(result);
};

const checkToken = async (req) => {
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
    const authorization = req.headers.authorization;
    const token = authorization.substring(7);
    const tokenResult = await authToken.validateToken(token);
    if (tokenResult.isValid) {
      const type = tokenResult.type;
      const username = tokenResult.username;
      const password = tokenResult.password;
      result = {
        ...result,
        isValid: true,
        message: tokenResult.message,
        type: type,
        username: username,
        password: password,
      };
    } else if (tokenResult.isInvalid) {
      result = {
        ...result,
        isInvalid: true,
        message: tokenResult.message,
      };
    } else {
      result = {
        ...result,
        isError: true,
        message: tokenResult.message,
      };
    }
  } catch (error) {
    result = {
      ...result,
      isError: true,
      message: "Encountered an error while checking credentials.",
    };
  }
  return result;
};
//!----------COMMON ACCESS
exports.checkAndFetchLoggedIn = async (req, res) => {
  let result = {
    isSuccess: false,
    isFailure: false,
    isInvalid: false,
    isError: false,
    tokenIsInvalid: false,
    message: "",
    data: null,
  };
  const tokenResult = await checkToken(req);
  const username = tokenResult.username;
  const password = tokenResult.password;
  const tokenIsValid = tokenResult.isValid;
  const tokenIsInvalid = tokenResult.isInvalid;
  const tokenIsError = tokenResult.isError;
  const tokenMessage = tokenResult.message;
  if (tokenIsValid) {
    const account = await Account.findOne({
      where: { username: username, password: password },
    });
    if (account) {
      result = {
        ...result,
        isSuccess: true,
        message: "You are still logged in!",
        data: account,
      };
    } else {
      result = {
        ...result,
        isInvalid: true,
        message: "How the f*** did you come to this code block?",
      };
    }
  } else if (tokenIsError) {
    result = {
      ...result,
      isError: true,
      message: tokenMessage,
    };
  } else if (tokenIsInvalid) {
    result = {
      ...result,
      tokenIsInvalid: true,
      message: tokenMessage,
    };
  }

  res.send(result);
};

const accountInputsValid = (data, accountId = 0) => {
  let result = {
    isValid: false,
    message: "",
  };

  if (data) {
    const firstName = data.firstName;
    const lastName = data.lastName;
    const username = data.username;
    const email = data.email;
    const type = data.type;
    if (type === 1 && accountId === 0) {
      result = {
        ...result,
        message: "Cannot duplicate an administrator!",
      };
    } else if (
      firstName === "" &&
      lastName === "" &&
      username === "" &&
      email === ""
    ) {
      result = {
        ...result,
        message: "Please do not leave the required fields empty.",
      };
    } else if (username.length < 5) {
      result = {
        ...result,
        message: "The minimum required length for username is 5.",
      }; //TODO: implement more here for email, firstname lastname etc..
    } else if (type === 0) {
      result = {
        ...result,
        message: "Please select a type for this account.",
      };
    } else {
      result = {
        ...result,
        isValid: true,
        message: "Your input details are valid.",
      };
    }
  } else {
    result = {
      ...result,
      message: "You have not entered anything...",
    };
  }
  return result;
};
//!----------ADMIN ACCESS
//*CRUD
exports.fetchAllAccountsByType = async (req, res) => {
  let result = {
    isSuccess: false,
    isFailure: false,
    isInvalid: false,
    isError: false,
    tokenIsInvalid: false,
    message: "",
    data: [],
  };
  const tokenResult = await checkToken(req);
  const tokenIsValid = tokenResult.isValid;
  const tokenIsInvalid = tokenResult.isInvalid;
  const tokenIsError = tokenResult.isError;
  const tokenMessage = tokenResult.message;
  if (tokenIsValid) {
    const type = req.params.type || 0;
    let accounts = await Account.findAll({ where: { type: type } });
    result = {
      ...result,
      isSuccess: true,
      message: "You have successfully fetched all the accounts.",
      data: accounts,
    };
  } else if (tokenIsError) {
    result = {
      ...result,
      isError: true,
      message: tokenMessage,
    };
  } else if (tokenIsInvalid) {
    result = {
      ...result,
      tokenIsInvalid: true,
      message: tokenMessage,
    };
  }
  res.send(result);
};
exports.fetchAllAccounts = async (req, res) => {
  let result = {
    isSuccess: false,
    isFailure: false,
    isInvalid: false,
    isError: false,
    tokenIsInvalid: false,
    message: "",
    data: [],
  };
  const tokenResult = await checkToken(req);
  const tokenIsValid = tokenResult.isValid;
  const tokenIsInvalid = tokenResult.isInvalid;
  const tokenIsError = tokenResult.isError;
  const tokenMessage = tokenResult.message;
  if (tokenIsValid) {
    let accounts = await Account.findAll();
    result = {
      ...result,
      isSuccess: true,
      message: "You have successfully fetched all the accounts.",
      data: accounts,
    };
  } else if (tokenIsError) {
    result = {
      ...result,
      isError: true,
      message: tokenMessage,
    };
  } else if (tokenIsInvalid) {
    result = {
      ...result,
      tokenIsInvalid: true,
      message: tokenMessage,
    };
  }
  res.send(result);
};
exports.fetchAccountById = async (req, res) => {
  let result = {
    isSuccess: false,
    isFailure: false,
    isInvalid: false,
    isError: false,
    tokenIsInvalid: false,
    message: "",
    data: null,
  };
  const tokenResult = await checkToken(req);
  const tokenIsValid = tokenResult.isValid;
  const tokenIsInvalid = tokenResult.isInvalid;
  const tokenIsError = tokenResult.isError;
  const tokenMessage = tokenResult.message;
  if (tokenIsValid) {
    const accountId = req.params.id;
    const account = await Account.findOne({ where: { id: accountId } });
    if (account) {
      result = {
        ...result,
        isSuccess: true,
        message: "Successfully fetched an account.",
        data: account,
      };
    } else {
      result = {
        ...result,
        isFailure: true,
        message: "Failed to fetch an account.",
      };
    }
  } else if (tokenIsError) {
    result = {
      ...result,
      isError: true,
      message: tokenMessage,
    };
  } else if (tokenIsInvalid) {
    result = {
      ...result,
      tokenIsInvalid: true,
      message: tokenMessage,
    };
  }
  res.send(result);
};
exports.createAccount = async (req, res) => {
  let result = {
    isSuccess: false,
    isFailure: false,
    isInvalid: false,
    isError: false,
    tokenIsInvalid: false,
    message: "",
  };
  const tokenResult = await checkToken(req);
  const tokenIsValid = tokenResult.isValid;
  const tokenIsInvalid = tokenResult.isInvalid;
  const tokenIsError = tokenResult.isError;
  const tokenMessage = tokenResult.message;
  if (tokenIsValid) {
    const inputsValidity = accountInputsValid(req.body.data);
    if (!inputsValidity.isValid) {
      result = {
        ...result,
        isInvalid: true,
        message: inputsValidity.message,
      };
    } else {
      const data = req.body.data;
      const type = data.type;
      const username = data.username;
      const email = data.email;
      const firstName = data.firstName;
      const lastName = data.lastName;
      const sex = data.sex;
      const title = data.title;
      const specialization = data.specialization;
      await Account.create({
        type,
        username,
        email,
        firstName,
        lastName,
        sex,
        title,
        specialization,
      })
        .then((response) => {
          if (response._options.isNewRecord) {
            result = {
              ...result,
              isSuccess: true,
              message: "Successfully created an account.",
            };
          } else {
            result = {
              ...result,
              isFailure: true,
              message: "Failed to create an account.",
            };
          }
        })
        .catch((error) => {
          const name = error.name;
          if (name) {
            if (name === "SequelizeValidationError") {
              result = {
                ...result,
                isInvalid: true,
                message: "Required fields must not be empty.",
              };
            } else if (name === "SequelizeUniqueConstraintError") {
              const errors = error.errors[0];
              const path = errors.path;
              const value = errors.value;
              result = {
                ...result,
                isInvalid: true,
                message: `The ${path}: ${value} was already used.`,
              };
            } else {
              result = {
                ...result,
                data: error,
              };
            }
          } else {
            result = {
              ...result,
              isError: true,
              message: "Failed to create an account.",
              data: error,
            };
          }
        });
    }
  } else if (tokenIsError) {
    result = {
      ...result,
      isError: true,
      message: tokenMessage,
    };
  } else if (tokenIsInvalid) {
    result = {
      ...result,
      tokenIsInvalid: true,
      message: tokenMessage,
    };
  }

  res.send(result);
};
exports.updateAccount = async (req, res) => {
  let result = {
    isSuccess: false,
    isFailure: false,
    isInvalid: false,
    isError: false,
    tokenIsInvalid: false,
    message: "",
  };
  const tokenResult = await checkToken(req);
  const tokenIsValid = tokenResult.isValid;
  const tokenIsInvalid = tokenResult.isInvalid;
  const tokenIsError = tokenResult.isError;
  const tokenMessage = tokenResult.message;
  if (tokenIsValid) {
    const accountId = req.params.id;
    const inputsValidity = accountInputsValid(req.body.data, accountId);
    if (!inputsValidity.isValid) {
      result = {
        ...result,
        isInvalid: true,
        message: inputsValidity.message,
      };
    } else {
      const data = req.body.data;
      const type = data.type;
      const username = data.username;
      const email = data.email;
      const firstName = data.firstName;
      const lastName = data.lastName;
      const sex = data.sex;
      const title = data.title;
      const specialization = data.specialization;
      await Account.update(
        {
          type,
          username,
          email,
          firstName,
          lastName,
          sex,
          title,
          specialization,
        },
        { where: { id: accountId } }
      )
        .then((response) => {
          if (response[0] === 1) {
            result = {
              ...result,
              isSuccess: true,
              message: "Successfully updated an account.",
              data: response,
            };
          } else {
            result = {
              ...result,
              isFailure: true,
              message: "Failed to update an account",
            };
          }
        })
        .catch((error) => {
          const name = error.name;
          if (name) {
            if (name === "SequelizeValidationError") {
              result = {
                ...result,
                isInvalid: true,
                message: "Required fields must not be empty.",
              };
            } else if (name === "SequelizeUniqueConstraintError") {
              const errors = error.errors[0];
              const path = errors.path;
              const value = errors.value;
              console.log(errors);
              result = {
                ...result,
                isInvalid: true,
                message: `The ${path}: ${value} was already used.`,
              };
            } else {
              result = {
                ...result,
                data: error,
              };
            }
          } else {
            result = {
              ...result,
              isError: true,
              message: "Failed to update an account.",
              data: error,
            };
          }
        });
    }
  } else if (tokenIsError) {
    result = {
      ...result,
      isError: true,
      message: tokenMessage,
    };
  } else if (tokenIsInvalid) {
    result = {
      ...result,
      tokenIsInvalid: true,
      message: tokenMessage,
    };
  }

  res.send(result);
};
//*Extras
const nodemailer = require("nodemailer");
const generateOtp = async () => {
  result = {
    isSuccess: false,
    isError: false,
    otp: "",
  };
  try {
    const otp = await otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
    });
    result = {
      ...result,
      isSuccess: true,
      otp: otp,
    };
  } catch (error) {
    result = {
      ...result,
      isError: false,
    };
  }
  return result;
};
const sendMail = async (email, otp, username) => {
  let result = {
    isSent: false,
    isError: false,
    isFailure: false,
    isInvalid: false,
    message: "",
  };
  try {
    const service = process.env.SERVICE;
    const user = process.env.COMPANY_EMAIL;
    const pass = process.env.EMAIL_PASSWORD;
    const transporter = nodemailer.createTransport({
      service: service,
      host: "host",
      port: 25,
      secure: false,
      auth: {
        user: user,
        pass: pass,
      },
      tls: { rejectUnauthorized: false },
    });
    const mailOptions = {
      from: user,
      to: email,
      subject: "GG Project Management System",
      html: `<div>
                  <h1>Welcome to your company's project management system.</h1>
                  <div>
                      <h3>Your OTP: ${otp} </h3>
                      <h3>Your Username: ${username}</h3>
                  </div>
              </div>`,
    };

    const info = await transporter.sendMail(mailOptions);

    if (info) {
      result = {
        ...result,
        isSent: true,
        message: info,
      };
    } else {
      result = {
        ...result,
        isFailure: true,
        message: "Failed to send OTP.",
      };
    }
  } catch (err) {
    result = {
      ...result,
      isError: true,
      message: "Encountered an error while sending email:\n" + err.message,
    };
  }
  return result;
};
exports.sendOtp = async (req, res) => {
  let result = {
    isSuccess: false,
    isFailure: false,
    isInvalid: false,
    isError: false,
    tokenIsInvalid: false,
    message: "",
  };
  const tokenResult = await checkToken(req);
  const tokenIsValid = tokenResult.isValid;
  const tokenIsInvalid = tokenResult.isInvalid;
  const tokenIsError = tokenResult.isError;
  const tokenMessage = tokenResult.message;
  if (tokenIsValid) {
    const id = req.params.id;
    const otpResult = await generateOtp();
    if (otpResult.isSuccess) {
      const otp = otpResult.otp;
      const accountUpdated = await Account.update(
        { otp: otp, sent: false },
        { where: { id: id } }
      );
      if (accountUpdated[0] === 1) {
        const account = await Account.findOne({ where: { id: id } });
        const email = account.email;
        const username = account.username;
        const sendMailResult = await sendMail(email, otp, username);
        if (sendMailResult.isSent) {
          const updateSent = await Account.update(
            { otpSent: true },
            { where: { id: id } }
          );
          if (updateSent[0] === 1) {
            result = {
              ...result,
              isSuccess: true,
              message: "Successfully sent credentials to their email.",
            };
          } else {
            result = {
              ...result,
              isSuccess: true,
              message: "Successfully sent credentials to their email.",
            };
          }
        } else if (sendMailResult.isFailure) {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to send an credentials to their email.",
          };
        } else {
          result = {
            ...result,
            isError: true,
            message: "Encountered an error while sending an email.",
          };
        }
      } else {
        result = {
          ...result,
          isFailure: true,
          message: "Failed to send credentials to their email.",
        };
      }
    } else {
      result = {
        ...result,
        isError: true,
        message: "Encountered an error while generating a one time password.",
      };
    }
  } else if (tokenIsError) {
    result = {
      ...result,
      isError: true,
      message: tokenMessage,
    };
  } else if (tokenIsInvalid) {
    result = {
      ...result,
      tokenIsInvalid: true,
      message: tokenMessage,
    };
  }
  res.send(result);
};
