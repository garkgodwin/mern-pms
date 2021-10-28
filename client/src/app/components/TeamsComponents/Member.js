import React from "react";
import swal from "sweetalert";
import { removeMemberFromTeam } from "../../api/teamAPI";

const Member = ({ member, setIsMemberUpdated }) => {
  const SYSTEM_MESSAGE = "System Message";
  const memberId = member.id;
  const account = member.account;
  const fullName =
    (account.sex === 1 ? "Mr. " : "Ms. ") +
    account.firstName +
    " " +
    account.lastName;
  const title = account.title;
  const specialization = account.specialization;

  const handleRemoveClick = async (e) => {
    e.preventDefault();
    const result = await removeMemberFromTeam(memberId);
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
    }).then((value) => {
      if (result.isSuccess) {
        setIsMemberUpdated(true);
      }
    });
  };
  return (
    <div className="col-auto card">
      <h4>{fullName}</h4>
      <small>{title}</small>
      <small>{specialization}</small>
      <button className="btn btn-primary">
        {member.memberType === 1 ? "Manager" : "Member"}
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
  );
};
export default Member;
