import React, { useState, useEffect } from "react";

//?API
import { fetchProjects, fetchProjectsByTeamId } from "../../api/projectAPI";

//?COMPONENT
import Project from "./Project";

const Projects = ({ type, setProjectId, team, myMemberData }) => {
  const [isProjectUpdated, setIsProjectUpdated] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    handleOnMount();
  }, []);

  useEffect(() => {
    if (isProjectUpdated) {
      setIsProjectUpdated(false);
      handleOnMount();
    }
  }, [isProjectUpdated]);

  const handleOnMount = async () => {
    if (type === 1) {
      const result = await fetchProjects();
      if (result.isSuccess) {
        setProjects(result.data);
      } else {
        setProjects([]);
      }
    } else if (type === 2) {
      //!display for employee teams
      const result = await fetchProjectsByTeamId(team.id);
      if (result.isSuccess) {
        setProjects(result.data);
      } else {
        setProjects([]);
      }
    } else if (type === 3) {
      //TODO: for client projects
    } else {
      setProjects([]);
    }
  };

  return (
    <div className="row">
      {projects.map((project) => {
        return (
          <Project
            key={project.id}
            type={type}
            setProjectId={setProjectId}
            project={project}
            setIsProjectUpdated={setIsProjectUpdated}
            memberType={myMemberData.memberType}
          />
        );
      })}
    </div>
  );
};

export default Projects;
