import React, { useState, useEffect } from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";

//?COMPONENTS
import Tasks from "./Tasks";
import YourTasks from "./YourTasks";
import TaskForm from "./TaskForm";

const TasksContent = ({ type, loggedInData, team }) => {
  const [myMemberData, setMyMemberData] = useState({}); //? get members data
  const [taskId, setTaskId] = useState(0);
  const [tasksUpdated, setTasksUpdated] = useState(false);

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
      <h5>Employee Tasks</h5>
      {myMemberData.memberType === 1 ? (
        <div className="bg-light text-dark mb-2">
          <Link to="/e-tasks" className="me-2">
            All Projects and Tasks
          </Link>
          <Link to="/e-tasks/your-tasks" className="me-2">
            Your tasks
          </Link>
          <Link to="/e-tasks/form">Form</Link>
        </div>
      ) : (
        <div className="bg-light text-dark mb-2">
          <Link to="/e-tasks/your-tasks" className="me-2">
            Your tasks
          </Link>
        </div>
      )}
      <Switch>
        <Route path="/e-tasks/your-tasks">
          <YourTasks teamId={team.id} myMemberData={myMemberData} />
        </Route>
        <Route path="/e-tasks/form">
          {myMemberData.memberType === 2 && (
            <Redirect to="/e-tasks/your-tasks" />
          )}
          <TaskForm teamId={team.id} taskId={taskId} setTaskId={setTaskId} />
        </Route>
        <Route path="/e-tasks">
          {myMemberData.memberType === 2 && (
            <Redirect to="/e-tasks/your-tasks" />
          )}
          <Tasks
            teamId={team.id}
            setTaskId={setTaskId}
            setTasksUpdated={setTasksUpdated}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default TasksContent;
