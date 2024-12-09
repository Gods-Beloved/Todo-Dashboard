import { useEffect, useState } from "react";
import {
  addTaskToDB,
  getTasksFromDB,
  updateTaskInDB,
  deleteTaskFromDB,
} from "../utils/indexedDb.js";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  useEffect(() => {
    // Load tasks from IndexedDB on mount
    const fetchTasks = async () => {
      const storedTasks = await getTasksFromDB();
      setTasks(storedTasks || []);
    };
    fetchTasks();
  }, []);

  const addTask = async (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
    await addTaskToDB(newTask);
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      const localUpdatedTask = updatedTasks.find((task) => task.id === id);
      if (localUpdatedTask) updateTaskInDB(localUpdatedTask); // Update in IndexedDB
      return updatedTasks;
    });
  };

  const deleteTask = async (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    await deleteTaskFromDB(id);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // 'all'
  });

  return {
    tasks: filteredTasks,
    setTasks,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    setFilter,
    filter,
  };
};

export default useTasks;
