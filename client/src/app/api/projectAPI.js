import API from "./instance";

import { getTokenFromLocal, setTokenToLocal } from "./helpers/local-variables";

const PROJECTS = "/projects";

//?PROJECT CRUD
//*GET
export const fetchProjects = async () => {
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
    await API.get(PROJECTS + "/fetch-all", config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to fetch the projects.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Encountered an error while fetching the projects.",
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
export const fetchProjectsByTeamId = async (teamId) => {
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
    await API.get(PROJECTS + `/fetch-by-teamid/${teamId}`, config)
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
//*GET
export const fetchAndCountTeamProject = async (teamId) => {
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
    await API.get(PROJECTS + `/fetch-and-count/${teamId}`, config)
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
//*GET
export const fetchProjectById = async (projectId) => {
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
    await API.get(PROJECTS + `/project/${projectId}`, config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to fetch the project.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Encountered an error fetching the project.",
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
export const createProject = async (data) => {
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
    data = {
      ...data,
      teamId: data.teamId === 0 ? null : data.teamId,
      accountId: data.accountId === 0 ? null : data.accountId,
    };

    await API.post(PROJECTS + "/create", { data }, config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to create a project.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Encountered an error while creating a project.",
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
export const updateProject = async (projectId, data) => {
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
    await API.patch(PROJECTS + `/update/${projectId}`, { data }, config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to update a project.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Encountered an error while updating a project.",
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
export const updateProjectPhase = async (projectId, data) => {
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
    await API.patch(PROJECTS + `/update-phase/${projectId}`, { data }, config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to update a project phases.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Encountered an error while updating a project phases.",
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
export const deleteProject = async (projectId) => {
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
    await API.delete(PROJECTS + `/delete/${projectId}`, config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
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
          message: "Encountered an error while deleting a project.",
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
