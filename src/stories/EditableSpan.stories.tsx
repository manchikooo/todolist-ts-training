import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import EditableSpan from "../components/EditableSpan";

export default {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    args: {
        value: 'Test editable span',
        onChange: action('tried to change'),
    }
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});
EditableSpanStory.args = {
}