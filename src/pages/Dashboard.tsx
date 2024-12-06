import styles from "./Dashboard.module.scss";
import useTasks from "../hooks/useTasks";
import Header from "../components/Header/Header";
import TaskInput from "../components/TaskInput/TaskInput";
import TaskList from "../components/TaskList/TaskList";

const Dashboard = () => {
  const { tasks, addTask } = useTasks();

  return (
    <>
      <div className={styles.dashboard}>
        <Header />
        <TaskInput onAddTask={addTask} />
        <TaskList tasks={tasks} />
      </div>
    </>
  );
};

export default Dashboard;
