import { openDB } from "idb";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

const DB_NAME = "todoApp";
const DB_VERSION = 1;
const STORE_NAME = "tasks";

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
};

export const addTaskToDB = async (task: Task) => {
  const db = await initDB();
  await db.add(STORE_NAME, task);
};

export const getTasksFromDB = async (): Promise<Task[]> => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};

export const updateTaskInDB = async (task: Task) => {
  const db = await initDB();
  await db.put(STORE_NAME, task);
};

export const deleteTaskFromDB = async (id: string) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};
