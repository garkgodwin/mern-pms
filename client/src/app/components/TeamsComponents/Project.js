import React from "react";

const Project = ({ project }) => {
  return (
    <div className="col-auto form card shadow">
      <h4>{project.title}</h4>
      <small className="text-muted">
        {project.description === ""
          ? "You did not describe this project"
          : project.description}
      </small>
    </div>
  );
};
export default Project;
