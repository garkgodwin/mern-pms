import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

//?API
import { fetchYourTeam } from "../../api/teamAPI";

//?COMPONENTS
import DashboardContent from "../DashboardComponents";
import ProjectsContent from "../ProjectsComponents";
import TeamsContent from "../TeamsComponents";
import TasksContent from "../TasksComponents";

const EmployeeContent = ({ type, loggedInData }) => {
  const [team, setTeam] = useState({
    teamId: 0,
    teamName: "",
    description: "",
    createdAt: "",
    updatedAt: "",
    team_members: [],
  });

  useEffect(() => {
    console.log(loggedInData);
    handleEmployeeDetails();
  }, []);

  const handleEmployeeDetails = async () => {
    const result = await fetchYourTeam(loggedInData.id);
    if (result.isSuccess) {
      setTeam(result.data);
    }
  };

  return (
    <div>
      <Switch>
        <Route path="/e-tasks">
          <TasksContent type={type} loggedInData={loggedInData} team={team} />
        </Route>
        <Route path="/projects">
          <ProjectsContent
            type={type}
            loggedInData={loggedInData}
            team={team}
          />
        </Route>
        <Route path="/teams">
          <TeamsContent type={type} loggedInData={loggedInData} />
        </Route>
        <Route path="/">
          <DashboardContent
            type={type}
            loggedInData={loggedInData}
            team={team}
          />
        </Route>
      </Switch>
    </div>
  );
};
export default EmployeeContent;
