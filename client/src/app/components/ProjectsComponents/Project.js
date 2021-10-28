import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

import { deleteProject } from "../../api/projectAPI";
import ProjectPhases from "./ProjectPhases";
import ProjectTasks from "./ProjectTasks";

const getFullName = (client) => {
  if (client === null || client === undefined) {
    return "No Client";
  } else {
    return (
      (client.sex === 1 ? "Mr. " : "Ms. ") +
      client.firstName +
      " " +
      client.lastName
    );
  }
};
const getTeamName = (team) => {
  if (team === null || team === undefined) {
    return "No Team Yet";
  } else {
    return team.teamName;
  }
};
const getDescription = (description) => {
  return description === "" ? "This project has no description." : description;
};
const Project = ({
  type,
  project,
  setProjectId,
  setIsProjectUpdated,
  memberType = 0,
}) => {
  const SYSTEM_MESSAGE = "System Message";
  const history = useHistory();

  let projectId = project.id;
  let title = project.title;
  let description = getDescription(project.description);
  let startDate = new Date(project.startDate).toDateString();
  let endDate = new Date(project.endDate).toDateString();
  //?CLIENT
  let fullName = getFullName(project.account);
  //?TEAM
  let teamName = getTeamName(project.team);

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    const result = await deleteProject(projectId);
    swal({
      title: SYSTEM_MESSAGE,
      text: result.message,
      icon: result.isSuccess
        ? "success"
        : result.isFailure
        ? "info"
        : result.isError
        ? "error"
        : result.isInvalid
        ? "warning"
        : "info",
      button: "Ok",
    }).then((value) => {
      if (result.isSuccess) {
        setIsProjectUpdated(true);
      }
    });
  };

  return (
    <div className="col-12 card shadow mb-1 d-flex flex-column p-3">
      <div className="d-flex flex-row justify-content-between">
        <div className="text-start">
          <h1>{title}</h1>
          <small>{description}</small>
        </div>
        <div className="w-auto h-auto d-flex flex-row">
          <div className="card p-3 me-3">
            <h5>{fullName}</h5>
            <small>Client</small>
          </div>
          {(type === 1 || type === 3) && (
            <div className="card p-3">
              <h5>{teamName}</h5>
              <small>Team</small>
            </div>
          )}
        </div>
      </div>
      <hr />
      <ProjectTasks tasks={project.tasks} />
      <hr />
      <div className="d-flex flex-row justify-content-around">
        <small>{"Start date: " + startDate}</small>
        <small>{"End date: " + endDate}</small>
      </div>
      <hr />
      {memberType === 1 && <ProjectPhases project={project} />}
      <hr />
      {(type === 1 || memberType === 1) && (
        <button
          className="mt-1 btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            setProjectId(projectId);
            history.push("/projects/form");
          }}
        >
          Update
        </button>
      )}
      {type === 1 && (
        <button
          className="mt-1 btn btn-danger"
          onClick={(e) => {
            handleDeleteClick(e);
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
};
export default Project;
