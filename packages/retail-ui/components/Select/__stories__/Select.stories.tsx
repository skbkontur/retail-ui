// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Select from '../Select';

class SelectWrapper extends React.Component<{}, any> {
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
          renderItem={x => x.label}
          renderValue={x => {
            if (x) {
              return x.label;
            }
          }}
        />
      </div>
    );
  }
}

class SelectWithNull extends React.Component<any, any> {
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
          items={[
            [null, 'Any'],
            Select.SEP,
            [1, 'First'],
            [2, 'Second'],
            [3, 'Third']
          ]}
          value={this.state.value}
          onChange={(_, value) => this.setState({ value })}
        />
      </div>
    );
  }
}

storiesOf('Select', module)
  .addDecorator(story => (
    <div
      className="dropdown-test-container"
      style={{ height: 150, width: 200, padding: 4 }}
    >
      {story()}
    </div>
  ))
  .add('Simple', () => <Select items={['one', 'two', 'three']} />)
  .add('Complex values', () => <SelectWrapper />)
  .add('With null', () => <SelectWithNull />)
  .add('use link', () => <Select use="link" items={['one', 'two', 'three']} />)
  .add('use link with icon', () => (
    <Select _icon="Add" use="link" items={['one', 'two', 'three']} />
  ));
