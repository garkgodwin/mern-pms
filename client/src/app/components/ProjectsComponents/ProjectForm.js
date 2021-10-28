import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//?API
import {
  createProject,
  updateProject,
  fetchProjectById,
} from "../../api/projectAPI";
import { fetchAllAccountsByType } from "../../api/accountAPI";
import { fetchAllTeams } from "../../api/teamAPI";

//?SWEETALERT
import swal from "sweetalert";

//?MOMENT
import moment from "moment";

const ProjectForm = ({ type, projectId = 0, setProjectId }) => {
  const SYSTEM_MESSAGE = "System Message";
  const history = useHistory();
  const [inputDetails, setInputDetails] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    accountId: 0,
    teamId: 0,
  });

  const [clients, setClients] = useState([]);
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({
    submitText: "Create",
  });

  useEffect(() => {
    handleOnMount();
    return () => {
      setProjectId(0);
    };
  }, []);

  const handleOnMount = async () => {
    getClients();
    getTeams();
    if (projectId !== 0) {
      const result = await fetchProjectById(projectId);
      if (result.isSuccess) {
        const data = result.data;
        const startDate = moment(new Date(data.startDate)).format("YYYY-MM-DD");
        const endDate = moment(new Date(data.endDate)).format("YYYY-MM-DD");
        setInputDetails({
          title: data.title,
          description: data.description,
          startDate: startDate,
          endDate: endDate,
          accountId: data.accountId,
          teamId: data.teamId,
        });
      } else {
        history.push("/projects");
      }
      setFormData({
        submitText: "Update",
      });
    } else {
      setFormData({
        submitText: "Create",
      });
    }
  };

  const getClients = async () => {
    const TYPE = 3;
    const result = await fetchAllAccountsByType(TYPE);
    if (result.isSuccess) {
      setClients(result.data);
    } else {
      setClients([]);
    }
  };
  const getTeams = async () => {
    const result = await fetchAllTeams();
    if (result.isSuccess) {
      setTeams(result.data);
    } else {
      setTeams([]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectId === 0) {
      create();
    } else {
      update();
    }
  };

  const create = async () => {
    const result = await createProject(inputDetails);
    swal({
      title: SYSTEM_MESSAGE,
      text: result.message,
      icon: result.isSuccess
        ? "success"
        : result.isFailure
        ? "info"
        : result.isInvalid
        ? "warning"
        : result.isError
        ? "error"
        : "info",
      button: "Ok",
    }).then((value) => {
      if (result.isSuccess) {
        history.push("/projects");
      }
    });
  };

  const update = async () => {
    const result = await updateProject(projectId, inputDetails);
    swal({
      title: SYSTEM_MESSAGE,
      text: result.message,

      icon: result.isSuccess
        ? "success"
        : result.isFailure
        ? "info"
        : result.isInvalid
        ? "warning"
        : result.isError
        ? "error"
        : "info",
      button: "Ok",
    }).then((value) => {
      if (result.isSuccess) {
        history.push("/projects");
      }
    });
  };

  return (
    <form
      className="form card shadow p-5 w-auto bg-light"
      onSubmit={handleSubmit}
    >
      <h6>Project Form</h6>
      <div>
        <span>
          Required: <small className="text-danger">*</small>
        </span>
      </div>

      <div className="mt-1 form-group d-flex flex-column position-relative">
        <input
          type="text"
          className="form-control"
          placeholder="Project title..."
          value={inputDetails.title}
          onChange={(e) => {
            setInputDetails({
              ...inputDetails,
              title: e.target.value,
            });
          }}
        />
        <small className="text-muted text-start ms-2">
          Character length must be greater than or equal 3 and less than or
          equal to 99
        </small>
        <small className="position-absolute text-danger top-0 end-0 me-2">
          *
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
      <div className="mt-1 form-group d-flex flex-column position-relative">
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            className="form-control"
            value={inputDetails.startDate}
            onChange={(e) => {
              setInputDetails({
                ...inputDetails,
                startDate: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            className="form-control"
            value={inputDetails.endDate}
            onChange={(e) => {
              setInputDetails({
                ...inputDetails,
                endDate: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <hr />
      {type === 1 && (
        <div>
          <div className="mt-1 form-group d-flex flex-column">
            <label>Choose a client: </label>
            {clients.length !== 0 ? (
              <select
                value={inputDetails.accountId || 0}
                onChange={(e) => {
                  setInputDetails({
                    ...inputDetails,
                    accountId: e.target.value,
                  });
                }}
              >
                <option value={0}>
                  Please select a client for this project...
                </option>
                {clients.map((client) => {
                  const fullName =
                    (client.sex === 1 ? "Mr. " : "Ms. ") +
                    client.firstName +
                    " " +
                    client.lastName;
                  return (
                    <option key={client.id} value={client.id}>
                      {fullName}
                    </option>
                  );
                })}
              </select>
            ) : (
              <small>No client found.</small>
            )}
          </div>
          <div className="mt-1 form-group d-flex flex-column">
            <label>Choose a team: </label>
            {teams.length !== 0 ? (
              <select
                value={inputDetails.teamId || 0}
                onChange={(e) => {
                  setInputDetails({
                    ...inputDetails,
                    teamId: e.target.value,
                  });
                }}
              >
                <option value={0}>
                  Please select a team for this project...
                </option>
                {teams.map((team) => {
                  const teamName = team.teamName;
                  return (
                    <option key={team.id} value={team.id}>
                      {teamName}
                    </option>
                  );
                })}
              </select>
            ) : (
              <small>No Team found.</small>
            )}
          </div>
        </div>
      )}
      <button type="submit" className="btn btn-primary mt-3 w-100">
        {formData.submitText}
      </button>
    </form>
  );
};

export default ProjectForm;
