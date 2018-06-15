import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Gapped from '../../Gapped/index';
import Autocomplete from '../Autocomplete';

storiesOf('Autocomplete', module).add('simple', () => (
    <UncontrolledAutocomplete source={['One', 'Two', 'Three']} />
  )).add('with renderItem', () => (
    <UncontrolledAutocomplete
      source={['One', 'Two', 'Three']}
      renderItem={x => <div>Item: {x.toUpperCase()}</div>}
    />
  )).add('with big renderItem width', () => (
    <UncontrolledAutocomplete
      source={['One', 'Two', 'Three']}
      renderItem={x => (
        <div style={{ width: 400 }}>Item: {x.toUpperCase()}</div>
      )}
    />
  )).add('with fixed menu size', () => (
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
  )).add('with onBlur/onFocus handlers', () => <WithBlurFocusHandlersExample />);

class UncontrolledAutocomplete extends React.Component<any, any> {
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

class WithBlurFocusHandlersExample extends React.Component<any, any> {
  state = {
    focusCount: 0,
    blurCount: 0
  };
  render() {
    return (
      <Gapped vertical>
        <UncontrolledAutocomplete
          onFocus={() =>
            this.setState(state => ({ focusCount: state.focusCount + 1 }))
          }
          onBlur={() =>
            this.setState(state => ({ blurCount: state.blurCount + 1 }))
          }
          source={'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'.split(
            ' '
          )}
        />
        <span>Focuses count: {this.state.focusCount}</span>
        <span>Blures count: {this.state.blurCount}</span>
      </Gapped>
    );
  }
}
