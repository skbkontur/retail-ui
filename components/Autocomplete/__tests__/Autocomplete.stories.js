// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Autocomplete from '../Autocomplete';

storiesOf('Autocomplete', module)
  .add('simple', () => (
    <UncontrolledAutocomplete source={['One', 'Two', 'Three']} />
  ))
  .add('with renderItem', () => (
    <UncontrolledAutocomplete
      source={['One', 'Two', 'Three']}
      renderItem={x => <div>Item: {x.toUpperCase()}</div>}
    />
  ));

class UncontrolledAutocomplete extends React.Component<*, *> {
  state = {
    value: ''
  };
  render() {
    return (
      <Autocomplete
        {...this.props}
        value={this.state.value}
        onChange={(_, value) => this.setState({ value })}
      />
    );
  }
}
