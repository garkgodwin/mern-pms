import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//?API
import { fetchTeamById, createTeam, updateTeam } from "../../api/teamAPI";

//?SWEETALERT
import swal from "sweetalert";

const TeamForm = ({ teamId = 0, setTeamId }) => {
  const history = useHistory();
  const [inputDetails, setInputDetails] = useState({
    teamName: "",
    description: "",
  });
  const [formData, setFormData] = useState({
    buttonText: "Create",
  });

  useEffect(() => {
    handleOnMount();
    return () => {
      setTeamId(0);
    };
  }, []);
  const handleOnMount = async () => {
    if (teamId === 0) {
      setFormData({
        ...formData,
        buttonText: "Create",
      });
    } else {
      const result = await fetchTeamById(teamId);
      if (result.isSuccess) {
        setInputDetails(result.data);
        setFormData({
          ...formData,
          buttonText: "Update",
        });
      } else {
        if (result.tokenIsInvalid) {
          history.push("/login");
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (teamId === 0) {
      const result = await createTeam(inputDetails);
      const SYSTEM_MESSAGE = "System Message";
      if (result.isSuccess) {
        swal({
          title: SYSTEM_MESSAGE,
          text: result.message,
          icon: "success",
          button: "Ok",
        }).then((value) => {
          history.push("/teams");
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
    } else {
      const result = await updateTeam(teamId, inputDetails);
      const SYSTEM_MESSAGE = "System Message";
      if (result.isSuccess) {
        swal({
          title: SYSTEM_MESSAGE,
          text: result.message,
          icon: "success",
          button: "Ok",
        }).then((value) => {
          history.push("/teams");
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
    }
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h5 className="text-light ">Team Form</h5>

      <form
        onSubmit={handleSubmit}
        className="form w-50 px-5 pb-5 pt-3  mb-5 bg-light card shadow"
      >
        <div>
          <span>
            Required: <small className="text-danger">*</small>
          </span>
        </div>
        <div className="mt-1 form-group d-flex flex-column position-relative">
          <small className="position-absolute text-danger top-0 end-0 me-2">
            *
          </small>
          <input
            type="text"
            className="form-control"
            placeholder="Team name..."
            value={inputDetails.teamName}
            onChange={(e) => {
              setInputDetails({
                ...inputDetails,
                teamName: e.target.value,
              });
            }}
          />
          <small className="text-muted px-3 text-start">
            Minimum characters length: 3
          </small>
        </div>
        <div className="mt-1 form-group d-flex flex-column position-relative">
          <input
            type="text"
            className="form-control"
            placeholder="Description..."
            value={inputDetails.description}
            onChange={(e) => {
              setInputDetails({
                ...inputDetails,
                description: e.target.value,
              });
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3 w-100">
          {formData.buttonText}
        </button>
      </form>
    </div>
  );
};

export default TeamForm;
