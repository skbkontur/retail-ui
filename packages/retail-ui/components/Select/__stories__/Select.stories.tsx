// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Select from '../Select';
import AddIcon from '@skbkontur/react-icons/Add';
import { action } from '@storybook/addon-actions';

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
    <Select _icon={<AddIcon />} use="link" items={['one', 'two', 'three']} />
  ))
  .add('with text overflow', () => (
    <Select width="100px" items={['oneoneone', 'twotwotwo', 'twotwotwo']} />
  ))
  .add('external focus', () => {
    class Sample extends React.Component {
      private selectElem: Select | null = null;
      public render() {
        return (
          <div>
            <Select
              width="100px"
              items={['oneoneone', 'twotwotwo', 'twotwotwo']}
              ref={this.refSelect}
              onFocus={action('handleFocus')}
              onBlur={action('handleBlur')}
            />
            <br />
            <button onClick={this.handleClick}>Focus!</button>
          </div>
        );
      }

      private refSelect = (element: Select<any, any> | null) => {
        this.selectElem = element;
      };

      private handleClick = () => {
        if (this.selectElem) {
          this.selectElem.focus();
        }
      };
    }

    return <Sample />;
  });
