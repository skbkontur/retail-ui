import React from 'react';
import { action } from '@storybook/addon-actions';
import { ComponentStory } from '@storybook/react';

import { Toast } from '../function/Toast';
import { ToastProvider } from '../function';

export default { title: 'components/ToastView', parameters: { creevey: { skip: [true] } } };

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return <ToastProvider>{children}</ToastProvider>;
};

const Template: ComponentStory<typeof Toast> = (args) => (
  <Wrapper>
    <Toast {...args} />
  </Wrapper>
);

export const SimpleToast = Template.bind({});
SimpleToast.args = {
  id: 1,
  children: 'Changes saved',
};
SimpleToast.storyName = 'simple toast';

export const WithAction = Template.bind({});
WithAction.args = {
  id: 1,
  children: 'Changes saved',
  action: { label: 'Cancel', handler: action('action') },
};
WithAction.storyName = 'with action';
