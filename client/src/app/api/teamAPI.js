import API from "./instance";

import { getTokenFromLocal, setTokenToLocal } from "./helpers/local-variables";

const TEAMS = "/teams";

//!---------------------------------TEAM CRUD
//*GET
export const fetchAllTeams = async () => {
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
    await API.get(TEAMS + "/all", config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to fetch all the teams.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Encountered an error while fetching all the teams.",
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
export const fetchTeamById = async (teamId) => {
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
    await API.get(TEAMS + `/team/${teamId}`, config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to fetch a team.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Encountered an error while fetching a team.",
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
export const createTeam = async (data) => {
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
    await API.post(TEAMS + "/create", { data }, config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to create team.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Encountered an error while creating a team.",
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
export const updateTeam = async (teamId, data) => {
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
    await API.patch(TEAMS + `/update/${teamId}`, { data }, config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to update a team.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Encountered an error while updating a team.",
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

export const deleteTeam = async (teamId) => {
  let result = {
    isSuccess: false,
    isFailure: false,
    isInvalid: false,
    isError: false,
    tokenIsInvalid: false,
    message: "",
  };
  result = {
    ...result,
    isFailure: true,
    message: "Not yet implemented",
  };
  return result;
};

//!---------------------------------MEMBER CRUD
//*POST
export const addMemberToTeam = async (teamId, data) => {
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
    await API.post(TEAMS + `/add/member/${teamId}`, { data }, config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to add a member to a team.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Encountered an error while adding a member to a team.",
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
export const removeMemberFromTeam = async (memberId) => {
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
    await API.delete(TEAMS + `/delete/member/${memberId}`, config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to remove this member.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Encountered an error while removing this member.",
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
export const getNonMemberAccounts = async () => {
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
    await API.get(TEAMS + "/non-members", config).then((response) => {
      const data = response.data;
      if (data) {
        result = data;
      } else {
        result = {
          ...result,
          isFailure: true,
          message: "Failed to fetch the non member accounts.",
        };
      }
    });
  } else {
    result = {
      tokenIsInvalid: true,
      message: "You are not logged in!",
    };
  }

  return result;
};
export const fetchMembersByTeamId = async (teamId) => {
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
    await API.get(TEAMS + `/members/${teamId}`, config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to fetch the members of this team.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Encountered an error while fetching mebmers of this team.",
        };
      });
  } else {
    result = {
      tokenIsInvalid: true,
      message: "You are not logged in!",
    };
  }

  return result;
};

//!for employee
export const fetchYourTeam = async (employeeId) => {
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
    await API.get(TEAMS + `/your-team/${employeeId}`, config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to fetch the team and its members.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Encountered an error while  team and its members.",
        };
      });
  } else {
    result = {
      tokenIsInvalid: true,
      message: "You are not logged in!",
    };
  }

  return result;
};
