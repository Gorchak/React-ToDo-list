import { useState, useEffect, useRef } from "react";
import TodoList from "../TodoList/TodoList";
import { Button, Modal, TextInput, Group } from "@mantine/core";
import { MantineProvider, ColorSchemeProvider, ColorScheme } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

import "@mantine/core/styles.css";
import "./board.css";

export default function Board(props) {
  const [backlogList, setBacklogList] = useState([]);
  const [activeList, setActiveList] = useState([]);
  const [finishedList, setFinishedList] = useState([]);

  // for modal
  const [opened, setOpened] = useState(false);
  const taskTitle = useRef("");
  const taskSummary = useRef("");
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const [taskList, setTaskList] = useState([
    { id: 1, title: "Style fixes", text: "Fix problem with responsive", status: 0 },
    { id: 2, title: "Create footer", text: "Create footer component for landing page", status: 1 },
    { id: 3, title: "Dialog window", text: "Create new dialog window for registration page", status: 1 },
    { id: 4, title: "Card for new items", text: "Create element for new items on shop page", status: 2 },
  ]);

  const handleListhange = (updatedTask) => {
    const updatedTaskList = taskList.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      }
      return task;
    });
    setTaskList(updatedTaskList);
    formatTaskList(updatedTaskList);
  };

  function loadTasks() {
    let loadedTasks = localStorage.getItem("tasks");
    let tasks = JSON.parse(loadedTasks);
    if (tasks) {
      setTaskList(tasks);
      formatTaskList(tasks);
    } else {
      formatTaskList(taskList);
    }
  }

  function createTask() {
    let newTask = {
      id: generateTaskID(taskList),
      title: taskTitle.current.value,
      text: taskSummary.current.value,
      status: 0,
    };
    taskList.push(newTask);
    handleListhange(newTask);
    setTaskList(taskList);
    saveTasks([...taskList]);
    taskTitle.current.value = "";
    taskSummary.current.value = "";
  }

  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function generateTaskID(tasks) {
    let newID = tasks.length + 1;
    if (tasks.find((task) => task.id === newID)) {
      newID++;
    }
    return newID;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      loadTasks();
    }, 1000);

    return () => clearInterval(interval);
  }, [backlogList, activeList, finishedList, taskList, setTaskList]);

  const removeTask = (deletedTask) => {
    var clonedTasks = [...taskList];
    const deletedTaskID = clonedTasks.indexOf(deletedTask);
    clonedTasks.splice(deletedTaskID, 1);
    setTaskList(clonedTasks);
    formatTaskList(clonedTasks);
    saveTasks([...clonedTasks]);
  };

  const formatTaskList = (tasks) => {
    const newBacklogList = [];
    const newActiveList = [];
    const newFinishedList = [];
    for (let i = 0; i < tasks.length; i++) {
      switch (tasks[i].status) {
        case 0:
          newBacklogList.push(tasks[i]);
          break;
        case 1:
          newActiveList.push(tasks[i]);
          break;
        case 2:
          newFinishedList.push(tasks[i]);
          break;
        default:
          break;
      }
    }
    setBacklogList(newBacklogList);
    setActiveList(newActiveList);
    setFinishedList(newFinishedList);
    saveTasks([...tasks]);
  };

  return (
    <>
      <Modal
        opened={opened}
        size={"md"}
        title={"New Task"}
        withCloseButton={false}
        onClose={() => {
          setOpened(false);
        }}
        centered
      >
        <TextInput mt={"md"} ref={taskTitle} placeholder={"Task Title"} required label={"Title"} />
        <TextInput ref={taskSummary} mt={"md"} placeholder={"Task Summary"} label={"Summary"} />
        <Group mt={"md"} position={"apart"}>
          <Button
            onClick={() => {
              setOpened(false);
            }}
            variant={"subtle"}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              createTask();
              setOpened(false);
            }}
          >
            Create Task
          </Button>
        </Group>
      </Modal>

      <Button
        onClick={() => {
          setOpened(true);
        }}
        className="newtask-btn"
        mt={"md"}
      >
        New Task
      </Button>
      <div class="list-container">
        <TodoList tasks={backlogList} listType="backlog" updateList={handleListhange} deleteItem={removeTask} />
        <TodoList tasks={activeList} listType="active" updateList={handleListhange} deleteItem={removeTask} />
        <TodoList tasks={finishedList} listType="finished" updateList={handleListhange} deleteItem={removeTask} />
      </div>
    </>
  );
}
