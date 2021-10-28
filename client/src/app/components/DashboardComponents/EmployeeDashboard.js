import React, { useState, useEffect } from "react";

//?API
import { fetchAndCountTeamProject } from "../../api/projectAPI";
import { fetchAndCountTeamTask } from "../../api/taskAPI";

//?COMPONENTS
import ProjectCard from "./ProjectCard";
import TaskCard from "./TaskCard";
import TeamCard from "./TeamCard";
import GanttDashboard from "./GanttDashboard";

const EmployeeDashboard = ({ team }) => {
  const teamId = team.id;
  const [projects, setProjects] = useState({
    all: 0,
    finished: 0,
    delayed: 0,
  });
  const [tasks, setTasks] = useState({
    all: 0,
    done: 0,
    held: 0,
    delayed: 0,
  });
  const [teams, setTeams] = useState({
    clients: 0,
    employees: 0,
    managers: 0,
    members: 0,
  });
  useEffect(() => {
    setTeamProjectsCount();
    setTeamTasksCount();
  }, []);

  const setTeamProjectsCount = async () => {
    const result = await fetchAndCountTeamProject(teamId);
    if (result.isSuccess) {
      const data = result.data;
      setProjects(data);
    }
  };

  const setTeamTasksCount = async () => {
    const result = await fetchAndCountTeamTask(teamId);
    if (result.isSuccess) {
      const data = result.data;
      setTasks(data);
    }
  };

  return (
    <div className="d-flex flex-column p-5 w-100">
      <div className="row justify-content-center">
        <ProjectCard projects={projects} />
        <TaskCard tasks={tasks} />
        <TeamCard teams={teams} />
      </div>
      <GanttDashboard teamId={teamId} />
    </div>
  );
};
export default EmployeeDashboard;
