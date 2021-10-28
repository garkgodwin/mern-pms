import React from "react";

const TaskCard = ({ tasks }) => {
  return (
    <div className="col-auto  mb-2 p-3 card shadow me-2">
      <div>
        <h5>Tasks of your team</h5>
        <small>A short description for this card.</small>
        <hr />
      </div>
      <div className="d-flex flex-row justify-content-center">
        <div className="p-1">
          <h6 className="m-0 p-0">{tasks.all}</h6>
          <small>Tasks</small>
        </div>
        <div className="p-1">
          <h6 className="m-0 p-0">{tasks.delayed}</h6>
          <small>Delayed</small>
        </div>
        <div className="p-1">
          <h6 className="m-0 p-0">{tasks.held}</h6>
          <small>Held</small>
        </div>
        <div className="p-1">
          <h6 className="m-0 p-0">{tasks.done}</h6>
          <small>Done</small>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
