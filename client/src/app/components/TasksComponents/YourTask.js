import React, { useEffect, useState } from "react";

//?API
import { changeStatus } from "../../api/taskAPI";

//?spinner
import SyncLoader from "react-spinners/SyncLoader";

const setCategoryString = (category) => {
  return category === 1
    ? "Initialization Phase"
    : category === 2
    ? "Planning Phase"
    : category === 3
    ? "Execution Phase"
    : category === 4
    ? "Monitoring And Controlling Phase"
    : category === 5
    ? "Closing Phase"
    : "No phase";
};
const YourTask = ({ task }) => {
  //?TODO: ADD THE TASK UPDATE HERE
  const [taskDetails, setTaskDetails] = useState({
    id: 0,
    task: "",
    description: "",
    startDate: "",
    endDate: "",
    isStarted: false,
    onHold: false,
    isDone: false,
    category: "Initialization",
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const taskTitle = task.task;
    const description =
      task.description === ""
        ? "There is no available description for this task."
        : task.description;
    const startDate = new Date(task.startDate).toDateString();
    const endDate = new Date(task.endDate).toDateString();
    const isStarted = task.isStarted;
    const isDone = task.isDone;
    const onHold = task.onHold;
    const category = task.category;
    setTaskDetails({
      id: task.id,
      task: taskTitle,
      description: description,
      startDate: startDate,
      endDate: endDate,
      isStarted: isStarted,
      isDone: isDone,
      onHold: onHold,
      category: setCategoryString(category),
    });
  }, []);

  const handleChangeStart = async (e) => {
    setIsLoading(true);
    console.log(task.id);
    const result = await changeStatus(task.id, {
      isStarted: e.target.checked,
      isDone: taskDetails.isDone,
      onHolde: taskDetails.onHold,
    });
    if (result.isSuccess) {
      setTaskDetails({
        ...taskDetails,
        isStarted: !taskDetails.isStarted,
      });
    } else {
      setTaskDetails({
        ...taskDetails,
        isStarted: !taskDetails.isStarted,
      });
    }
    setIsLoading(false);
  };
  const handleChangeDone = async (e) => {
    setIsLoading(true);
    const result = await changeStatus(task.id, {
      isStarted: taskDetails.isStarted,
      isDone: e.target.checked,
      onHolde: taskDetails.onHold,
    });
    if (result.isSuccess) {
      setTaskDetails({
        ...taskDetails,
        isDone: !taskDetails.isDone,
      });
    } else {
      setTaskDetails({
        ...taskDetails,
        isDone: !taskDetails.isDone,
      });
    }
    setIsLoading(false);
  };
  const handleChangeHold = async (e) => {
    setIsLoading(true);
    const result = await changeStatus(task.id, {
      isStarted: taskDetails.isStarted,
      isDone: taskDetails.isDone,
      onHolde: e.target.checked,
    });
    if (result.isSuccess) {
      setTaskDetails({
        ...taskDetails,
        onHold: !taskDetails.onHold,
      });
    } else {
      setTaskDetails({
        ...taskDetails,
        onHold: !taskDetails.onHold,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="card p-3 shadow position-relative mt-1">
      <div className="text-start d-flex flex-column">
        <h4 className="m-0">{taskDetails.task}</h4>
        <small className="text-muted">{taskDetails.description}</small>
        <small>Category: {taskDetails.category}</small>
      </div>
      <div
        className="d-flex flex-row justify-content-around mx-3 position-absolute end-0"
        style={{ zIndex: "100" }}
      >
        <div className="bg-dark text-light me-2 p-3  card ">
          <h6 className="w-auto">{task.project.title}</h6>
          <small>Project</small>
        </div>
      </div>
      <hr />
      <div className="d-flex flex-row justify-content-around mb-3">
        <small>Start Date: {taskDetails.startDate}</small>
        <small>End Date: {taskDetails.endDate}</small>
      </div>
      <hr />
      <div className="form d-flex flex-row justify-content-around position-relative">
        {isLoading && (
          <div className="position-absolute w-100 d-flex justify-content-center ">
            <SyncLoader
              isLoading={isLoading}
              size={25}
              color={"rgb(50,150,100)"}
            />
          </div>
        )}
        <div className="form-group">
          <input
            type="checkbox"
            id={`checkStarted${task.id}`}
            checked={taskDetails.isStarted}
            onChange={(e) => {
              handleChangeStart(e);
            }}
          />
          <label htmlFor={`checkStarted${task.id}`}>
            Task has been started.
          </label>
        </div>
        <div className="form-group">
          <input
            type="checkbox"
            id={`checkDone${task.id}`}
            checked={taskDetails.isDone}
            onChange={(e) => {
              handleChangeDone(e);
            }}
          />
          <label htmlFor={`checkDone${task.id}`}>Task is done?</label>
        </div>
        <div className="form-group">
          <input
            type="checkbox"
            id={`checkHold${task.id}`}
            checked={taskDetails.onHold}
            onChange={(e) => {
              handleChangeHold(e);
            }}
          />
          <label htmlFor={`checkHold${task.id}`}>Task is held?</label>
        </div>
      </div>
    </div>
  );
};

export default YourTask;
