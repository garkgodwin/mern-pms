import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";

//?API
import { checkAndFetchLoggedIn } from "./app/api/accountAPI";
//?COMPONETS
import AuthPage from "./app/pages/AuthPage";
import LoginPage from "./app/pages/LoginPage";
import Page404 from "./app/pages/Page404";

//?SWEETALERT
import swal from "sweetalert";

const Main = () => {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInData, setLoggedInData] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    sex: 0,
    title: "",
    specialization: "",
    type: 1,
    status: 0,
    username: "",
    email: "",
  });

  useEffect(() => {
    handleLogin();
  }, []);

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

  useEffect(() => {
    if (
      loggedInData.username !== "" &&
      loggedInData.email !== "" &&
      loggedInData.type
    ) {
      setIsLoggedIn(true);
      history.push("/");
    } else {
      setIsLoggedIn(false);
      history.push("/login");
    }
  }, [loggedInData]);

  return (
    <div className="container-fluid m-0 p-0  text-center">
      <Switch>
        <Route path="/login">
          <LoginPage setLoggedInData={setLoggedInData} />
        </Route>
        <Route path="/">
          <AuthPage
            loggedInData={loggedInData}
            setLoggedInData={setLoggedInData}
          />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
