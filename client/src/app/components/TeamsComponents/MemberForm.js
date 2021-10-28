import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

//?API
import { getNonMemberAccounts, addMemberToTeam } from "../../api/teamAPI";

const MemberForm = ({ teamId, setShowMemberForm, setIsMemberUpdated }) => {
  const history = useHistory();
  const [nonMembers, setNonMembers] = useState([]);
  const [selected, setSelected] = useState({
    accountId: 0,
    memberType: 2,
  });

  useEffect(() => {
    getNonMembers();
    return () => {
      setNonMembers([]);
      setSelected({ accountId: 0, memberType: 2 });
    };
  }, []);

  useEffect(() => {
    if (nonMembers.length !== 0) {
      setSelected({ ...selected, accountId: nonMembers[0].id });
    }
  }, [nonMembers]);
  const getNonMembers = async () => {
    const result = await getNonMemberAccounts();
    if (result.isSuccess) {
      const data = result.data.filter((employee) => {
        if (employee.type === 2) {
          return employee;
        }
      });
      setNonMembers(data);
    } else {
      setShowMemberForm(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selected);
    const result = await addMemberToTeam(teamId, selected);
    const SYSTEM_MESSAGE = "System Message";
    if (result.isSuccess) {
      swal({
        title: SYSTEM_MESSAGE,
        text: result.message,
        icon: "success",
        button: "Ok",
      });
      setIsMemberUpdated(true);
      setShowMemberForm(false);
    } else {
      swal({
        title: SYSTEM_MESSAGE,
        text: result.message,
        icon: result.isInvalid
          ? "warning"
          : result.isError
          ? "error"
          : result.isFailure
          ? "info"
          : "info",
        button: "Ok",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-start bg-light d-flex flex-column p-3 h-auto w-50 align-items-center shadow form"
    >
      <h5>Member Form</h5>
      <div className="form-group w-50 mt-3">
        <label>Select New Member</label>
        <select
          className="form-select"
          size="3"
          value={selected.accountId}
          onChange={(e) => {
            setSelected({
              ...selected,
              accountId: e.target.value,
            });
          }}
        >
          {nonMembers.map((nonMember) => {
            return (
              <option key={nonMember.id} value={nonMember.id}>
                {(nonMember.sex === 1 ? "Mr. " : "Ms. ") +
                  nonMember.firstName +
                  " " +
                  nonMember.lastName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group w-50">
        <label className="text-center align-items-center justify-content-center d-flex">
          Type:{" "}
        </label>
        <select
          className="form-select"
          value={selected.memberType}
          onChange={(e) => {
            setSelected({
              ...selected,
              memberType: e.target.value,
            });
          }}
        >
          <option value={2}>Member</option>
          <option value={1}>Manager</option>
        </select>
      </div>
      <button className="btn btn-primary mt-2" type="submit">
        Add Member
      </button>
      <button
        className="btn btn-secondary mt-2"
        onClick={(e) => {
          e.preventDefault();
          setShowMemberForm(false);
        }}
      >
        Cancel
      </button>
    </form>
  );
};

export default MemberForm;
