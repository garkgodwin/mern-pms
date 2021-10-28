import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//?API
import {
  fetchAccountById,
  createAccount,
  updateAccount,
} from "../../api/accountAPI";

//?SWEET ALERT
import swal from "sweetalert";

const AccountForm = ({ accountId = 0, setAccountId }) => {
  const SYSTEM_MESSAGE = "System Message";
  const history = useHistory();
  const [inputDetails, setInputDetails] = useState({
    type: 2,
    firstName: "",
    lastName: "",
    sex: 0,
    title: "",
    specialization: "",
    username: "",
    email: "",
  });
  const [formData, setFormData] = useState({
    submitText: "Create",
  });

  useEffect(() => {
    handleOnMount();
    return () => {
      setAccountId(0);
    };
  }, []);
  const handleOnMount = async () => {
    if (accountId !== 0) {
      const result = await fetchAccountById(accountId);
      if (result.isSuccess) {
        setInputDetails(result.data);
        setFormData({
          submitText: "Update",
        });
      } else {
        history.push("/accounts");
      }
    } else {
      setFormData({
        submitText: "Create",
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (accountId === 0) {
      update();
    } else {
      create();
    }
  };
  const create = async () => {
    const result = await updateAccount(accountId, inputDetails);
    if (result.isSuccess) {
      swal({
        title: SYSTEM_MESSAGE,
        text: result.message,
        icon: "success",
        button: "Ok",
      }).then((value) => {
        history.push("/accounts");
      });
    } else {
      swal({
        title: SYSTEM_MESSAGE,
        text: result.message,
        icon: result.isError ? "error" : result.isInvalid ? "warning" : "info",
        button: "Ok",
      });
    }
  };
  const update = async () => {
    const result = await createAccount(inputDetails);
    if (result.isSuccess) {
      swal({
        title: SYSTEM_MESSAGE,
        text: result.message,
        icon: "success",
        button: "Ok",
      }).then((value) => {
        history.push("/accounts");
      });
    } else {
      if (result.tokenIsInvalid) {
        swal({
          title: SYSTEM_MESSAGE,
          text: result.message,
          icon: "warning",
          button: "Ok",
        }).then((value) => {
          history.push("/login");
        });
      } else {
        swal({
          title: SYSTEM_MESSAGE,
          text: result.message,
          icon: result.isError
            ? "error"
            : result.isInvalid
            ? "warning"
            : "info",
          button: "Ok",
        });
      }
    }
  };
  return (
    <form className="form shadow p-5 w-auto bg-light" onSubmit={handleSubmit}>
      <h6>Account Form</h6>
      <div>
        <span>
          Required: <small className="text-danger">*</small>
        </span>
      </div>
      <div className="form-group">
        <select
          value={inputDetails.type}
          onChange={(e) => {
            setInputDetails({
              ...inputDetails,
              type: e.target.value,
            });
          }}
        >
          <option value={2}>Employee</option>
          <option value={3}>Client</option>
        </select>
      </div>
      <div className="mt-1 form-group d-flex flex-column position-relative">
        <input
          type="text"
          className="form-control"
          placeholder="First name..."
          value={inputDetails.firstName}
          onChange={(e) => {
            setInputDetails({
              ...inputDetails,
              firstName: e.target.value,
            });
          }}
        />
        <small className="position-absolute text-danger top-0 end-0 me-2">
          *
        </small>
      </div>
      <div className="mt-1 form-group d-flex flex-column position-relative">
        <input
          type="text"
          className="form-control"
          placeholder="Last name..."
          value={inputDetails.lastName}
          onChange={(e) => {
            setInputDetails({
              ...inputDetails,
              lastName: e.target.value,
            });
          }}
        />
        <small className="position-absolute text-danger top-0 end-0 me-2">
          *
        </small>
      </div>{" "}
      <div className="form-group mt-2 d-flex flex-row justify-content-start ps-1">
        <label className="me-3 text-muted">Sex: </label>
        <div className="form-group mx-2 ">
          <input
            type="radio"
            id="radioFemale"
            checked={inputDetails.sex === 0 ? true : false}
            onChange={(e) => {
              setInputDetails({
                ...inputDetails,
                sex: e.target.checked ? 0 : 1,
              });
            }}
          />
          <label htmlFor="radioFemale" style={{ zIndex: "1" }}>
            Female
          </label>
        </div>
        <div className="form-group mx-2">
          <input
            type="radio"
            id="radioMale"
            checked={inputDetails.sex === 1 ? true : false}
            onChange={(e) => {
              setInputDetails({
                ...inputDetails,
                sex: e.target.checked ? 1 : 0,
              });
            }}
          />
          <label htmlFor="radioMale">Male</label>
        </div>
      </div>
      <div className="mt-1 form-group d-flex flex-column position-relative">
        <input
          type="text"
          className="form-control"
          placeholder="Title... e.g: MIT, CSS, MB"
          value={inputDetails.title}
          onChange={(e) => {
            setInputDetails({
              ...inputDetails,
              title: e.target.value,
            });
          }}
        />
      </div>
      <div className="mt-1 form-group d-flex flex-column position-relative">
        <input
          type="text"
          className="form-control"
          placeholder="Specialization..."
          value={inputDetails.specialization}
          onChange={(e) => {
            setInputDetails({
              ...inputDetails,
              specialization: e.target.value,
            });
          }}
        />
      </div>
      <hr />
      <div className="mt-1 form-group d-flex flex-column position-relative">
        <input
          type="text"
          className="form-control"
          placeholder="Username..."
          value={inputDetails.username}
          onChange={(e) => {
            setInputDetails({
              ...inputDetails,
              username: e.target.value,
            });
          }}
        />
        <small className="position-absolute text-danger top-0 end-0 me-2">
          *
        </small>
        <small className="text-muted text-start px-3">
          Minimum character length: 5
        </small>
      </div>
      <div className="mt-1 form-group d-flex flex-column position-relative">
        <input
          type="email"
          className="form-control"
          placeholder="Email..."
          value={inputDetails.email}
          onChange={(e) => {
            setInputDetails({
              ...inputDetails,
              email: e.target.value,
            });
          }}
        />
        <small className="position-absolute text-danger top-0 end-0 me-2">
          *
        </small>
      </div>
      <button type="submit" className="btn btn-primary mt-3 w-100">
        {formData.submitText}
      </button>
    </form>
  );
};
export default AccountForm;
