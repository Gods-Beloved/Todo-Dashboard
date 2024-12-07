import { useState } from "react";
import styles from "./TaskInput.module.scss";

interface TaskInputProps {
  onAddTask: (title: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleAddTask = () => {
    if (taskTitle.trim() === "") return;
    onAddTask(taskTitle);
    setTaskTitle("");
  };

  return (
    <div className={styles.taskInput}>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Enter a task"
      />
      <button className={styles.addButton} onClick={handleAddTask}>
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;
