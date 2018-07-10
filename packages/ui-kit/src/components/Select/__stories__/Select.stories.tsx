/* tslint:disable max-classes-per-file */
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Select from '../Select';

interface Value {
  value: number;
  label: string;
}

interface SelectWrapperState {
  value: Value;
}

class SelectWrapper extends React.Component<{}, SelectWrapperState> {
  public state = {
    value: { label: 'One', value: 1 }
  };

  public render() {
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
          renderItem={x => x && x.label}
          renderValue={x => x && x.label}
        />
      </div>
    );
  }
}

interface SelectWithNullState {
  value: any;
}

class SelectWithNull extends React.Component<{}, SelectWithNullState> {
  public state = {
    value: null
  };

  public render() {
    return (
      <div>
        <div>
          value: <b>{JSON.stringify(this.state.value)}</b>
        </div>
        <Select
          items={[[null, 'Any'], Select.SEP, [1, 'First'], [2, 'Second'], [3, 'Third']]}
          value={this.state.value}
          onChange={(_, value) => this.setState({ value })}
        />
      </div>
    );
  }
}

storiesOf('Select', module)
  .addDecorator(story => (
    <div className="dropdown-test-container" style={{ height: 150, width: 200, padding: 4 }}>
      {story()}
    </div>
  ))
  .add('Simple', () => <Select items={['one', 'two', 'three']} />)
  .add('Complex values', () => <SelectWrapper />)
  .add('With null', () => <SelectWithNull />);
