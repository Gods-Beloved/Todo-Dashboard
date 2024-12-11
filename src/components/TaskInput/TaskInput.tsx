import { useState } from "react";
import styles from "./TaskInput.module.scss";

interface TaskInputProps {
  onAddTask: (title: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim() === "") return alert("Task cannot be empty");
    onAddTask(taskTitle);
    setTaskTitle("");
  };

  return (
    <form onSubmit={handleAddTask} className={styles.taskInput}>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Enter a task"
      />
      <button className={styles.addButton} onClick={handleAddTask}>
        Add Task
      </button>
    </form>
  );
};

export default TaskInput;
