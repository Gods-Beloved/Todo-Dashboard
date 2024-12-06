import styles from "./TaskList.module.scss";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => (
  <ul className={styles.taskList}>
    {tasks.map((task) => (
      <li key={task.id} className={task.completed ? styles.completed : ""}>
        {task.title}
      </li>
    ))}
  </ul>
);

export default TaskList;
