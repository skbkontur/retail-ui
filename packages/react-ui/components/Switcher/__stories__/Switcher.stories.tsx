import React from 'react';

import { Switcher } from '../Switcher';

class Component extends React.Component<{ items: string[]; error?: boolean }, { value: string }> {
  public state = {
    value: '',
  };

  public render() {
    return (
      <Switcher
        value={this.state.value}
        onValueChange={this.handleChange}
        label={'Label for Switcher'}
        {...this.props}
      />
    );
  }

  private handleChange = (value: string) => {
    this.setState({ value });
  };
}

export default { title: 'Switcher' };

export const Horizontal = () => {
  return <Component items={['One', 'Two', 'Three']} />;
};
Horizontal.story = { name: 'horizontal' };

export const Errored = () => {
  return <Component error items={['One', 'Two', 'Three']} />;
};
Errored.story = { name: 'errored' };
