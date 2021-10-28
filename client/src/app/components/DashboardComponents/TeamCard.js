import React from "react";

const TeamCard = ({ teams }) => {
  return (
    <div className="col-auto  mb-2 p-3 card shadow me-2">
      <div>
        <h5>Your team.</h5>
        <small>A short description for this card.</small>
        <hr />
      </div>
      <div className="d-flex flex-row justify-content-center">
        <div className="p-1">
          <h6 className="m-0 p-0">{1}</h6>
          <small>Clients</small>
        </div>
        <div className="p-1">
          <h6 className="m-0 p-0">{69}</h6>
          <small>Employees</small>
        </div>
        <div className="p-1">
          <h6 className="m-0 p-0">{9}</h6>
          <small>Managers</small>
        </div>
        <div className="p-1">
          <h6 className="m-0 p-0">{60}</h6>
          <small>Members</small>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
