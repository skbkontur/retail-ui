import React from 'react';
import { Meta, Story } from '../../../typings/stories';

import { Toast, Button } from '@skbkontur/react-ui';

export default {
  title: 'Overlay/Toast',
  component: Toast,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {

  function showComplexNotification() {
    Toast.push('Successfully saved', {
      label: 'Cancel',
      handler: () => Toast.push('Canceled'),
    });
  }

  return (
    <Button onClick={showComplexNotification}>Show notification</Button>
  );

};
Example1.storyName = 'Вызов статических методов';

export const Example2: Story = () => {

  function showComplexNotification() {
    Toast.push('Successfully saved', {
      label: 'Cancel',
      handler: () => Toast.push('Canceled'),
    }, 15000);
  }

  return (
    <Button onClick={showComplexNotification}>Show notification</Button>
  );

};
Example2.storyName = 'Кастомный showTime';

export const Example3: Story = () => {

  function showComplexNotification() {
    Toast.push('Successfully saved', null, 15000);
  }

  return (
    <Button onClick={showComplexNotification}>Show notification</Button>
  );

};
Example3.storyName = 'Кастомный showTime без action';

export const Example4: Story = () => {

  class Toaster extends React.Component {
    showNotification() {
      this.notifier.push('Successfully');
    }

    render() {
      return (
        <div>
          <Toast
            ref={el => {
              this.notifier = el;
            }}
          />
          <Button onClick={() => this.showNotification()}>Show notification</Button>
        </div>
      );
    }
  }

  return (
    <Toaster />
  );

};
Example4.storyName = 'Использование `ref`';

