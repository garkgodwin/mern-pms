import React from "react";
import { Link } from "react-router-dom";

const AdminSideNav = () => {
  return (
    <div>
      <Link to="/" className="w-100 btn btn-light mt-2">
        Dashboard
      </Link>
      <Link to="/projects" className="w-100 btn btn-light mt-2">
        Projects
      </Link>
      <Link to="/teams" className="w-100 btn btn-light mt-2">
        Teams
      </Link>
      <hr />
      <Link to="/accounts" className="w-100 btn btn-light mt-2">
        Accounts
      </Link>
    </div>
  );
};

export default AdminSideNav;
