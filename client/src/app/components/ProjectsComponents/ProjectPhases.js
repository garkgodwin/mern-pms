import React, { useState, useEffect } from "react";

//?API
import { updateProjectPhase } from "../../api/projectAPI";
//?spinner
import SyncLoader from "react-spinners/SyncLoader";

const ProjectPhases = ({ project }) => {
  const projectId = project.id;
  const [isLoading, setIsLoading] = useState(false);
  const [phase, setPhase] = useState({
    initial: false,
    plan: false,
    execute: false,
    monitor: false,
    close: false,
  });
  useEffect(() => {
    setPhase({
      initial: project.initialized,
      plan: project.planned,
      execute: project.executed,
      monitor: project.monitoredControlled,
      close: project.closed,
    });
  }, []);

  const handleInitialChange = async (e) => {
    const checked = e.target.checked;
    setIsLoading(true);
    let oldValue = phase;
    oldValue = {
      ...oldValue,
      initial: checked,
    };
    const result = await updateProjectPhase(project.id, oldValue);
    if (result.isSuccess) {
      setPhase(oldValue);
    } else {
      console.log("failed");
    }
    setIsLoading(false);
  };
  const handlePlanChange = async (e) => {
    const checked = e.target.checked;
    setIsLoading(true);
    let oldValue = phase;
    oldValue = {
      ...oldValue,
      plan: checked,
    };
    const result = await updateProjectPhase(project.id, oldValue);
    if (result.isSuccess) {
      setPhase(oldValue);
    } else {
      console.log("failed");
    }
    setIsLoading(false);
  };
  const handleExecuteChange = async (e) => {
    const checked = e.target.checked;
    setIsLoading(true);
    let oldValue = phase;
    oldValue = {
      ...oldValue,
      execute: checked,
    };
    const result = await updateProjectPhase(project.id, oldValue);
    if (result.isSuccess) {
      setPhase(oldValue);
    } else {
      console.log("failed");
    }
    setIsLoading(false);
  };
  const handleMonitorChange = async (e) => {
    const checked = e.target.checked;
    setIsLoading(true);
    let oldValue = phase;
    oldValue = {
      ...oldValue,
      monitor: checked,
    };
    const result = await updateProjectPhase(project.id, oldValue);
    if (result.isSuccess) {
      setPhase(oldValue);
    } else {
      console.log("failed");
    }
    setIsLoading(false);
  };
  const handleCloseChange = async (e) => {
    const checked = e.target.checked;
    setIsLoading(true);
    let oldValue = phase;
    oldValue = {
      ...oldValue,
      close: checked,
    };
    const result = await updateProjectPhase(project.id, oldValue);
    if (result.isSuccess) {
      setPhase(oldValue);
    } else {
      console.log("failed");
    }
    setIsLoading(false);
  };

  return (
    <div className="d-flex flex-column position-relative">
      {isLoading && (
        <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
          <SyncLoader loading={isLoading} size={25} color={"rgb(50,150,100)"} />
        </div>
      )}
      <h6>Phases</h6>
      <div className="row justify-content-center px-5">
        <div className="col-auto form-group">
          <input
            type="checkbox"
            className="form-check-input me-2"
            id={`checkInitial${projectId}`}
            checked={phase.initial}
            onChange={(e) => {
              handleInitialChange(e);
            }}
          />
          <label
            htmlFor={`checkInitial${projectId}`}
            className="form-check-label"
          >
            Initial Phase
          </label>
        </div>
        <div className="col-auto form-group">
          <input
            type="checkbox"
            className="form-check-input me-2"
            id={`checkPlan${projectId}`}
            checked={phase.plan}
            onChange={(e) => {
              handlePlanChange(e);
            }}
          />
          <label htmlFor={`checkPlan${projectId}`} className="form-check-label">
            Planning Phase
          </label>
        </div>
        <div className="col-auto form-group">
          <input
            type="checkbox"
            className="form-check-input me-2"
            id={`checkExecute${projectId}`}
            checked={phase.execute}
            onChange={(e) => {
              handleExecuteChange(e);
            }}
          />
          <label
            htmlFor={`checkExecute${projectId}`}
            className="form-check-label"
          >
            Execution Phase
          </label>
        </div>
        <div className="col-auto form-group">
          <input
            type="checkbox"
            className="form-check-input me-2"
            id={`checkMonitor${projectId}`}
            checked={phase.monitor}
            onChange={(e) => {
              handleMonitorChange(e);
            }}
          />
          <label
            htmlFor={`checkMonitor${projectId}`}
            className="form-check-label"
          >
            Monitoring and Controlling Phase
          </label>
        </div>
        <div className="col-auto form-group">
          <input
            type="checkbox"
            className="form-check-input me-2"
            id={`checkClose${projectId}`}
            checked={phase.close}
            onChange={(e) => {
              handleCloseChange(e);
            }}
          />
          <label
            htmlFor={`checkClose${projectId}`}
            className="form-check-label"
          >
            Closing Phase
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProjectPhases;
