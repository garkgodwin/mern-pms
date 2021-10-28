import React, { useState, useEffect } from "react";

//?COMPONENTS
import SideNav from "../components/SideNavComponents";
import TopNav from "../components/TopNavComponents";
import Content from "../components/ContentComponents";

const AuthPage = ({ loggedInData, setLoggedInData }) => {
  return (
    <div className=" d-flex flex-row justify-content-center">
      <SideNav type={loggedInData.type} setLoggedInData={setLoggedInData} />
      <div
        className=" d-flex flex-column w-100"
        style={{ marginLeft: "200px" }}
      >
        <TopNav type={loggedInData.type} loggedInData={loggedInData} />
        <Content type={loggedInData.type} loggedInData={loggedInData} />
      </div>
    </div>
  );
};
export default AuthPage;
