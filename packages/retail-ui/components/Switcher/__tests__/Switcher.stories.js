
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Switcher from '../Switcher';

class Component extends React.Component<*, *> {
  state = {
    value: ''
  };

  handleChange(el) {
    this.setState({ value: el.target.value });
  }

  render() {
    return (
      <Switcher
        value={this.state.value}
        onChange={el => this.handleChange(el)}
        label={'Label for Switcher'}
        {...this.props}
      />
    );
  }
}

storiesOf('Switcher', module)
  .add('horizontal', () => {
    return <Component items={['One', 'Two', 'Three']} />;
  })
  .add('errored', () => {
    return <Component error items={['One', 'Two', 'Three']} />;
  });
