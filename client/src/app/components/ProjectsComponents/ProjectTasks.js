import React, { useState, useEffect } from "react";

//?API
import { fetchProjectTaskCounts } from "../../api/projectAPI";

const ProjectTasks = ({ tasks }) => {
  const [initial, setInitial] = useState({
    count: 0,
    started: 0,
    held: 0,
    done: 0,
  });
  const [plan, setPlan] = useState({
    count: 0,
    started: 0,
    held: 0,
    done: 0,
  });
  const [execute, setExecute] = useState({
    count: 0,
    started: 0,
    held: 0,
    done: 0,
  });
  const [monitor, setMonitor] = useState({
    count: 0,
    started: 0,
    held: 0,
    done: 0,
  });
  const [close, setClose] = useState({
    count: 0,
    started: 0,
    held: 0,
    done: 0,
  });

  useEffect(() => {
    handleOnMount();
    return () => {
      setInitial({
        count: 0,
        started: 0,
        held: 0,
        done: 0,
      });
      setPlan({
        count: 0,
        started: 0,
        held: 0,
        done: 0,
      });
      setExecute({
        count: 0,
        started: 0,
        held: 0,
        done: 0,
      });
      setMonitor({
        count: 0,
        started: 0,
        held: 0,
        done: 0,
      });
      setClose({
        count: 0,
        started: 0,
        held: 0,
        done: 0,
      });
    };
  }, []);
  const handleOnMount = async () => {
    //! THIS IS A SUCCESS! :D add this to other counts
    tasks.map((task) => {
      const category = task.category;
      const started = task.isStarted ? 1 : 0;
      const held = task.onHold ? 1 : 0;
      const done = task.isDone ? 1 : 0;
      switch (category) {
        case 1:
          setInitial({
            count: initial.count + 1,
            started: initial.started + started,
            held: initial.held + held,
            done: initial.done + done,
          });
          break;
        case 2:
          setPlan({
            count: plan.count + 1,
            started: plan.started + started,
            held: plan.held + held,
            done: plan.done + done,
          });
          break;
        case 3:
          setExecute({
            count: execute.count + 1,
            started: execute.started + started,
            held: execute.held + held,
            done: execute.done + done,
          });
          break;
        case 4:
          setMonitor({
            count: monitor.count + 1,
            started: monitor.started + started,
            held: monitor.held + held,
            done: monitor.done + done,
          });
          break;
        case 5:
          setClose({
            count: close.count + 1,
            started: close.started + started,
            held: close.held + held,
            done: close.done + done,
          });
          break;
        default:
          break;
      }
    });
  };
  return (
    <div className="d-flex flex-column justify-content-center">
      <div className="row px-3 justify-content-center align-items-center">
        <div className="col-5 card me-2 mt-1">
          <div className=" p-3">
            <h6 className="p-0 m-0">Initialization Tasks</h6>
            <p className="p-0 m-0">{initial.count}</p>
            <small>Total</small>
          </div>
          <div className="row px-3 bg-dark text-light d-flex justify-content-around">
            <div className="col-auto d-flex flex-column justify-content-center align-items-center w-auto m-0 p-0 ">
              <small>{initial.started}</small>
              <small className="text-muted">Started</small>
            </div>
            <div className="col-auto d-flex flex-column justify-content-center align-items-center w-auto m-0 p-0">
              <small>{initial.held}</small>
              <small className="text-muted">Held</small>
            </div>
            <div className="col-auto d-flex flex-column justify-content-center align-items-center w-auto m-0 p-0 ">
              <small>{initial.done}</small>
              <small className="text-muted">Done</small>
            </div>
          </div>
        </div>
        <div className="col-5 card me-2 mt-1">
          <div className="p-3">
            <h6 className="p-0 m-0">Planning Phase</h6>
            <p className="p-0 m-0">{plan.count}</p>
            <small>Total</small>
          </div>
          <div className="row px-3 bg-dark text-light d-flex justify-content-around">
            <div className="col-auto d-flex flex-column justify-content-center align-items-center w-auto m-0 p-0 ">
              <small>{plan.started}</small>
              <small className="text-muted">Started</small>
            </div>
            <div className="col-auto d-flex flex-column justify-content-center align-items-center w-auto m-0 p-0 ">
              <small>{plan.held}</small>
              <small className="text-muted">Held</small>
            </div>
            <div className="col-auto d-flex flex-column justify-content-center align-items-center w-auto m-0 p-0">
              <small>{plan.done}</small>
              <small className="text-muted">Done</small>
            </div>
          </div>
        </div>
        <div className="col-5 card me-2 mt-1">
          <div className="p-3">
            <h6 className="p-0 m-0">Execution Phase</h6>
            <p className="p-0 m-0">{execute.count}</p>
            <small>Total</small>
          </div>
          <div className="row px-3 bg-dark text-light d-flex justify-content-around">
            <div className="col-auto d-flex flex-column justify-content-center align-items-center w-auto m-0 p-0">
              <small>{execute.started}</small>
              <small className="text-muted">Started</small>
            </div>
            <div className="col-auto d-flex flex-column justify-content-center align-items-center w-auto m-0 p-0 ">
              <small>{execute.held}</small>
              <small className="text-muted">Held</small>
            </div>
            <div className="col-auto d-flex flex-column justify-content-center align-items-center w-auto m-0 p-0 ">
              <small>{execute.done}</small>
              <small className="text-muted">Done</small>
            </div>
          </div>
        </div>
        <div className="col-6 card me-2 mt-1">
          <div className="p-3">
            <h6 className="p-0 m-0">Monitoring and Controlling Phase</h6>
            <p className="p-0 m-0">{monitor.count}</p>
            <small>Total</small>
          </div>
          <div className="row px-3 bg-dark text-light d-flex justify-content-around">
            <div className="col-auto d-flex flex-column justify-content-center align-items-center w-auto m-0 p-0">
              <small>{monitor.started}</small>
              <small className="text-muted">Started</small>
            </div>
            <div className="col-auto d-flex flex-column justify-content-center align-items-center w-auto m-0 p-0">
              <small>{monitor.held}</small>
              <small className="text-muted">Held</small>
            </div>
            <div className="col-auto d-flex flex-column justify-content-center align-items-center w-auto m-0 p-0 ">
              <small>{monitor.done}</small>
              <small className="text-muted">Done</small>
            </div>
          </div>
        </div>
        <div className="col-5 card me-2 mt-1">
          <div className="p-3">
            <h6 className="p-0 m-0">Closing Phase</h6>
            <p className="p-0 m-0">{close.count}</p>
            <small>Total</small>
          </div>
          <div className="row px-3 bg-dark text-light d-flex justify-content-around">
            <div className="col-auto d-flex flex-column justify-content-center align-items-center w-auto m-0 p-0 ">
              <small>{close.started}</small>
              <small className="text-muted">Started</small>
            </div>
            <div className="col-auto d-flex flex-column justify-content-center align-items-center w-auto m-0 p-0">
              <small>{close.held}</small>
              <small className="text-muted">Held</small>
            </div>
            <div className="col-auto d-flex flex-column justify-content-center align-items-center w-auto m-0 p-0 ">
              <small>{close.done}</small>
              <small className="text-muted">Done</small>
            </div>
          </div>
        </div>
      </div>
      <h6 className="mt-2">Tasks</h6>
    </div>
  );
};

export default ProjectTasks;
