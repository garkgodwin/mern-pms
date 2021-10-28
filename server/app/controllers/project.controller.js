const { QueryTypes } = require("sequelize");
const db = require("../models");
const Account = db.accounts;
const Project = db.projects;
const Task = db.tasks;
const Team = db.teams;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;
//ad more

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

//!-----------------------PROJECT CURD
//?GET
exports.fetchAllProjects = async (req, res) => {
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
    const projects = await Project.findAll({ include: [Account, Team] });
    result = {
      ...result,
      isSuccess: true,
      message: "You have successfully fetched all projects.",
      data: projects,
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
exports.fetchProjectById = async (req, res) => {
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
    const projectId = req.params.projectid;
    const project = await Project.findByPk(projectId);
    if (project) {
      result = {
        ...result,
        isSuccess: true,
        message: "Successfully fetched a project.",
        data: project,
      };
    } else {
      result = {
        ...result,
        isFailure: true,
        message: "Failed to fetch a project.",
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
exports.fetchProjectsByTeamId = async (req, res) => {
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
    const projects = await Project.findAll({
      where: { teamId: teamId },
      include: [
        {
          model: Account,
        },
        {
          model: Task,
        },
      ],
    });
    if (projects) {
      result = {
        ...result,
        isSuccess: true,
        message: "Successfully fetched the projects of this team.",
        data: projects,
      };
    } else {
      result = {
        ...result,
        isFailure: true,
        message: "Failed to fetch the projects of this team.",
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
exports.fetchAndCountTeamProject = async (req, res) => {
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
    let all = 0;
    let finished = 0;
    let delayed = 0;
    await Project.findAndCountAll({
      where: { teamId: teamId },
    }).then((response) => {
      all = response.count;
    });
    await Project.findAndCountAll({
      where: {
        teamId: teamId,
        initialized: true,
        planned: true,
        executed: true,
        monitoredControlled: true,
        closed: true,
      },
    }).then((response) => {
      finished = response.count;
    });
    await Project.findAndCountAll({
      where: {
        teamId: teamId,
        endDate: {
          [Op.lte]: new Date(),
        },
      },
    }).then((response) => {
      delayed = response.count;
    });
    result = {
      ...result,
      isSuccess: true,
      message: "Successfully counted the projects",
      data: {
        all: all,
        finished: finished,
        delayed: delayed,
      },
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

//?POST
exports.createProject = async (req, res) => {
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
    const title = data.title;
    const description = data.description;
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const clientId = data.accountId;
    const teamId = data.teamId;
    await Project.create({
      title: title,
      description: description,
      startDate: startDate,
      endDate: endDate,
      teamId: teamId,
      accountId: clientId,
    })
      .then((response) => {
        if (response._options.isNewRecord) {
          result = {
            ...result,
            isSuccess: true,
            message: "Successfully create a project.",
          };
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to create a project.",
          };
        }
      })
      .catch((error) => {
        const errors = error.errors;
        if (errors) {
          let message = "";
          for (let i = 0; i < errors.length; i++) {
            const validatorKey = errors[i].validatorKey;
            const path = errors[i].path;
            const sub =
              validatorKey === "len"
                ? "Invalid length of " + path
                : validatorKey === "isDate"
                ? "Invalid date at " + path
                : validatorKey === "not_unique"
                ? "This title is already in use."
                : "Unhandled valdation";
            message = message + "\n" + sub;
          }
          result = {
            ...result,
            isInvalid: true,
            message: message,
          };
        } else {
          result = {
            ...result,
            isError: true,
            message: "Failed to create an project.",
            data: error,
          };
        }
      });
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
//?PATCH
exports.updateProject = async (req, res) => {
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
    const projectId = req.params.projectid;
    const data = req.body.data;
    const title = data.title;
    const description = data.description;
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const clientId = data.accountId;
    const teamId = data.teamId;
    await Project.update(
      {
        title: title,
        description: description,
        startDate: startDate,
        endDate: endDate,
        accountId: clientId,
        teamId: teamId,
      },
      {
        where: { id: projectId },
      }
    )
      .then((response) => {
        if (response[0] === 1) {
          result = {
            ...result,
            isSuccess: true,
            message: "Successfully updated a project.",
          };
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to update a project.",
          };
        }
      })
      .catch((error) => {
        const errors = error.errors;
        if (errors) {
          let message = "";
          for (let i = 0; i < errors.length; i++) {
            const validatorKey = errors[i].validatorKey;
            const path = errors[i].path;
            const sub =
              validatorKey === "len"
                ? "Invalid length of " + path
                : validatorKey === "isDate"
                ? "Invalid date at " + path
                : validatorKey === "not_unique"
                ? "This title is already in use."
                : "Unhandled valdation";
            message = message + "\n" + sub;
          }
          result = {
            ...result,
            isInvalid: true,
            message: message,
          };
        } else {
          result = {
            ...result,
            isError: true,
            message: "Failed to create an project.",
            data: error,
          };
        }
      });
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
//?PATCH
exports.updateProjectPhase = async (req, res) => {
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
    const projectId = req.params.projectid;
    const data = req.body.data;
    const initial = data.initial;
    const plan = data.plan;
    const execute = data.execute;
    const monitor = data.monitor;
    const close = data.close;
    await Project.update(
      {
        initialized: initial,
        planned: plan,
        executed: execute,
        monitoredControlled: monitor,
        closed: close,
      },
      {
        where: { id: projectId },
      }
    )
      .then((response) => {
        if (response[0] === 1) {
          result = {
            ...result,
            isSuccess: true,
            message: "Successfully updated a project phase.",
          };
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to update a project phase.",
          };
        }
      })
      .catch((error) => {
        const errors = error.errors;
        if (errors) {
          let message = "";
          for (let i = 0; i < errors.length; i++) {
            const validatorKey = errors[i].validatorKey;
            const path = errors[i].path;
            const sub =
              validatorKey === "len"
                ? "Invalid length of " + path
                : validatorKey === "isDate"
                ? "Invalid date at " + path
                : validatorKey === "not_unique"
                ? "This title is already in use."
                : "Unhandled valdation";
            message = message + "\n" + sub;
          }
          result = {
            ...result,
            isInvalid: true,
            message: message,
          };
        } else {
          result = {
            ...result,
            isError: true,
            message: "Failed to create an project.",
            data: error,
          };
        }
      });
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
exports.deleteProject = async (req, res) => {
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
    const projectId = req.params.projectid;
    await Project.destroy({ where: { id: projectId } })
      .then((response) => {
        if (response === 1) {
          result = {
            ...result,
            isSuccess: true,
            message: "Successfully deleted a project.",
          };
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to delete a project.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Failed to delete an project.",
          data: error,
        };
      });
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
