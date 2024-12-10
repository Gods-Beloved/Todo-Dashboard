import { Meta, StoryFn } from "@storybook/react";
import TaskList from "./TaskList";

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

export default {
  component: TaskList,
  title: "Components/TaskList",
  parameters: {
    docs: {
      description: {
        component:
          "A list of tasks where you can toggle completion and delete tasks.",
      },
    },
  },
} as Meta;

const Template: StoryFn<TaskListProps> = (args) => <TaskList {...args} />;

export const Default = Template.bind({});
Default.args = {
  tasks: [
    {
      id: "1",
      title: "Task 1",
      completed: false,
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Task 2",
      completed: true,
      createdAt: new Date(),
    },
  ],
  onToggleCompletion: (id: string) =>
    alert(`Toggled task completion for ${id}`),
  onDeleteTask: (id: string) => alert(`Deleted task with ID: ${id}`),
};
