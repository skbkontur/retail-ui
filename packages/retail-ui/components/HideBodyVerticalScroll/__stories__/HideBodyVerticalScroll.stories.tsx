import * as React from 'react';
import { storiesOf } from '@storybook/react';
import HideBodyVerticalScroll from '../HideBodyVerticalScroll';
import Toggle from '../../Toggle';

class Example extends React.Component {
  public state = {
    lockScroll: false
  };

  public render() {
    return (
      <div>
        <div style={{ position: 'fixed', top: '50%', left: '50%' }}>
          <p>
            <strong>lockScroll</strong>
            <Toggle
              onChange={this.handleChangeLock}
              checked={this.state.lockScroll}
            />
          </p>
        </div>
        {this.state.lockScroll && <HideBodyVerticalScroll />}
        <div
          style={{
            height: 400,
            width: 100,
            margin: 20,
            border: '3px solid'
          }}
        />
        <div
          style={{
            height: 400,
            width: 100,
            margin: 20,
            border: '3px solid'
          }}
        />
        <div
          style={{
            height: 400,
            width: 100,
            margin: 20,
            border: '3px solid'
          }}
        />
        <div
          style={{
            height: 400,
            width: 100,
            margin: 20,
            border: '3px solid'
          }}
        />
      </div>
    );
  }

  private handleChangeLock = (checked: boolean) => {
    this.setState({
      lockScroll: checked
    });
  };
}

storiesOf('HideBodyVerticalScroll', module).add('Simple', () => <Example />);
