import React from "react";

//?DASBOARD COMPONENTS
import AdminDashboard from "./AdminDashboard";
import ClientDashboard from "./ClientDashboard";
import EmployeeDashboard from "./EmployeeDashboard";

const DashboardComponent = ({ type = 0, loggedInData, team }) => {
  return (
    <div>
      <h5>Dashboard</h5>
      {type === 1 ? (
        <AdminDashboard />
      ) : type === 2 ? (
        <EmployeeDashboard loggedInData={loggedInData} team={team} />
      ) : type === 3 ? (
        <ClientDashboard />
      ) : null}
    </div>
  );
};
export default DashboardComponent;
