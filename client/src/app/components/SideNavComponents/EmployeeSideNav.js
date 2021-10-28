import React from "react";
import { Link } from "react-router-dom";

const EmployeeNavs = () => {
  return (
    <div>
      <Link to="/" className="w-100 btn btn-light mt-2">
        Dashboard
      </Link>
      <hr />
      <Link to="/projects" className="w-100 btn btn-light mt-2">
        Projects
      </Link>
      <Link to="/e-tasks" className="w-100 btn btn-light mt-2">
        Tasks
      </Link>
      <hr />
      <Link to="/teams" className="w-100 btn btn-light mt-2">
        Team
      </Link>
    </div>
  );
};

export default EmployeeNavs;
