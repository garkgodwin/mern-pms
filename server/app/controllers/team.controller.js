const { QueryTypes } = require("sequelize");
const db = require("../models");
const Team = db.teams;
const TeamMember = db.teamMembers;
const Account = db.accounts;
//?validate token
const authToken = require("../auth/");

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

const teamInputsValid = (data) => {
  let result = {
    isValid: false,
    message: "",
  };
  if (data) {
    const teamName = data.teamName;
    if (teamName === "") {
      result = {
        ...result,
        message: "Please do no leave the required fields emtpy.",
      };
    } else if (teamName.length < 3) {
      result = {
        ...result,
        message: "The minimum required length for the team name is 3.",
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

//!-----------------------------------TEAM CRUD
//?CRUD
//*GET
exports.fetchAllTeamsAndMembers = async (req, res) => {
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
    let teams = await Team.findAll({
      include: [
        {
          model: TeamMember,
          include: [
            {
              model: Account,
            },
          ],
        },
      ],
    });
    result = {
      ...result,
      isSuccess: true,
      message: "You have successfully fetched all the teams.",
      data: teams,
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
exports.fetchTeamById = async (req, res) => {
  let result = {
    isSuccess: false,
    isFailure: false,
    isInvalid: false,
    isError: false,
    tokenIsInvalid: false,
    message: "",
    data: {},
  };

  const tokenResult = await checkToken(req);
  const tokenIsValid = tokenResult.isValid;
  const tokenIsInvalid = tokenResult.isInvalid;
  const tokenIsError = tokenResult.isError;
  const tokenMessage = tokenResult.message;
  if (tokenIsValid) {
    const teamId = req.params.teamid;
    const team = await Team.findOne({
      where: { id: teamId },
      include: [
        {
          model: TeamMember,
          include: [
            {
              model: Account,
            },
          ],
        },
      ],
    });
    result = {
      ...result,
      isSuccess: true,
      message: "You have successfully fetch a team.",
      data: team,
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
//*POST
exports.createTeam = async (req, res) => {
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
    const data = req.body.data;
    const inputsValidity = teamInputsValid(data);
    if (inputsValidity.isValid) {
      const teamName = data.teamName;
      const description = data.description;
      await Team.create({
        teamName: teamName,
        description: description,
      })
        .then((response) => {
          if (response) {
            result = {
              ...result,
              isSuccess: true,
              message: "Successfully created a team.",
            };
          } else {
            result = {
              ...result,
              isFailure: true,
              message: "Failed to create a team.",
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
              message: "Failed to create a team.",
              data: error,
            };
          }
        });
    } else {
      result = {
        ...result,
        isInvalid: true,
        message: inputsValidity.message,
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
//*PATCH
exports.updateTeam = async (req, res) => {
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
    const data = req.body.data;
    const teamId = req.params.teamid;
    const inputsValidity = teamInputsValid(data);
    if (inputsValidity.isValid) {
      const teamName = data.teamName;
      const description = data.description;
      await Team.update(
        {
          teamName: teamName,
          description: description,
        },
        { where: { id: teamId } }
      )
        .then((response) => {
          if (response[0] === 1) {
            result = {
              ...result,
              isSuccess: true,
              message: "Successfully updated a team.",
            };
          } else {
            result = {
              ...result,
              isFailure: true,
              message: "Failed to update a team.",
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
              message: "Failed to update a team.",
              data: error,
            };
          }
        });
    } else {
      result = {
        ...result,
        isInvalid: true,
        message: inputsValidity.message,
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

//!-------------------------------------MEMBER CURD
//?POST
exports.addMemberToTeam = async (req, res) => {
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
    const teamId = req.params.teamid;
    const data = req.body.data;
    const accountId = data.accountId;
    const memberType = data.memberType;
    const account = await Account.findByPk(accountId);
    if (account) {
      if (account.type === 2) {
        const isMember = await TeamMember.findOne({
          where: { accountId: accountId },
        });
        if (!isMember) {
          await TeamMember.create({
            memberType: memberType,
            accountId: accountId,
            teamId: teamId,
          })
            .then((response) => {
              if (response) {
                result = {
                  ...result,
                  isSuccess: true,
                  message: "You have successfully added a member to a team.",
                };
              } else {
                result = {
                  ...result,
                  isFailure: true,
                  message: "You have failed to add a member to a team.",
                };
              }
            })
            .catch((error) => {
              result = {
                ...result,
                isError: true,
                message:
                  "Encountered an error while adding a member to a team.",
              };
            });
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "This employee is already a member of a team.",
          };
        }
      } else {
        result = {
          ...result,
          isInvalid: true,
          message: "Cannot add a non-employee to a team.",
        };
      }
    } else {
      result = {
        ...result,
        isFailure: true,
        message: "Failed to add a member to a team.",
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
//?GET
exports.getNonMemberAccounts = async (req, res) => {
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
    const accounts = await Account.findAll({
      include: {
        model: TeamMember,
        required: false,
      },
    });
    const data = accounts.filter((account) => {
      return account.team_member === null;
    });
    result = {
      ...result,
      isSuccess: true,
      message: "You have successfully fetch the non members.",
      data: data,
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
//?GET
exports.fetchMembersByTeamId = async (req, res) => {
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
    const teamId = req.params.teamid;
    const members = await TeamMember.findAll({
      where: { teamId: teamId },
      include: [
        {
          model: Account,
        },
      ],
    });
    if (members) {
      result = {
        ...result,
        isSuccess: true,
        message: "Successfully fetched the members for this team.",
        data: members,
      };
    } else {
      result = {
        ...result,
        isFailure: true,
        message: "Failed to fetch the members for this team.",
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

//?DELETE
//?DELETE
exports.removeMemberFromTeam = async (req, res) => {
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
    const memberId = req.params.memberid;
    const deletedResult = await TeamMember.destroy({
      where: { id: memberId },
      force: true,
    });
    if (deletedResult === 1) {
      result = {
        ...result,
        isSuccess: true,
        message: "You have successfully removed this member.",
      };
    } else {
      result = {
        ...result,
        isFailure: true,
        message: "Failed to remove this member.",
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

//!FETCH TEAM AND MEMBERS BY ACCOUNT ID SAVED IN TEAM MEMBERS
exports.fetchYourTeam = async (req, res) => {
  let result = {
    isSuccess: false,
    isFailure: false,
    isInvalid: false,
    isError: false,
    tokenIsInvalid: false,
    message: "",
    data: {},
  };

  const tokenResult = await checkToken(req);
  const tokenIsValid = tokenResult.isValid;
  const tokenIsInvalid = tokenResult.isInvalid;
  const tokenIsError = tokenResult.isError;
  const tokenMessage = tokenResult.message;
  if (tokenIsValid) {
    const accountId = req.params.accountid;
    const member = await TeamMember.findOne({
      where: { accountId: accountId },
    });
    if (member) {
      const teamId = member.teamId;
      const team = await Team.findOne({
        where: { id: teamId },
        include: [
          {
            model: TeamMember,
            include: [
              {
                model: Account,
              },
            ],
          },
        ],
      });
      if (team) {
        result = {
          ...result,
          isSuccess: true,
          message: "Successfull fetched the team and its members.",
          data: team,
        };
      } else {
        result = {
          ...result,
          isFailure: true,
          message: "Failed to fetch the team and its mebmers.",
        };
      }
    } else {
      result = {
        ...result,
        isInvalid: true,
        message: "You are not logged in!",
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
