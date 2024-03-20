import { useState, useEffect } from "react";
import { Button } from "@mantine/core";
import "./task.css";

export default function Task(props) {
  const { task, onStatusChange, onDeleteTask } = props;
  const [currentTask, setCurrentTask] = useState(task);

  const [backButtonTitle, setBackButton] = useState(false);
  const [nextButtonTitle, setNexButton] = useState(false);

  const changeTaskStatus = (task, actionType) => {
    let updatedTask;

    switch (true) {
      case currentTask.status < 2 && actionType === "next":
        updatedTask = { ...currentTask, status: currentTask.status + 1 };
        setCurrentTask(updatedTask);
        break;
      case currentTask.status > 0 && actionType === "revert":
        updatedTask = { ...currentTask, status: currentTask.status - 1 };
        setCurrentTask(updatedTask);
        break;
      default:
        break;
    }
    onStatusChange(updatedTask);
  };

  const deleteTask = (task) => {
    onDeleteTask(task);
  };

  useEffect(() => {
    setButtonsTitles(task)
  }, [setBackButton, setNexButton]);

  const setButtonsTitles = (task) => {
    switch (task.status) {
      case 0:
        setNexButton('To active')
        break;
      case 1:
        setNexButton('Done')
        setBackButton('Backlog')
        break;
      case 2:
        setBackButton('To active')
        break;
      default:
        break;
    }
  }


  return (
    <>
      <div class="task-item">
        <div class="task-content-row">
          <div class="delete-btn-container">
            <Button
              onClick={() => {
                deleteTask(task);
              }}
              color="red"
            >
              X
            </Button>
          </div>
          <div class="task-info">
            <div class="task-title">{task.title}</div>
            <div class="task-description">{task.text}</div>
          </div>
        </div>

        <div class="task-actions">
          {task.status > 0 && (
            <Button onClick={() => changeTaskStatus(task, "revert")} variant={"subtle"}>
              {backButtonTitle}
            </Button>
          )}
          {task.status < 2 && <Button onClick={() => changeTaskStatus(task, "next")}>{nextButtonTitle}</Button>}
        </div>
      </div>
    </>
  );
}
