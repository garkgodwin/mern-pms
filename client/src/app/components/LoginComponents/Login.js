import React, { useState } from "react";
import { useHistory } from "react-router-dom";
//?API
import { loginToSystem, checkAndFetchLoggedIn } from "../../api/accountAPI";

//?COMPONENTS
import FormBox from "./FormBox";

//?SWEETALERT
import swal from "sweetalert";

const Login = ({ setLoggedInData }) => {
  const history = useHistory();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    const result = await checkAndFetchLoggedIn();
    const SYSTEM_MESSAGE = "System Message";
    if (result.isSuccess) {
      const data = result.data;
      setLoggedInData(data);
    } else {
      if (result.tokenIsInvalid) {
        swal({
          title: SYSTEM_MESSAGE,
          text: result.message,
          icon: "info",
          button: "Ok",
        }).then((value) => {
          if (value) {
            setLoggedInData({
              id: 0,
              firstName: "",
              lastName: "",
              sex: 0,
              title: "",
              specialization: "",
              type: 0,
              status: 0,
              username: "",
              email: "",
            });
          }
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginToSystem(loginData);
    const SYSTEM_MESSAGE = "System Message";
    const icon = result.isSuccess
      ? "success"
      : result.isFailure
      ? "warning"
      : result.iInvalid
      ? "info"
      : result.isError
      ? "error"
      : "info";
    const text = result.message;
    if (result.isSuccess) {
      swal({
        title: SYSTEM_MESSAGE,
        text: text,
        icon: icon,
        button: "Ok",
      }).then((value) => {
        handleLogin();
      });
    } else {
      swal({
        title: SYSTEM_MESSAGE,
        text: text,
        icon: icon,
        button: "Ok",
      });
    }
  };

  return (
    <FormBox>
      <h2>Login Form</h2>
      <form className="form p-3" onSubmit={handleSubmit}>
        <div className="form-group mt-2">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Please enter your username..."
            value={loginData.username}
            onChange={(e) => {
              setLoginData({
                ...loginData,
                username: e.target.value,
              });
            }}
          />
        </div>
        <div className="form-group mt-2">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Please enter your password..."
            value={loginData.password}
            onChange={(e) => {
              setLoginData({
                ...loginData,
                password: e.target.value,
              });
            }}
          />
        </div>
        <button className="btn btn-primary mt-5" type="submit">
          Login
        </button>
      </form>
    </FormBox>
  );
};

export default Login;
