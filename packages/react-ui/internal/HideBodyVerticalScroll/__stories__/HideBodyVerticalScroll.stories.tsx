import React from 'react';

import { HideBodyVerticalScroll } from '../HideBodyVerticalScroll';
import { Toggle } from '../../../components/Toggle';
import { Gapped } from '../../../components/Gapped';

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
            <Toggle onValueChange={this.handleChangeLock} checked={this.state.lockScroll} />
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
                <Toggle onValueChange={this.handleChangeLock} checked={this.state.lockScroll} />
              </div>
              <div>
                <strong>oversizeContent</strong>
                <Toggle onValueChange={this.handleChangeContent} checked={this.state.oversizeContent} />
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

export default { title: 'HideBodyVerticalScroll', parameters: { creevey: { kind: { skip: [true] } } } };

export const Simple = () => <Example />;
export const WithPageResize = () => <Example2 />;
WithPageResize.storyName = 'With page resize';
