import React from "react";
import { useHistory } from "react-router-dom";

//?API HELPER
import { setTokenToLocal } from "../../api/helpers/local-variables";

//?COMPONENTS
import AdminSideNav from "./AdminSideNav";
import EmployeeSideNav from "./EmployeeSideNav";
import ClientSideNav from "./ClientSideNav";

//?SWEET ALERT
import swal from "sweetalert";

const SideNav = ({ type, setLoggedInData }) => {
  const history = useHistory();
  const handleLogoutClick = (e) => {
    e.preventDefault();
    swal("Would you like to logout?", {
      buttons: true,
      dangerMode: true,
    }).then((value) => {
      if (value) {
        setTokenToLocal("");
        setLoggedInData({});
        swal("You have been logged out!", { icon: "success" }).then((value) => {
          history.push("/login");
        });
      }
    });
  };

  return (
    <div
      className="position-fixed start-0 h-100"
      style={{ width: "200px", zIndex: "1000" }}
    >
      <div
        className="bg-dark text-center text-light
      d-flex flex-column justify-content-between
    w-100 h-100 p-3"
      >
        <div>
          <h2>GG PMS</h2>
          <hr />
          {type === 1 ? (
            <AdminSideNav />
          ) : type === 2 ? (
            <EmployeeSideNav />
          ) : type === 3 ? (
            <ClientSideNav />
          ) : null}
        </div>
        <button
          className="btn btn-danger mb-2 mx-2"
          onClick={(e) => {
            handleLogoutClick(e);
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
export default SideNav;
