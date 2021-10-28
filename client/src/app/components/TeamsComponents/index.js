import React from "react";

//?COMPOnENTS
import AdminTeams from "./AdminTeams";
import EmployeeTeams from "./EmployeeTeams";
import ClientTeams from "./ClientTeams";

const TeamsContent = ({ type, loggedInData }) => {
  return (
    <div className="px-5">
      {type === 1 ? (
        <AdminTeams type={type} />
      ) : type === 2 ? (
        <EmployeeTeams type={type} loggedInData={loggedInData} />
      ) : type === 3 ? (
        <ClientTeams type={type} />
      ) : null}
    </div>
  );
};
export default TeamsContent;
