import React, { useState } from "react";

//?COMPONENTS
import AdminProjects from "./AdminProjects";
import EmployeeProjects from "./EmployeeProjects";
import ClientProjects from "./ClientProjects";

const ProjectsComponent = ({ loggedInData, type, team = null }) => {
  const [projectId, setProjectId] = useState(0);
  return (
    <div className="px-5">
      {type === 1 ? (
        <AdminProjects
          type={type}
          projectId={projectId}
          setProjectId={setProjectId}
        />
      ) : type === 2 ? (
        <EmployeeProjects
          type={type}
          projectId={projectId}
          setProjectId={setProjectId}
          team={team}
          loggedInData={loggedInData}
        />
      ) : type === 3 ? (
        <ClientProjects />
      ) : null}
    </div>
  );
};

export default ProjectsComponent;
