import styles from "./TaskList.module.scss";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

interface TaskListProps {
  tasks: Task[];
  onToggleCompletion: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleCompletion,
  onDeleteTask,
}) => (
  <ul className={styles.taskList}>
    {tasks.map((task) => (
      <li key={task.id} className={task.completed ? "completed" : ""}>
        <span>{task.title}</span>

        <div>
          <button onClick={() => onToggleCompletion(task.id)}>
            {task.completed ? "Undo" : "Complete"}
          </button>
          <button onClick={() => onDeleteTask(task.id)}>Delete</button>
        </div>
      </li>
    ))}
  </ul>
);

export default TaskList;
