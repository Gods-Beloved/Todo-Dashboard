// import styles from "./Dashboard.module.scss";
import useTasks from "../hooks/useTasks";
import Header from "../components/Header/Header";
import TaskInput from "../components/TaskInput/TaskInput";
import TaskList from "../components/TaskList/TaskList";

const Dashboard = () => {
  const { tasks, addTask, toggleTaskCompletion, deleteTask, setFilter } =
    useTasks();

  return (
    <div>
      <Header />
      <TaskInput onAddTask={addTask} />
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>
      <TaskList
        tasks={tasks}
        onToggleCompletion={toggleTaskCompletion}
        onDeleteTask={deleteTask}
      />
    </div>
  );
};

export default Dashboard;
