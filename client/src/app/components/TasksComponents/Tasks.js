import React, { useState, useEffect } from "react";

//?API
import { fetchAllTeamTasks } from "../../api/taskAPI";

//?COMPONENTS
import Task from "./Task";

const Tasks = ({ teamId, setTaskId }) => {
  const [tasks, setTasks] = useState([]);
  const [tasksUpdated, setTasksUpdated] = useState(false);
  useEffect(() => {
    getAndSetTasks();
    return () => {
      setTasks([]);
      setTasksUpdated(false);
    };
  }, []);
  useEffect(() => {
    if (tasksUpdated) {
      setTasksUpdated(false);
      getAndSetTasks();
    }
  }, [tasksUpdated]);

  const getAndSetTasks = async () => {
    const result = await fetchAllTeamTasks(teamId);
    const team = result.data;

    const projects = team.projects;
    const tempTasks = [];
    //!projects
    for (let i = 0; i < projects.length; i++) {
      const projectTitle = projects[i].title;
      const projectTasks = projects[i].tasks;
      //!tasks per project
      for (let j = 0; j < projectTasks.length; j++) {
        let tempTask = projectTasks[j];
        tempTask = {
          ...tempTask,
          projectTitle: projectTitle,
        };
        tempTasks.push(tempTask);
      }
    }
    setTasks(tempTasks);
  };

  return (
    <div className="row">
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            setTaskId={setTaskId}
            setTasksUpdated={setTasksUpdated}
          />
        );
      })}
    </div>
  );
};

export default Tasks;
