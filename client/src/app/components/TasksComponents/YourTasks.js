import React, { useState, useEffect } from "react";
import { fetchYourTasks } from "../../api/taskAPI";

//?components
import YourTask from "./YourTask";
const YourTasks = ({ teamId, myMemberData }) => {
  const [tasks, setTasks] = useState([]);
  const [tasksUpdated, setTasksUpdated] = useState(false);

  useEffect(() => {
    getAndSetTasks();
    return () => {
      setTasks([]);
    };
  }, []);

  useEffect(() => {
    if (tasksUpdated) {
      setTasksUpdated(false);
      getAndSetTasks();
    }
  }, [tasksUpdated]);

  const getAndSetTasks = async () => {
    const teamMemberId = myMemberData.id;
    const result = await fetchYourTasks(teamMemberId);
    if (result.isSuccess) {
      const data = result.data;
      setTasks(data);
    }
  };
  return (
    <div className="row">
      {tasks.map((task) => {
        return (
          <YourTask
            key={task.id}
            task={task}
            setTasksUpdated={setTasksUpdated}
          />
        );
      })}
    </div>
  );
};

export default YourTasks;
