const { QueryTypes } = require("sequelize");
const db = require("../models");
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;
const Task = db.tasks;
const Team = db.teams;
const Project = db.projects;
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

//?TASK

//?GET PROJECT's TASKS
exports.fetchAllTeamTasks = async (req, res) => {
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
    const tasks = await Team.findOne({
      where: { id: teamId },
      include: [
        {
          model: Project,
          include: [
            {
              model: Task,
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
            },
          ],
        },
      ],
    });
    if (tasks) {
      result = {
        ...result,
        isSuccess: true,
        message: "Successfully fetched the tasks of this project.",
        data: tasks,
      };
    } else {
      result = {
        ...result,
        isFailure: true,
        message: "Failed to fetch the tasks of this project.",
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
//?GET TASKS BY MEMBER
exports.fetchYourTasks = async (req, res) => {
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
    const teamMemberId = req.params.teammemberid;
    const tasks = await Task.findAll({
      where: { teamMemberId: teamMemberId },
      include: Project,
    });
    if (tasks) {
      result = {
        ...result,
        isSuccess: true,
        message: "Successfully fetched the tasks of this project.",
        data: tasks,
      };
    } else {
      result = {
        ...result,
        isFailure: true,
        message: "Failed to fetch the tasks of this project.",
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
//?GET TASK BY TASK ID
exports.fetchTaskById = async (req, res) => {
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
    const taskId = req.params.taskid;
    const task = await Task.findOne({ where: { id: taskId } });
    if (task) {
      result = {
        ...result,
        isSuccess: true,
        message: "Sucecssfully fetched the task.",
        data: task,
      };
    } else {
      result = {
        ...result,
        isFailure: true,
        message: "Failed to fetch the task.",
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
//?GET TASK OF A TEAM
exports.fetchAndCountTeamTask = async (req, res) => {
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
    let done = 0;
    let held = 0;
    let delayed = 0;

    //?all
    await Task.findAndCountAll({
      include: {
        model: Project,
        where: {
          teamId: teamId,
        },
      },
    }).then((response) => {
      all = response.count;
    });

    //?done
    await Task.findAndCountAll({
      where: {
        isDone: true,
      },
      include: {
        model: Project,
        where: {
          teamId: teamId,
        },
      },
    }).then((response) => {
      done = response.count;
    });

    //?held
    await Task.findAndCountAll({
      where: {
        onHold: true,
      },
      include: {
        model: Project,
        where: {
          teamId: teamId,
        },
      },
    }).then((response) => {
      held = response.count;
    });

    //?delayed
    await Task.findAndCountAll({
      where: {
        endDate: {
          [Op.lte]: new Date(),
        },
      },
      inclide: {
        model: Project,
        where: {
          teamId: teamId,
        },
      },
    }).then((response) => {
      delayed = response.count;
    });

    result = {
      ...result,
      isSuccess: true,
      message: "Successfully counted the task for this team.",
      data: {
        all: all,
        held: held,
        done: done,
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
exports.createTask = async (req, res) => {
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
    const task = data.task;
    const description = data.description;
    const projectId = data.projectId;
    const teamMemberId = data.teamMemberId === 0 ? null : data.teamMemberId;
    const startDate = data.startDate;
    const endDate = data.endDate;
    const category = data.category;
    const projectExists = await Project.findOne({ where: { id: projectId } });

    if (projectExists) {
      await Task.create({
        projectId: projectId,
        teamMemberId: teamMemberId,
        task: task,
        description: description,
        startDate: startDate,
        endDate: endDate,
        category: category,
      })
        .then((response) => {
          if (response._options.isNewRecord) {
            result = {
              ...result,
              isSuccess: true,
              message: "Successfully created a task.",
            };
          } else {
            result = {
              ...result,
              isFailure: true,
              message: "Failed to create a task.",
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
                  ? "Invalid date of " + path
                  : "Unhandled valdation";
              message = message + "\n" + sub;
            }
            result = {
              ...result,
              isInvalid: true,
              message: message,
            };
            console.log(message);
          } else {
            result = {
              ...result,
              isError: true,
              message: "Encountered an error while creating a task.",
            };
          }
        });
    } else {
      result = {
        ...result,
        isInvalid: true,
        message: "Please select a project for this task.",
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

//?PATCH
exports.updateTask = async (req, res) => {
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
    const taskId = req.params.taskid;
    const task = data.task;
    const description = data.description;
    const projectId = data.projectId;
    const teamMemberId = data.teamMemberId;
    const startDate = data.startDate;
    const endDate = data.endDate;
    const category = data.category;
    await Task.update(
      {
        projectId: projectId,
        teamMemberId: teamMemberId,
        task: task,
        description: description,
        startDate: startDate,
        endDate: endDate,
        category: category,
      },
      { where: { id: taskId } }
    )
      .then((response) => {
        if (response[0] === 1) {
          result = {
            ...result,
            isSuccess: true,
            message: "Successfully updated a task.",
          };
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to update a task.",
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
                ? "Invalid date of " + path
                : "Unhandled valdation";
            message = message + "\n" + sub;
          }
          result = {
            ...result,
            isInvalid: true,
            message: message,
          };
          console.log(message);
        } else {
          result = {
            ...result,
            isError: true,
            message: "Encountered an error while updating a task.",
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
exports.changeStatus = async (req, res) => {
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
    const taskId = req.params.taskid;
    const isStarted = data.isStarted;
    const isDone = data.isDone;
    const onHold = data.onHold;

    await Task.update(
      {
        isStarted: isStarted,
        isDone: isDone,
        onHold: onHold,
      },
      { where: { id: taskId } }
    )
      .then((response) => {
        if (response[0] === 1) {
          result = {
            ...result,
            isSuccess: true,
            message: "Successfully updated a task.",
          };
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to update a task.",
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
            message: "Encountered an error while creating a task.",
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
exports.deleteTask = async (req, res) => {
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
    const taskId = req.params.taskid;
    await Task.destroy({ where: { id: taskId } })
      .then((response) => {
        if (response === 1) {
          result = {
            ...result,
            isSuccess: true,
            message: "Successfully deleted a task.",
          };
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to delete a task.",
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
            message: "Encountered an error while creating a task.",
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
