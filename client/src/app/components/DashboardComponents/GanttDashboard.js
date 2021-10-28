import React, { useState, useEffect } from "react";

//?API
import { fetchProjectsByTeamId } from "../../api/projectAPI";

import {
  Gantt,
  Task,
  EventOption,
  StylingOption,
  ViewMode,
  DisplayOption,
} from "gantt-task-react";
import "gantt-task-react/dist/index.css";

const GanntDashboard = ({ teamId }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    handleOnMount();
  }, []);

  const handleOnMount = async () => {
    console.log(teamId);
    const result = await fetchProjectsByTeamId(teamId);
    if (result.isSuccess) {
      const data = result.data;
      let projects = [];
      for (let i = 0; i < data.length; i++) {
        const teamProject = data[i];
        let project = {
          start: new Date(teamProject.startDate),
          end: new Date(teamProject.endDate),
          name: teamProject.title,
          id: teamProject.id,
          type: "project",
          progress: 0,
          isDisabled: true,
        };
        projects.push(project);
      }
      setProjects(projects);
    }
  };
  useEffect(() => {
    console.log(projects);
  }, [projects]);
  return (
    <div className="bg-light d-flex justify-content-center mt-2 ">
      <h1>Implement Gant chart here</h1>
    </div>
  );
};
export default GanntDashboard;
