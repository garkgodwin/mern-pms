import React from "react";

const ProjectCard = ({ projects }) => {
  return (
    <div className="col-auto  mb-2 p-3 card shadow me-2">
      <div>
        <h5>Projects of your team</h5>
        <small>A short description for this card.</small>
        <hr />
      </div>
      <div className="d-flex flex-row justify-content-center">
        <div className="p-1">
          <h6 className="m-0 p-0">{projects.all}</h6>
          <small>Projects</small>
        </div>
        <div className="p-1">
          <h6 className="m-0 p-0">{projects.delayed}</h6>
          <small>Delayed</small>
        </div>
        <div className="p-1">
          <h6 className="m-0 p-0">{projects.finished}</h6>
          <small>Finished</small>
        </div>
      </div>
    </div>
  );
};
export default ProjectCard;
