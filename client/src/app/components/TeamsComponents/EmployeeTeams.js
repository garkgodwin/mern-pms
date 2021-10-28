import React, { useState, useEffect } from "react";
import { Switch, Link, Route } from "react-router-dom";

//?API
import { fetchYourTeam } from "../../api/teamAPI";

//?icons
import { BsPersonSquare } from "react-icons/bs";

const Employee = ({ teamMember, loggedInData }) => {
  const memberId = teamMember.id;
  const account = teamMember.account;
  const accountId = account.id;
  const you = loggedInData.id === accountId ? "Your information" : "";
  const fullName =
    you === ""
      ? (account.sex === 1 ? "Mr. " : "Ms. ") +
        account.firstName +
        " " +
        account.lastName
      : you;
  const title = account.title === "" ? "No title" : account.title;
  const specialization =
    account.specialization === "" ? "No specialty" : account.specialization;
  return (
    <div
      className="col-6 card shadow p-3
     justify-content-center align-items-center
      position-relative
     "
    >
      <div className="w-50 h-25">
        <BsPersonSquare style={{ width: "inherit", height: "inherit" }} />
      </div>
      <div className="mt-2">
        <h5>{fullName}</h5>
        <small>{title}</small>
      </div>
      <hr className="w-75" />
      <div className="mb-3">
        <small className="text-muted">{specialization}</small>
      </div>
    </div>
  );
};

const EmployeeTeams = ({ type, loggedInData }) => {
  const [yourTeam, setYourTeam] = useState({
    teamName: "",
    description: "",
    team_members: [],
  });

  useEffect(() => {
    handleTeamMount();
  }, []);

  const handleTeamMount = async () => {
    const result = await fetchYourTeam(loggedInData.id);
    if (result.isSuccess) {
      setYourTeam(result.data);
    } else {
      setYourTeam({});
    }
  };
  return (
    <div>
      {type === 2 ? (
        <div>
          <h5>Your Team</h5>
          <hr />
          <div className="d-flex flex-column card shadow p-5">
            <div>
              <h1>{yourTeam.teamName}</h1>
              <small>{yourTeam.description}</small>
            </div>
            <hr />
            <div className="row card px-3 pb-3">
              <h4>Managers</h4>
              {yourTeam.team_members.map((teamMember) => {
                if (teamMember.memberType === 1) {
                  return (
                    <Employee
                      key={teamMember.id}
                      teamMember={teamMember}
                      loggedInData={loggedInData}
                    />
                  );
                }
              })}
            </div>
            <div className="row card px-3 pb-3 mt-5">
              <h4>Members</h4>
              {yourTeam.team_members.map((teamMember) => {
                if (teamMember.memberType === 2) {
                  return (
                    <Employee
                      key={teamMember.id}
                      teamMember={teamMember}
                      loggedInData={loggedInData}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EmployeeTeams;
