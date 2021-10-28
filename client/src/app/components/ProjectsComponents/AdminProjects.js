import React, { useState } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";

//?COMPONENTS
import Projects from "./Projects";
import ProjectForm from "./ProjectForm";

const AdminProjects = ({ type }) => {
  const [projectId, setProjectId] = useState(0);

  return (
    <div className="px-5">
      {type === 1 ? (
        <div>
          <h5>Admin Projects</h5>
          <div className="bg-light text-dark mb-2">
            <Link to="/projects" className="me-2">
              Project List
            </Link>
            <Link to="/projects/form">Form</Link>
          </div>
          <Switch>
            <Route path="/projects/form">
              <ProjectForm
                projectId={projectId}
                setProjectId={setProjectId}
                type={type}
              />
            </Route>
            <Route path="/projects">
              <Projects setProjectId={setProjectId} type={type} />
            </Route>
          </Switch>
        </div>
      ) : null}
    </div>
  );
};

export default AdminProjects;
