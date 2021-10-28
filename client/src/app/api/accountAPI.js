import API from "./instance";

import { getTokenFromLocal, setTokenToLocal } from "./helpers/local-variables";

const ACCOUNTS = "/accounts";

//?OUTSIDE
//*POST
export const loginToSystem = async (data) => {
  let result = {
    isSuccess: false,
    isFailure: false,
    isInvalid: false,
    isError: false,
    message: "",
    token: "",
  };
  await API.post(ACCOUNTS + "/login", { data })
    .then((response) => {
      const data = response.data;
      if (data) {
        result = data;
        setTokenToLocal(data.token);
      } else {
        result = {
          ...result,
          isFailure: true,
          message: "Failed to login!",
        };
      }
    })
    .catch((error) => {
      result = {
        ...result,
        isError: true,
        message: "Encountered an error while logging in!",
      };
    });
  return result;
};
//*PATCH
export const activateAccount = async (data) => {
  let result = {
    isSuccess: false,
    isFailure: false,
    isInvalid: false,
    isError: false,
    message: "",
  };
  const password = data.password;
  const confirmPassword = data.confirmPassword;
  if (password === confirmPassword) {
    await API.patch(ACCOUNTS + "/activate", { data }).then((response) => {
      const data = response.data;
      if (data) {
        result = data;
      } else {
        result = {
          ...result,
          isFailure: true,
          message: "Failed to activate this account!",
        };
      }
    });
  } else {
    result = {
      ...result,
      isInvalid: true,
      message: "Your passwords does not match...",
    };
  }
  return result;
};

//?------INSIDE
//*GET
export const checkAndFetchLoggedIn = async () => {
  let result = {
    isSuccess: false,
    isFailure: false,
    isInvalid: false,
    isError: false,
    tokenIsInvalid: false,
    message: "",
    data: null,
  };
  const token = getTokenFromLocal();
  if (token !== "") {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await API.get(ACCOUNTS + "/loggedin", config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to fetch your details...",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Encountered an error while fetching your details",
        };
      });
  } else {
    result = {
      ...result,
      tokenIsInvalid: true,
      message: "Welcome to the project management system!",
    };
  }
  return result;
};
export const fetchAllAccountsByType = async (type) => {
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
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await API.get(ACCOUNTS + `/fetch/${type}`, config)
    .then((response) => {
      const data = response.data;
      if (data) {
        result = data;
      } else {
        result = {
          ...result,
          isFailure: true,
          message: "Failed to fetch the accounts.",
        };
      }
    })
    .catch((error) => {
      result = {
        ...result,
        isError: true,
        message: "Encountered an error while fetching the accounts.",
      };
    });

  return result;
};
export const fetchAllAccounts = async () => {
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
    await API.get(ACCOUNTS + "/fetch-all", config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to fetch the accounts.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Encountered an error while fetching the accounts.",
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
export const fetchAccountById = async (accountId) => {
  let result = {
    isSuccess: false,
    isFailure: false,
    isInvalid: false,
    isError: false,
    tokenIsInvalid: false,
    message: "",
    data: null,
  };
  const token = getTokenFromLocal();
  if (token !== "") {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await API.get(ACCOUNTS + `/account/${accountId}`, config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to fetch an account.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Encountered an error while fetching an account.",
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
export const createAccount = async (data) => {
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

    await API.post(ACCOUNTS + "/create", { data }, config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to create an account.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Encountered an error while create an account.",
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
export const updateAccount = async (accountId, data) => {
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
    await API.patch(ACCOUNTS + `/update/${accountId}`, { data }, config)
      .then((response) => {
        const data = response.data;
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to update an account.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message: "Encountered an error while updating an account.",
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
export const sendOtp = async (accountId) => {
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
    await API.patch(ACCOUNTS + `/send/${accountId}`, null, config)
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data) {
          result = data;
        } else {
          result = {
            ...result,
            isFailure: true,
            message: "Failed to send credentials to their email.",
          };
        }
      })
      .catch((error) => {
        result = {
          ...result,
          isError: true,
          message:
            "Encountered an error while sending credentials to their email.",
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

export const deleteAccount = (accountId) => {
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
    message: "Not implemented yet.",
  };

  return result;
};
