export const setTokenToLocal = (token) => {
  localStorage.setItem("token", token);
};

export const getTokenFromLocal = () => {
  if (
    localStorage.getItem("token") === undefined ||
    localStorage.getItem("token") === null ||
    localStorage.getItem("token") === ""
  ) {
    return "";
  } else {
    return localStorage.getItem("token");
  }
};
