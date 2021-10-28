import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//?API
import { activateAccount } from "../../api/accountAPI";

//?COMPONENTS
import FormBox from "./FormBox";

//?SWEETALERT
import swal from "sweetalert";

const Activate = () => {
  const history = useHistory();
  const [activationData, setActivationData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await activateAccount(activationData);
    const SYSTEM_MESSAGE = "System Message";
    const icon = result.isSuccess
      ? "success"
      : result.isFailure
      ? "warning"
      : result.iInvalid
      ? "info"
      : result.isError
      ? "error"
      : "info";
    const text = result.message;
    if (result.isSuccess) {
      swal({
        title: SYSTEM_MESSAGE,
        text: text,
        icon: icon,
        button: "Ok",
      }).then((value) => {
        history.push("/login");
      });
    } else {
      swal({
        title: SYSTEM_MESSAGE,
        text: text,
        icon: icon,
        button: "Ok",
      });
    }
  };
  return (
    <FormBox>
      <h2>Activation Form</h2>
      <small className="text-danger">Required = *</small>
      <form className="form p-3 w-100" onSubmit={handleSubmit}>
        <div className="form-group mt-2 position-relative">
          <small className="text-danger position-absolute end-0 top-0">*</small>
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Please enter your username..."
            value={activationData.username}
            onChange={(e) => {
              setActivationData({
                ...activationData,
                username: e.target.value,
              });
            }}
          />
          <small className="text-muted">Minimum of 5 characters</small>
        </div>
        <div className="form-group mt-2 position-relative">
          <small className="text-danger position-absolute end-0 top-0">*</small>
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Please enter your password..."
            value={activationData.password}
            onChange={(e) => {
              setActivationData({
                ...activationData,
                password: e.target.value,
              });
            }}
          />
          <small className="text-muted">Minimum of 5 characters</small>
        </div>
        <div className="form-group mt-2 position-relative">
          <small className="text-danger position-absolute end-0 top-0">*</small>
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Please enter your password..."
            value={activationData.confirmPassword}
            onChange={(e) => {
              setActivationData({
                ...activationData,
                confirmPassword: e.target.value,
              });
            }}
          />
        </div>
        <div className="form-group mt-2 position-relative">
          <small className="text-danger position-absolute end-0 top-0">*</small>
          <label>OTP</label>
          <input
            type="text"
            className="form-control"
            placeholder="6-character OTP"
            value={activationData.otp}
            onChange={(e) => {
              setActivationData({
                ...activationData,
                otp: e.target.value,
              });
            }}
          />
        </div>
        <button className="btn btn-primary mt-5" type="submit">
          Activate
        </button>
      </form>
    </FormBox>
  );
};

export default Activate;
