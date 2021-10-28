import React from "react";
import { Link } from "react-router-dom";

const ClientSideNav = () => {
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
    </div>
  );
};

export default ClientSideNav;
