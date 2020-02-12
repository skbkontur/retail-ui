import React from 'react';
import { storiesOf } from '@storybook/react';

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
  }
}

storiesOf('Switcher', module)
  .add('horizontal', () => {
    return <Component items={['One', 'Two', 'Three']} />;
  })
  .add('errored', () => {
    return <Component error items={['One', 'Two', 'Three']} />;
  });
