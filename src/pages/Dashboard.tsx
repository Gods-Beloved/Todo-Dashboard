// import styles from "./Dashboard.module.scss";
import useTasks from "../hooks/useTasks";
import Header from "../components/Header/Header";
import TaskInput from "../components/TaskInput/TaskInput";
import TaskList from "../components/TaskList/TaskList";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const {
    tasks,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    setFilter,
    filter,
  } = useTasks();

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <TaskInput onAddTask={addTask} />

        <div className={styles.filterButtons}>
          <button
            className={filter === "all" ? styles.active : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "completed" ? styles.active : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={filter === "pending" ? styles.active : ""}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
        </div>
        <div className={styles.taskList}>
          <TaskList
            tasks={tasks}
            onToggleCompletion={toggleTaskCompletion}
            onDeleteTask={deleteTask}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
