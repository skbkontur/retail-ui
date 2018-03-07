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
  ))
  .add('with big renderItem width', () => (
    <UncontrolledAutocomplete
      source={['One', 'Two', 'Three']}
      renderItem={x => (
        <div style={{ width: 400 }}>Item: {x.toUpperCase()}</div>
      )}
    />
  ))
  .add('with fixed menu size', () => (
    <UncontrolledAutocomplete
      source={[
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed.',
        'Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh.',
        'Donec lacus nunc, viverra nec.',
        'Sed lectus. Integer euismod lacus luctus magna.',
        'Suspendisse potenti.',
        ' Sed dignissim lacinia nunc.'
      ]}
      renderItem={x => <div>{x}</div>}
      menuWidth={400}
      menuMaxHeight={150}
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
        onChange={(_, value) => {
          this.setState({ value });
        }}
      />
    );
  }
}
