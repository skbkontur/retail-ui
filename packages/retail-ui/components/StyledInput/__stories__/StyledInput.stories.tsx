import { storiesOf } from '@storybook/react';
import React from 'react';

import StyledInput from '../StyledInput';
import Input from '../../Input';
import Toggle from '../../Toggle/Toggle';

const Icon: React.SFC<{ name?: string }> = ({ name }) => <span>{name}</span>;
const styles = {
  display: 'inline-block',
  verticalAlign: 'middle',
  minWidth: '90px',
  padding: '5px',
};

storiesOf('StyledInput', module)
  .add('StyledInputs with different states', () => (
    <div>
      <div>
        <div style={styles}>Warning</div>
        <div id="warning-small-input-wrapper" style={styles}>
          <StyledInput size="small" warning />
        </div>
        <div id="warning-large-input-wrapper" style={styles}>
          <StyledInput size="large" warning />
        </div>
      </div>

      <div>
        <div style={styles}>Error</div>
        <div id="error-small-input-wrapper" style={styles}>
          <StyledInput size="small" error />
        </div>
        <div id="error-large-input-wrapper" style={styles}>
          <StyledInput size="large" error />
        </div>
      </div>

      <div>
        <div style={styles}>Disabled</div>
        <div id="disabled-small-input-wrapper" style={styles}>
          <StyledInput size="small" disabled />
        </div>
        <div id="disabled-large-input-wrapper" style={styles}>
          <StyledInput size="large" disabled />
        </div>
      </div>

      <div>
        <div style={styles}>
          Disabled
          <br /> (with text)
        </div>
        <div id="disabled-text-small-input-wrapper" style={styles}>
          <StyledInput size="small" value="Some text" disabled />
        </div>
        <div id="disabled-text-large-input-wrapper" style={styles}>
          <StyledInput size="large" value="Some text" disabled />
        </div>
      </div>

      <div>
        <div style={styles}>Placeholder</div>
        <div id="placeholder-small-input-wrapper" style={styles}>
          <StyledInput size="small" placeholder="Placeholder" />
        </div>
        <div id="placeholder-large-input-wrapper" style={styles}>
          <StyledInput size="large" placeholder="Placeholder" />
        </div>
      </div>

      <div>
        <div style={styles}>Password</div>
        <div id="password-small-input-wrapper" style={styles}>
          <StyledInput size="small" value="password" type="password" />
        </div>
        <div id="password-large-input-wrapper" style={styles}>
          <StyledInput size="large" value="password" type="password" />
        </div>
      </div>

      <div>
        <div style={styles}>Borderless</div>
        <div id="borderless-small-input-wrapper" style={styles}>
          <StyledInput size="small" borderless />
        </div>
        <div id="borderless-large-input-wrapper" style={styles}>
          <StyledInput size="large" borderless />
        </div>
      </div>

      <div>
        <div style={styles}>Left icon</div>
        <div id="left-icon-small-input-wrapper" style={styles}>
          <StyledInput size="small" leftIcon={<Icon name="🍿" />} />
        </div>
        <div id="left-icon-large-input-wrapper" style={styles}>
          <StyledInput size="large" leftIcon={<Icon name="🚁" />} />
        </div>
      </div>

      <div>
        <div style={styles}>Right icon</div>
        <div id="right-icon-small-input-wrapper" style={styles}>
          <StyledInput size="small" rightIcon={<Icon name="🚀" />} />
        </div>
        <div id="right-icon-large-input-wrapper" style={styles}>
          <StyledInput size="large" disabled rightIcon={<Icon name="🚀" />} />
        </div>
      </div>
    </div>
  ))
  .add('StyledInputs with different sizes', () => (
    <div>
      <div id="small-input-wrapper" style={styles}>
        <StyledInput size="small" />
      </div>
      <div id="medium-input-wrapper" style={styles}>
        <StyledInput size="medium" />
      </div>
      <div id="large-input-wrapper" style={styles}>
        <StyledInput size="large" />
      </div>
    </div>
  ))
  .add('Performance metrics', () => {
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

    return (
      <div>
        <PerformanceMetrics styledInputs={styledInputs} defaultInputs={defaultInputs} />
      </div>
    );
  });

enum InputTypes {
  Styled,
  Default,
}

export class PerformanceMetrics extends React.Component<
  { styledInputs: React.ReactNode[]; defaultInputs: React.ReactNode[] },
  { inputType: InputTypes }
> {
  public state = {
    inputType: InputTypes.Styled,
  };

  public render() {
    return (
      <div style={{ padding: 10 }}>
        <div>
          <Toggle changeEventHandler={this.handleToggleChange} checked={this.state.inputType === InputTypes.Styled} />
          {'Toggle inputs'}
        </div>
        <h1 style={{ lineHeight: '2em' }}>
          {this.state.inputType === InputTypes.Styled ? 'Styled Inputs:' : 'Default Inputs:'}
        </h1>
        <div style={{ width: 1000, padding: 10 }}>
          {this.state.inputType === InputTypes.Styled ? this.props.styledInputs : this.props.defaultInputs}
        </div>
      </div>
    );
  }

  private handleToggleChange = () => {
    this.setState(state => {
      return {
        inputType: state.inputType === InputTypes.Styled ? InputTypes.Default : InputTypes.Styled,
      };
    });
  };
}
