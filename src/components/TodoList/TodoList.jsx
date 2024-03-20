import React, { useState, useEffect } from "react";
import Task from "../task/task";
import "./todolist.css";

export default function ToDoList(props) {
  const { tasks, listType, updateList, deleteItem } = props;
  const [title, setTitle] = useState("TODO LIST");

  useEffect(() => {
    setListTitle(listType);
  }, [tasks]);

  const setListTitle = (listTitle) => {
    if (listTitle === "backlog") {
      setTitle("Planned");
    } else if (listTitle === "active") {
      setTitle("Active");
    } else if (listTitle === "finished") {
      setTitle("Completed");
    }
  };

  const handleStatusChange = (updatedTask) => {
    updateList(updatedTask);
  };

  const deleteTask = (removedTask) => {
    console.log("removedTask", removedTask);
    deleteItem(removedTask);
  };

  return (
    <>
      <div class="row-element">
        <h2>{title}</h2>

        {tasks.map((item) => (
          <div class="task-body" key={item.id}>
            <Task task={item} onStatusChange={handleStatusChange} onDeleteTask={deleteTask} />
          </div>
        ))}
      </div>
    </>
  );
}
