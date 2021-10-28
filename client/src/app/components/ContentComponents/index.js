import React from "react";

//?COMPONENTS
import Admin from "./AdminContent";
import Employee from "./EmployeeContent";
import Client from "./ClientContent";

const ContentComponent = ({ type, loggedInData }) => {
  return (
    <div>
      {type === 1 ? (
        <Admin type={type} />
      ) : type === 2 ? (
        <Employee type={type} loggedInData={loggedInData} />
      ) : type === 3 ? (
        <Client type={type} loggedInData={loggedInData} />
      ) : null}
    </div>
  );
};
export default ContentComponent;
