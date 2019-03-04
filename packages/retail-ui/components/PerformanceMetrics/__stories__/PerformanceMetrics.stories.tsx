import { storiesOf } from '@storybook/react';
import React from 'react';

import { PerformanceMetrics } from '../PerformanceMetrics';
import SidePage from '../../SidePage/SidePage';
import Button from '../../Button/Button';
import { getDefaultTheme } from '../../../themes';
import { ThemeProvider } from '../../../lib/styled-components';
import { ControlledStyledInput } from '../ControlledStyledInput';
import { ControlledInput } from '../ControlledInput';

const styledInputs = (
  <ThemeProvider theme={getDefaultTheme()}>
    <div>
      {new Array(200).fill('').map((i, index) => (
        <div key={index} style={{ marginRight: 10, marginBottom: 10, display: 'inline-block' }}>
          <ControlledStyledInput width={150} />
        </div>
      ))}
    </div>
  </ThemeProvider>
);
const defaultInputs = (
  <div>
    {new Array(200).fill('').map((i, index) => (
      <div key={index} style={{ marginRight: 10, marginBottom: 10, display: 'inline-block' }}>
        <ControlledInput width={150} />
      </div>
    ))}
  </div>
);

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
    const styled = (
      <ThemeProvider theme={getDefaultTheme()}>
        <div>
          {new Array(200).fill('').map((i, index) => (
            <div key={index} style={{ marginRight: 10, marginBottom: 10, display: 'inline-block' }}>
              <ControlledStyledInput width={150} />
            </div>
          ))}
        </div>
      </ThemeProvider>
    );
    const common = (
      <div>
        {new Array(200).fill('').map((i, index) => (
          <div key={index} style={{ marginRight: 10, marginBottom: 10, display: 'inline-block' }}>
            <ControlledInput width={150} />
          </div>
        ))}
      </div>
    );

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
            <ControlledInput width={150} onChange={this.handleInputChange} value={this.state.value} />
          </div>
        ))}
      </div>
    );
  }
}

class SharingStateStyledInputs extends BaseSharingStateInput {
  public render() {
    return (
      <ThemeProvider theme={getDefaultTheme()}>
        <div>
          {new Array(100).fill('').map((i, index) => (
            <div key={index} style={{ marginRight: 10, marginBottom: 10, display: 'inline-block' }}>
              <ControlledStyledInput width={150} onChange={this.handleInputChange} value={this.state.value} />
            </div>
          ))}
        </div>
      </ThemeProvider>
    );
  }
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
