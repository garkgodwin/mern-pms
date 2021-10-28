import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchProjectsByTeamId } from "../../api/projectAPI";
import { createTask, fetchTaskById, updateTask } from "../../api/taskAPI";
import { fetchMembersByTeamId } from "../../api/teamAPI";

//?SWEETALERT
import swal from "sweetalert";

//?MOMENT
import moment from "moment";

const TaskForm = ({ teamId, taskId, setTaskId }) => {
  const SYSTEM_MESSAGE = "System Message";
  const history = useHistory();
  //?chooose project for the task
  //?choose team - which is the teamId prop for the task
  //?task title
  //?description
  const [inputDetails, setInputDetails] = useState({
    task: "",
    description: "",
    startDate: "",
    endDate: "",
    projectId: 0, //!required fk
    teamMemberId: 0, //? ok to be null || 0
    category: 1,
  });
  const [formData, setFormData] = useState({
    submitText: "Create",
  });

  //?projects
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    handleOnMount();
    return () => {
      setTaskId(0);
    };
  }, []);

  const setOptions = async () => {
    const getTeamProjects = await fetchProjectsByTeamId(teamId);
    if (getTeamProjects.isSuccess) {
      setProjects(getTeamProjects.data);
    }
    const getTeamMembers = await fetchMembersByTeamId(teamId);
    if (getTeamMembers.isSuccess) {
      setTeamMembers(getTeamMembers.data);
    }
  };
  const handleOnMount = async () => {
    await setOptions();
    if (taskId !== 0) {
      setFormData({ ...formData, submitText: "Update" });
      const result = await fetchTaskById(taskId);
      if (result.isSuccess) {
        const data = result.data;
        const startDate = moment(new Date(data.startDate)).format("YYYY-MM-DD");
        const endDate = moment(new Date(data.endDate)).format("YYYY-MM-DD");
        setInputDetails({
          task: data.task,
          description: data.description,
          startDate: startDate,
          endDate: endDate,
          projectId: data.projectId,
          teamMemberId: data.teamMemberId === null ? 0 : data.teamMemberId,
          category: data.category,
        });
      } else {
        history.push("/e-tasks");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskId === 0) {
      //create
      create();
    } else {
      //update
      update();
    }
  };
  const create = async () => {
    const result = await createTask(inputDetails);
    if (result) {
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
          setTaskId(0);
          history.push("/e-tasks");
        }
      });
    }
  };
  const update = async () => {
    const result = await updateTask(taskId, inputDetails);
    if (result) {
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
          history.push("/e-tasks");
        }
      });
    }
  };

  return (
    <form className="form shadow p-5 w-auto bg-light" onSubmit={handleSubmit}>
      <h6>Task Form</h6>
      <div>
        <span>
          Required: <small className="text-danger">*</small>
        </span>
      </div>

      <div className="form-group position-relative">
        <small className="position-absolute top-0 end-0 text-danger me-2">
          *
        </small>
        {projects.length === 0 ? (
          <small>No project available.</small>
        ) : (
          <select
            className="form-control"
            value={inputDetails.projectId}
            onChange={(e) => {
              setInputDetails({
                ...inputDetails,
                projectId: e.target.value,
              });
            }}
          >
            <option key={0} value={0}>
              Please select a project.
            </option>
            {projects.map((project) => {
              return (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              );
            })}
          </select>
        )}
      </div>

      <div className="form-group">
        {projects.length === 0 ? (
          <small>No project available.</small>
        ) : (
          <select
            className="form-control"
            value={inputDetails.teamMemberId}
            onChange={(e) => {
              setInputDetails({
                ...inputDetails,
                teamMemberId: e.target.value,
              });
            }}
          >
            <option key={0} value={0}>
              Please select an employee to handle this task.
            </option>
            {teamMembers.map((teamMember) => {
              const account = teamMember.account;
              const fullName =
                (account.sex === 1 ? "Mr. " : "Ms. ") +
                account.firstName +
                " " +
                account.lastName;
              const memberType = teamMember.memberType === 1 ? "| Manager" : "";
              return (
                <option key={teamMember.id} value={teamMember.id}>
                  {fullName} {memberType}
                </option>
              );
            })}
          </select>
        )}
      </div>

      <div className="form-group position-relative">
        <small className="position-absolute text-danger top-0 end-0 me-2">
          *
        </small>
        <input
          type="text"
          className="form-control"
          placeholder="Task..."
          value={inputDetails.task}
          onChange={(e) => {
            setInputDetails({
              ...inputDetails,
              task: e.target.value,
            });
          }}
        />
      </div>

      <div className="form-group position-relative">
        <input
          type="text"
          className="form-control"
          placeholder="This task's description..."
          value={inputDetails.description}
          onChange={(e) => {
            setInputDetails({
              ...inputDetails,
              description: e.target.value,
            });
          }}
        />
      </div>

      <div>
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
      </div>

      <div className="form-group position-relative">
        <small className="position-absolute top-0 end-0 text-danger me-2">
          *
        </small>
        <label>Phases</label>
        <select
          className="form-control"
          value={inputDetails.category}
          onChange={(e) => {
            setInputDetails({
              ...inputDetails,
              category: e.target.value,
            });
          }}
        >
          <option value={1}>Initialization</option>
          <option value={2}>Planning</option>
          <option value={3}>Execution</option>
          <option value={4}>Monitoring And Controlling</option>
          <option value={5}>Closing</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary mt-3 w-100">
        {formData.submitText}
      </button>
    </form>
  );
};

export default TaskForm;
