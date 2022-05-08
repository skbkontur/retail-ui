import React from 'react';

import { HideBodyVerticalScroll } from '../HideBodyVerticalScroll';
import { Toggle, ToggleProps } from '../../../components/Toggle';
import { Gapped } from '../../../components/Gapped';

type ExampleState = {
  lockScroll: ToggleProps['checked'];
};
class Example extends React.Component {
  public state: ExampleState = {
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

type Example2State = {
  lockScroll: ToggleProps['checked'];
  oversizeContent: ToggleProps['checked'];
};
class Example2 extends React.Component {
  public state: Example2State = {
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

export default { title: 'HideBodyVerticalScroll', parameters: { creevey: { skip: [true] } } };

export const Simple = () => <Example />;
export const WithPageResize = () => <Example2 />;
WithPageResize.storyName = 'With page resize';
