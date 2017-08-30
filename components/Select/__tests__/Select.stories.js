// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Select from '../Select';

class SelectWrapper extends React.Component<{}, *> {
  state = {
    value: { label: 'One', value: 1 }
  };
  render() {
    return (
      <div>
        <Select
          items={[
            { label: 'One', value: 1 },
            { label: 'Two', value: 2 },
            { label: 'Three', value: 3 }
          ]}
          value={this.state.value}
          onChange={(_, value) => this.setState({ value })}
          renderItem={x => x.label}
          renderValue={x => x.label}
        />
      </div>
    );
  }
}

storiesOf('Select', module)
  .addDecorator(story =>
    <div
      className="dropdown-test-container"
      style={{ height: 150, width: 200, padding: 4 }}
    >
      {story()}
    </div>
  )
  .add('Simple', () => <Select items={['one', 'two', 'three']} />)
  .add('Complex values', () => <SelectWrapper />);
