import React from "react";

const TopNav = ({ loggedInData }) => {
  const fullName =
    (loggedInData.sex === 1 ? "Mr. " : "Ms. ") +
    loggedInData.firstName +
    " " +
    loggedInData.lastName;
  const typeString =
    loggedInData.type === 1
      ? "Admin"
      : loggedInData.type === 2
      ? "Employee"
      : loggedInData.type === 3
      ? "Client"
      : "None";
  const email = loggedInData.email;
  return (
    <div
      className="bg-light text-dark px-3 py-1 d-flex justify-content-between"
      style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
    >
      <div className="w-75 text-center d-flex flex-row justify-content-around align-items-center">
        <small>{fullName}</small>
        <small>{typeString}</small>
        <small>{email}</small>
      </div>
      <button className="btn btn-secondary">Profile</button>
    </div>
  );
};

export default TopNav;
