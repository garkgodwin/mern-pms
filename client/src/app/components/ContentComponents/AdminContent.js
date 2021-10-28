import React from "react";
import { Route, Switch } from "react-router-dom";

//?COMPONENTS
import AccountsContent from "../AccountsComponents";
import ProjectsContent from "../ProjectsComponents";
import TeamsContent from "../TeamsComponents";
import DashboardContent from "../DashboardComponents";

const AdminContent = ({ type }) => {
  return (
    <div>
      <Switch>
        <Route path="/accounts">
          <AccountsContent type={type} />
        </Route>
        <Route path="/projects">
          <ProjectsContent type={type} />
        </Route>
        <Route path="/teams">
          <TeamsContent type={type} />
        </Route>
        <Route path="/">
          <DashboardContent type={type} />
        </Route>
      </Switch>
    </div>
  );
};

export default AdminContent;
