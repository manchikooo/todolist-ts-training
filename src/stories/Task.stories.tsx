import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from "../Task";
import {action} from "@storybook/addon-actions";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/Task',
    component: Task,
    args: {
        changeTaskStatus: action('change status'),
        changeTaskTitle: action('change title'),
        removeTask: action('remove task'),
        todolistId: 'todolistId2'
    }
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
    task: {id:'1',title: 'JS', isDone: true},
}

export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
    task: {id:'2',title: 'CSS', isDone: false},
}