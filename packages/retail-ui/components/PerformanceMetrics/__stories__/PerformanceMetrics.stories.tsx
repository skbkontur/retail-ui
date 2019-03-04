import { storiesOf } from '@storybook/react';
import React, { SyntheticEvent } from 'react';

import StyledInput from '../../StyledInput';
import Input from '../../Input';
import { PerformanceMetrics } from '../PerformanceMetrics';
import SidePage from '../../SidePage/SidePage';
import Button from '../../Button/Button';

const styledInputs = new Array(100).fill('').map((i, index) => (
  <div key={index} style={{ marginRight: 10, marginBottom: 10, display: 'inline-block' }}>
    <StyledInput width={150} />
  </div>
));
const defaultInputs = new Array(100).fill('').map((i, index) => (
  <div key={index} style={{ marginRight: 10, marginBottom: 10, display: 'inline-block' }}>
    <Input width={150} />
  </div>
));

storiesOf('PerformanceMetrics', module)
  .add('Styled Inputs', () => {
    return (
      <div>
        <PerformanceMetrics styledComponents={styledInputs} defaultComponents={defaultInputs} />
      </div>
    );
  })
  .add('100 sharing state Inputs', () => {
    return (
      <div>
        <PerformanceMetrics
          styledComponents={<SharingStateStyledInputs />}
          defaultComponents={<SharingStateDefaultInputs />}
        />
      </div>
    );
  })
  .add('Inputs with SidePage', () => {
    const styled = new Array(200).fill('').map((i, index) => (
      <div key={index} style={{ marginRight: 10, marginBottom: 10, display: 'inline-block' }}>
        <ControlledStyledInput width={150} />
      </div>
    ));
    const common = new Array(200).fill('').map((i, index) => (
      <div key={index} style={{ marginRight: 10, marginBottom: 10, display: 'inline-block' }}>
        <ControlledInput width={150} />
      </div>
    ));

    return (
      <div>
        <PerformanceMetrics
          styledComponents={<InputsWithSidePage inputs={styled} />}
          defaultComponents={<InputsWithSidePage inputs={common} />}
        />
      </div>
    );
  });

class BaseSharingStateInput extends React.Component<{}, { value: string }> {
  public state = {
    value: '',
  };

  public render(): React.ReactNode {
    return null;
  }

  // @ts-ignore
  protected handleInputChange = (e: any, value: string) => {
    this.setState({ value });
  };
}

class SharingStateDefaultInputs extends BaseSharingStateInput {
  public render() {
    return (
      <div>
        {new Array(100).fill('').map((i, index) => (
          <div key={index} style={{ marginRight: 10, marginBottom: 10, display: 'inline-block' }}>
            <Input width={150} onChange={this.handleInputChange} value={this.state.value} />
          </div>
        ))}
      </div>
    );
  }
}

class SharingStateStyledInputs extends BaseSharingStateInput {
  public render() {
    return (
      <div>
        {new Array(100).fill('').map((i, index) => (
          <div key={index} style={{ marginRight: 10, marginBottom: 10, display: 'inline-block' }}>
            <StyledInput width={150} onChange={this.handleInputChange} value={this.state.value} />
          </div>
        ))}
      </div>
    );
  }
}

class ControlledInput extends React.Component<{}, { value: string }> {
  public state = {
    value: '',
  };

  public render() {
    return <Input {...this.props} value={this.state.value} onChange={this.handleChange} />;
  }

  private handleChange = (e: SyntheticEvent, value: string) => {
    this.setState({ value });
  };
}

class ControlledStyledInput extends React.Component<{}, {}> {
  public state = {
    value: '',
  };

  public render() {
    return <StyledInput {...this.props} value={this.state.value} onChange={this.handleChange} />;
  }

  private handleChange = (e: SyntheticEvent, value: string) => {
    this.setState({ value });
  };
}

class InputsWithSidePage extends React.Component<{ inputs: React.ReactNode }, { showSidePage: boolean }> {
  public state = {
    showSidePage: false,
  };

  public render() {
    return (
      <div>
        <div style={{ marginBottom: 10 }}>
          <Button onClick={this.open}>Open SidePage</Button>
        </div>
        {this.state.showSidePage && this.renderSidePage()}
        {this.props.inputs}
      </div>
    );
  }

  private renderSidePage = () => {
    return (
      <SidePage onClose={this.close} blockBackground>
        <SidePage.Header>Title</SidePage.Header>
        <SidePage.Body>
          <div
            style={{
              background: `repeating-linear-gradient(
                          60deg,
                          #fafafa,
                          #fafafa 20px,
                          #dfdede 20px,
                          #dfdede 40px
                        )`,
              height: 1000,
              padding: '20px 0',
            }}
          />
        </SidePage.Body>
        <SidePage.Footer panel>
          <Button onClick={this.close}>Close</Button>
        </SidePage.Footer>
      </SidePage>
    );
  };

  private close = () => {
    this.setState({ showSidePage: false });
  };

  private open = () => {
    this.setState({ showSidePage: true });
  };
}
