import React, { useState, useEffect } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";

//?COMPONENTS
import Projects from "./Projects";
import ProjectForm from "./ProjectForm";

const EmployeeProjects = ({ type, team, loggedInData }) => {
  const [projectId, setProjectId] = useState(0);
  const [myMemberData, setMyMemberData] = useState({}); //? get members data
  useEffect(() => {
    getAndSetMemberData();
  }, []);

  const getAndSetMemberData = () => {
    const teamMembers = team.team_members;
    if (teamMembers !== null) {
      for (let i = 0; i < teamMembers.length; i++) {
        if (teamMembers[i].accountId === loggedInData.id) {
          setMyMemberData(teamMembers[i]);
        }
      }
    }
  };

  return (
    <div className="px-5">
      {type === 2 ? (
        <div>
          <h5>Your Teams Projects</h5>
          <div className="bg-light text-dark mb-2">
            <Link to="/projects" className="me-2">
              Project List
            </Link>
          </div>
          <Switch>
            <Route path="/projects/form">
              <ProjectForm
                type={type}
                projectId={projectId}
                setProjectId={setProjectId}
              />
            </Route>
            <Route path="/projects">
              <Projects
                type={type}
                setProjectId={setProjectId}
                team={team}
                myMemberData={myMemberData}
              />
            </Route>
          </Switch>
        </div>
      ) : null}
    </div>
  );
};

export default EmployeeProjects;
