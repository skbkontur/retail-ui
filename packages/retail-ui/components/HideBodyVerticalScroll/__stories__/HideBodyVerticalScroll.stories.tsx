import * as React from 'react';
import { storiesOf } from '@storybook/react';
import HideBodyVerticalScroll from '../HideBodyVerticalScroll';
import Toggle from '../../Toggle';
import Gapped from '../../Gapped';

class Example extends React.Component {
  public state = {
    lockScroll: false,
  };

  public render() {
    return (
      <div>
        <div style={{ position: 'fixed', top: '50%', left: '50%' }}>
          <p>
            <strong>lockScroll</strong>
            <Toggle onChange={this.handleChangeLock} checked={this.state.lockScroll} />
          </p>
        </div>
        {this.state.lockScroll && <HideBodyVerticalScroll />}
        <div
          style={{
            height: 400,
            width: 100,
            margin: 20,
            border: '3px solid',
          }}
        />
        <div
          style={{
            height: 400,
            width: 100,
            margin: 20,
            border: '3px solid',
          }}
        />
        <div
          style={{
            height: 400,
            width: 100,
            margin: 20,
            border: '3px solid',
          }}
        />
        <div
          style={{
            height: 400,
            width: 100,
            margin: 20,
            border: '3px solid',
          }}
        />
      </div>
    );
  }

  private handleChangeLock = (checked: boolean) => {
    this.setState({
      lockScroll: checked,
    });
  };
}

class Example2 extends React.Component {
  public state = {
    lockScroll: false,
    oversizeContent: false,
  };

  public render() {
    return (
      <div>
        <div style={{ position: 'fixed', top: '50%', left: '50%' }}>
          <p>
            <Gapped vertical>
              <div>
                <strong>lockScroll</strong>
                <Toggle onChange={this.handleChangeLock} checked={this.state.lockScroll} />
              </div>
              <div>
                <strong>oversizeContent</strong>
                <Toggle onChange={this.handleChangeContent} checked={this.state.oversizeContent} />
              </div>
            </Gapped>
          </p>
        </div>
        {this.state.lockScroll && <HideBodyVerticalScroll />}
        <div
          style={{
            height: 400,
            width: 100,
            margin: 20,
            border: '3px solid',
          }}
        />
        {this.state.oversizeContent && (
          <div>
            <div
              style={{
                height: 400,
                width: 100,
                margin: 20,
                border: '3px solid',
              }}
            />
            <div
              style={{
                height: 400,
                width: 100,
                margin: 20,
                border: '3px solid',
              }}
            />
            <div
              style={{
                height: 400,
                width: 100,
                margin: 20,
                border: '3px solid',
              }}
            />
          </div>
        )}
      </div>
    );
  }

  private handleChangeLock = (checked: boolean) => {
    this.setState({
      lockScroll: checked,
    });
  };

  private handleChangeContent = (checked: boolean) => {
    this.setState({
      oversizeContent: checked,
    });
  };
}

storiesOf('HideBodyVerticalScroll', module)
  .add('Simple', () => <Example />)
  .add('With page resize', () => <Example2 />);
