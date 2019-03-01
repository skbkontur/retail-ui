import { storiesOf } from '@storybook/react';
import React from 'react';

import StyledInput from '../../StyledInput';
import Input from '../../Input';
import { PerformanceMetrics } from '../PerformanceMetrics';

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
