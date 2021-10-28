import API from "./instance";

import { getTokenFromLocal, setTokenToLocal } from "./helpers/local-variables";

const TASKS = "/tasks";

//?TASK CRUD
//*GET ALL TASKS OF TEAM
export const fetchAllTeamTasks = async (teamId) => {
  let result = {
    isSuccess: false,
    isFailure: false,
    isInvalid: false,
    isError: false,
    tokenIsInvalid: false,
    message: "",
    data: [],
  };
  const token = getTokenFromLocal();
  if (token !== "") {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await API.get(TASKS + `/team/${teamId}`, config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to fetch the tasks of this project.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Encountered an error while fetching tasks of this project.",
        };
      });
  } else {
    result = {
      ...result,
      tokenIsInvalid: true,
      message: "You are not logged in!",
    };
  }

  return result;
};

//*GET MEMBER tasks
export const fetchYourTasks = async (teamMemberId) => {
  let result = {
    isSuccess: false,
    isFailure: false,
    isInvalid: false,
    isError: false,
    tokenIsInvalid: false,
    message: "",
    data: [],
  };
  const token = getTokenFromLocal();
  if (token !== "") {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await API.get(TASKS + `/your-tasks/${teamMemberId}`, config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to fetch your tasks.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Encountered an error while fetching your tasks.",
        };
      });
  } else {
    result = {
      ...result,
      tokenIsInvalid: true,
      message: "You are not logged in!",
    };
  }

  return result;
};

//*GET
export const fetchAndCountTeamTask = async (teamId) => {
  let result = {
    isSuccess: false,
    isFailure: false,
    isInvalid: false,
    isError: false,
    tokenIsInvalid: false,
    message: "",
    data: {},
  };

  const token = getTokenFromLocal();
  if (token !== "") {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await API.get(TASKS + `/fetch-and-count/${teamId}`, config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to fetch the projects of this team.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message:
            "Encountered an error while fecthing the projects of this team.",
        };
      });
  } else {
    result = {
      ...result,
      tokenIsInvalid: true,
      message: "You are not logged in!",
    };
  }

  return result;
};

//*POST
export const createTask = async (data) => {
  let result = {
    isSuccess: false,
    isFailure: false,
    isInvalid: false,
    isError: false,
    tokenIsInvalid: false,
    message: "",
  };
  const token = getTokenFromLocal();

  if (token !== "") {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await API.post(TASKS + "/create", { data }, config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to create a task.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Encountered an error while creating a task.",
        };
      });
  } else {
    result = {
      ...result,
      tokenIsInvalid: true,
      message: "You are not logged in!",
    };
  }

  return result;
};

//*GET
export const fetchTaskById = async (taskId) => {
  let result = {
    isSuccess: false,
    isFailure: false,
    isInvalid: false,
    isError: false,
    tokenIsInvalid: false,
    message: "",
  };

  const token = getTokenFromLocal();

  if (token !== "") {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await API.get(TASKS + `/task/${taskId}`, config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to create a task.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Encountered an error while creating a task.",
        };
      });
  } else {
    result = {
      ...result,
      tokenIsInvalid: true,
      message: "You are not logged in!",
    };
  }

  return result;
};
//*PATCH
export const updateTask = async (taskId, data) => {
  let result = {
    isSuccess: false,
    isFailure: false,
    isInvalid: false,
    isError: false,
    tokenIsInvalid: false,
    message: "",
  };

  const token = getTokenFromLocal();

  if (token !== "") {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await API.patch(TASKS + `/update/${taskId}`, { data }, config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to update a task.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Encountered an error while updating a task.",
        };
      });
  } else {
    result = {
      ...result,
      tokenIsInvalid: true,
      message: "You are not logged in!",
    };
  }

  return result;
};
//*PATCH
export const changeStatus = async (taskId, data) => {
  let result = {
    isSuccess: false,
    isFailure: false,
    isInvalid: false,
    isError: false,
    tokenIsInvalid: false,
    message: "",
  };

  const token = getTokenFromLocal();

  if (token !== "") {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await API.patch(TASKS + `/update-status/${taskId}`, { data }, config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to update a status of a task.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Encountered an error while updating a status of a task.",
        };
      });
  } else {
    result = {
      ...result,
      tokenIsInvalid: true,
      message: "You are not logged in!",
    };
  }

  return result;
};
//*DELETE
export const deleteTask = async (taskId) => {
  let result = {
    isSuccess: false,
    isFailure: false,
    isInvalid: false,
    isError: false,
    tokenIsInvalid: false,
    message: "",
  };
  const token = getTokenFromLocal();

  if (token !== "") {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await API.delete(TASKS + `/delete/${taskId}`, config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to delete a task.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Encountered an error while deleting a task.",
        };
      });
  } else {
    result = {
      ...result,
      tokenIsInvalid: true,
      message: "You are not logged in!",
    };
  }

  return result;
};
