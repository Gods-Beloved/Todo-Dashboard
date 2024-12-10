import { renderHook, act } from "@testing-library/react-hooks";
import useTasks from "./useTasks";
import {
  addTaskToDB,
  getTasksFromDB,
  updateTaskInDB,
  deleteTaskFromDB,
} from "../utils/indexedDb";

// Mock IndexedDB utilities
jest.mock("../utils/indexedDb", () => ({
  addTaskToDB: jest.fn(),
  getTasksFromDB: jest.fn(),
  updateTaskInDB: jest.fn(),
  deleteTaskFromDB: jest.fn(),
}));

describe("useTasks hook", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test("initially fetches tasks from IndexedDB", async () => {
    // Mock getTasksFromDB to return a list of tasks
    const mockTasks = [
      { id: "1", title: "New Task", completed: false, createdAt: new Date() },
    ];
    (getTasksFromDB as jest.Mock).mockResolvedValue(mockTasks);

    const { result, waitForNextUpdate } = renderHook(() => useTasks());

    // Wait for the useEffect to complete
    await waitForNextUpdate();

    expect(result.current.tasks).toEqual(mockTasks);
    expect(getTasksFromDB).toHaveBeenCalledTimes(1);
  });

  test("adds a new task", async () => {
    const { result } = renderHook(() => useTasks());

    await act(async () => {
      await result.current.addTask("New Task");
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].title).toBe("New Task");

    expect(addTaskToDB).toHaveBeenCalledWith(
      expect.objectContaining({ title: "New Task" })
    );
  });

  test("toggles task completion", async () => {
    const mockTask = {
      id: "1",
      title: "Task 1",
      completed: false,
      createdAt: new Date(),
    };

    const { result } = renderHook(() => useTasks());
    act(() => {
      result.current.setTasks([mockTask]); // Manually set tasks for testing
    });

    act(() => {
      result.current.toggleTaskCompletion("1");
    });

    expect(result.current.tasks[0].completed).toBe(true);
    expect(updateTaskInDB).toHaveBeenCalledWith(
      expect.objectContaining({ id: "1", completed: true })
    );
  });

  test("deletes a task", async () => {
    const mockTask = {
      id: "1",
      title: "Task 1",
      completed: false,
      createdAt: new Date(),
    };

    const { result } = renderHook(() => useTasks());
    act(() => {
      result.current.setTasks([mockTask]);
    });

    await act(async () => {
      await result.current.deleteTask("1");
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(deleteTaskFromDB).toHaveBeenCalledWith("1");
  });

  test("filters tasks correctly", () => {
    const mockTasks = [
      { id: "1", title: "Task 1", completed: false, createdAt: new Date() },
      { id: "2", title: "Task 2", completed: true, createdAt: new Date() },
    ];

    const { result } = renderHook(() => useTasks());
    act(() => {
      result.current.setTasks(mockTasks);
    });

    act(() => {
      result.current.setFilter("completed");
    });

    expect(result.current.tasks).toEqual([mockTasks[1]]);
  });
});
