import { useState } from "react";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  return { tasks, addTask };
};

export default useTasks;
