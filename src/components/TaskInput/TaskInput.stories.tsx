import { Meta, StoryFn } from "@storybook/react";
import TaskInput from "./TaskInput";

interface TaskInputProps {
  onAddTask: (task: string) => void;
}

export default {
  title: "Components/TaskInput",
  component: TaskInput, //
} as Meta;

// Template for the TaskInput story
const Template: StoryFn<TaskInputProps> = (args) => <TaskInput {...args} />;

// Define the stories
export const Default = Template.bind({});
Default.args = {
  onAddTask: (task: string) => alert(`Task added: ${task}`), // Default handler
};
