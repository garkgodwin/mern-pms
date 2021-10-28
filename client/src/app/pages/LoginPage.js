import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";

//?COMPONENTS
import Activate from "../components/LoginComponents/Activate";
import Login from "../components/LoginComponents/Login";

const LoginPage = ({ setLoggedInData }) => {
  return (
    <div
      className="bg-dark text-light vh-100 d-flex flex-column
       align-items-center
    "
    >
      <div className="w-100 d-flex justify-content-between mb-5">
        <h1>GG PMS</h1>
        <div className=" w-25 d-flex justify-content-around align-items-center">
          <Link
            className="h-50 w-50 text-center 
          bg-warning text-dark me-2
          "
            to="/login"
          >
            Login
          </Link>
          <Link
            className="h-50 w-50 text-center 
          bg-warning text-dark me-2
          "
            to="/login/activate"
          >
            Activate
          </Link>
        </div>
      </div>
      <Route exact path="/login">
        <Login setLoggedInData={setLoggedInData} />
      </Route>
      <Route path="/login/activate">
        <Activate />
      </Route>
    </div>
  );
};

export default LoginPage;
