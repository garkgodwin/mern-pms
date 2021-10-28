import React from "react";

//?CONTAINERS

const AdminDashboard = () => {
  return (
    <div className="d-flex flex-column px-5">
      <div className="d-flex flex-row">
        <div className="card shadow me-2 mb-2 p-3">
          <h2>Projects</h2>
          <small className="text-muted">A short review for projects</small>
          <hr />
          <div className="row position-relative">
            <div className="col-auto">
              <h3 className="m-0 p-0">17</h3>
              <small>Total</small>
            </div>
            <div className="col-auto">
              <h3 className="m-0 p-0">2</h3>
              <small>Recent</small>
            </div>
            <div className="col-auto">
              <h3 className="m-0 p-0">4</h3>
              <small>Finished</small>
            </div>
            <div className="col-auto">
              <h3 className="m-0 p-0">13</h3>
              <small>On-going</small>
            </div>
          </div>
        </div>
        <div className=" card shadow me-2 mb-2 p-3">
          <h2>Accounts</h2>

          <small className="text-muted">
            What happened to the accounts in this system.
          </small>
          <hr />

          <div className="row position-relative">
            <div className="col-auto">
              <h3 className="m-0 p-0">103</h3>
              <small>All Accounts</small>
            </div>
            <div className="col-auto">
              <h3 className="m-0 p-0">34</h3>
              <small>Clients</small>
            </div>
            <div className="col-auto">
              <h3 className="m-0 p-0">69</h3>
              <small>Employees</small>
            </div>
            <div className="col-auto">
              <h3 className="m-0 p-0">69</h3>
              <small>Activated</small>
            </div>
            <div className="col-auto">
              <h3 className="m-0 p-0">36</h3>
              <small>Online</small>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row">
        <div className="card shadow me-2 mb-2 p-3">
          <h2>Card 1</h2>
          <small>Some description..</small>
          <small>Some description..</small>
          <small>Some description..</small>
        </div>
        <div className=" card shadow me-2 mb-2">
          <h2>Card 1</h2>
          <small>Some description..</small>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
