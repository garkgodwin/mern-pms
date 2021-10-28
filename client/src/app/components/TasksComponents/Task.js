import React from "react";
import { useHistory } from "react-router-dom";
import { deleteTask } from "../../api/taskAPI";

import swal from "sweetalert";
const setCategoryString = (category) => {
  return category === 1
    ? "Initialization Phase"
    : category === 2
    ? "Planning Phase"
    : category === 3
    ? "Execution Phase"
    : category === 4
    ? "Monitoring And Controlling Phase"
    : category === 5
    ? "Closing Phase"
    : "No phase";
};
const Task = ({ task, setTaskId, setTasksUpdated }) => {
  const history = useHistory();
  const taskId = task.id;
  const taskTitle = task.task;
  const description =
    task.description === ""
      ? "No description for this task."
      : task.description;
  const startDate = new Date(task.startDate).toDateString();
  const endDate = new Date(task.endDate).toDateString();
  const category = setCategoryString(task.category);
  const isDelayed = new Date() >= new Date(task.endDate);
  const member = task.team_member;
  let fullName = "";
  if (member !== null) {
    const account = member.account;
    fullName =
      (account.sex === 1 ? "Mr. " : "Ms. ") +
      account.firstName +
      " " +
      account.lastName;
  } else {
    fullName = "None";
  }

  const handleUpdateClick = (e) => {
    e.preventDefault();
    setTaskId(taskId);
    history.push("/e-tasks/form");
  };
  const handleDeleteClick = async (e) => {
    e.preventDefault();
    const SYSTEM_MESSAGE = "System Message";
    const result = await deleteTask(taskId);
    swal({
      title: SYSTEM_MESSAGE,
      text: result.message,
      icon: result.isSuccess
        ? "success"
        : result.isError
        ? "error"
        : result.isFailure
        ? "info"
        : result.isInvalid
        ? "warning"
        : "info",
      button: "Ok",
    }).then((value) => {
      if (result.isSuccess) {
        setTasksUpdated(true);
      }
    });
  };
  return (
    <div className="card p-3 shadow position-relative mt-1">
      <div className="text-start d-flex flex-column">
        <h4 className="m-0">{taskTitle}</h4>
        <small className="text-muted">{description}</small>
        <small>Category: {category}</small>
      </div>
      <hr />
      <div className="row">
        <div className="col-12 d-flex flex-row justify-content-around">
          {task.isStarted ? (
            <h6 className="bg-success">Started</h6>
          ) : (
            <h6 className="bg-danger text-light px-3 py-1">Not Started</h6>
          )}
          {task.onHold ? (
            <h6 className="bg-warning text-light px-3 py-1">On Hold</h6>
          ) : (
            <h6 className="bg-success text-light px-3 py-1">On Going</h6>
          )}
          {task.isDone ? (
            <h6 className="bg-success px-3 py-1">Finished</h6>
          ) : (
            <h6 className="bg-warning text-light px-3 py-1">Not Finished</h6>
          )}
          {isDelayed ? (
            <h6 className="bg-danger text-light px-3 py-1">
              The task has been delayed.
            </h6>
          ) : (
            <h6 className="bg-light text-dark px-3 py-1">
              The task is alright for now.
            </h6>
          )}
        </div>
        <small>Task Status</small>
      </div>
      <hr />
      <div className="d-flex flex-row justify-content-around mb-3">
        <small>Start Date: {startDate}</small>
        <small>End Date: {endDate}</small>
      </div>
      <div
        className="d-flex flex-row justify-content-around mx-3 position-absolute end-0"
        style={{ zIndex: "100" }}
      >
        <div className="bg-dark text-light me-2 p-3  card ">
          <h6 className="w-auto">{task.projectTitle}</h6>
          <small>Project</small>
        </div>
        <div className="bg-dark text-light p-3  card ">
          <h6 className="w-auto ">{fullName}</h6>
          <small>Owner</small>
        </div>
      </div>
      <button
        className="btn btn-primary"
        onClick={(e) => {
          handleUpdateClick(e);
        }}
      >
        Update
      </button>
      <button
        className="btn btn-danger"
        onClick={(e) => {
          handleDeleteClick(e);
        }}
      >
        Delete
      </button>
    </div>
  );
};
export default Task;
