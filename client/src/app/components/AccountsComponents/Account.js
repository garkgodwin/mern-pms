import React from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

//?API
import { deleteAccount, sendOtp } from "../../api/accountAPI";

const Account = ({ setAccountId, setIsUpdated, account }) => {
  const SYSTEM_MESSAGE = "System Message";
  const history = useHistory();

  const accountId = account.id;
  const type =
    account.type === 1
      ? "Admin"
      : account.type === 2
      ? "Employee"
      : account.type === 3
      ? "Client"
      : "No Account type lol";
  const fullName =
    (account.sex === 1 ? "Mr. " : "Ms. ") +
    account.firstName +
    " " +
    account.lastName;
  const title = account.title || "No Title";
  const specialization =
    account.specialization === ""
      ? "No Specialization"
      : account.specialization;

  const activated = account.activated ? "True" : "False";
  const status = account.status ? "Online" : "Offline";
  const username = account.username;
  const email = account.email;
  const handleUpdateClick = (e) => {
    e.preventDefault();
    setAccountId(account.id);
    history.push("/accounts/form");
  };

  const handleSendCredentialsClick = async (e) => {
    e.preventDefault();
    const result = await sendOtp(accountId);
    const SYSTEM_MESSAGE = "System Message";
    if (result.tokenIsInvalid) {
      history.push("/login");
      swal({
        title: SYSTEM_MESSAGE,
        text: result.message,
        icon: "warning",
        button: "Ok",
      });
    } else {
      swal({
        title: SYSTEM_MESSAGE,
        text: result.message,
        icon: result.isSuccess
          ? "success"
          : result.isError
          ? "error"
          : result.isInvalid
          ? "warning"
          : result.isFailure
          ? "info"
          : "info",
        button: "Ok",
      });
    }
  };
  const handleRemoveClick = async (e) => {
    e.preventDefault();
    const result = deleteAccount(0);
    if (result.isSuccess) {
      swal({
        title: SYSTEM_MESSAGE,
        text: result.message,
        icon: "success",
        button: "Ok",
      }).then((value) => {
        setIsUpdated(true);
      });
    } else {
      swal({
        title: SYSTEM_MESSAGE,
        text: result.message,
        icon: result.isError
          ? "error"
          : result.isInvalid
          ? "warning"
          : result.isFailure
          ? "info"
          : "info",
        button: "Ok",
      });
    }
  };
  return (
    <div className="col-12 card shadow mb-1 d-flex flex-column p-3">
      <div className="d-flex flex-row justify-content-around py-1">
        <small className="position-absolute top-0 end-0 me-2 bg-dark text-light px-3">
          {type}
        </small>
        <h6>{fullName}</h6>
        <small>{title}</small>
        <small>{specialization}</small>
        <small>{activated}</small>
        <small>{status}</small>
        <small>{username}</small>
        <small>{email}</small>
      </div>
      <hr />
      <div className="d-flex flex-row mt-2">
        <button
          className="btn btn-primary"
          onClick={(e) => {
            handleUpdateClick(e);
          }}
        >
          Update
        </button>
        <button
          className="btn btn-warning"
          onClick={(e) => {
            handleSendCredentialsClick(e);
          }}
        >
          Send Credentials
        </button>
        <button
          className="btn btn-danger"
          onClick={(e) => {
            handleRemoveClick(e);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Account;
