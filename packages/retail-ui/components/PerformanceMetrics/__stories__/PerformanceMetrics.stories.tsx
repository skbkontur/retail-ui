import { storiesOf } from '@storybook/react';
import React from 'react';
import { PerformanceMetrics } from '../PerformanceMetrics';
import SidePage from '../../SidePage/SidePage';
import Button from '../../Button/Button';
import { getDefaultTheme } from '../../../themes';
import { ThemeProvider } from '../../../lib/styled-components';
import { ControlledStyledInput } from '../ControlledStyledInput';
import { ControlledInput } from '../ControlledInput';
import { InputProps } from '../../Input';
import Spinner from '../../Spinner';

function getRandom(min = 1, max = 1000) {
  return `${Math.random() * (max - min) + min}`;
}

function noop() {
  return undefined;
}

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

const NativeInput = (props: any) => {
  return <input {...props} />;
};

interface InputUpdaterProps {
  count: number;
  component: React.ComponentClass<InputProps> | React.SFC<InputProps>;
}
class InputsUpdater extends React.Component<InputUpdaterProps, { values: string[] }> {
  private jobId?: number;
  constructor(props: InputUpdaterProps) {
    super(props);
    this.state = {
      values: this.getValues(),
    };
  }
  public componentDidMount(): void {
    this.scheduleUpdateValues();
  }

  public componentWillUnmount(): void {
    if (this.jobId) {
      cancelAnimationFrame(this.jobId);
    }
  }

  public render() {
    const Component = this.props.component;

    return (
      <div style={{ position: 'relative', paddingTop: 50, paddingLeft: 20 }}>
        <div style={{ position: 'absolute', top: 10, left: 20, width: 100 }}>
          <Spinner type={'mini'} caption={'FPS meter'} />
        </div>
        <div>
          {this.state.values.map((v, i) => (
            <div key={i} style={{ marginRight: 10, marginBottom: 10, display: 'inline-block' }}>
              <Component value={v} onChange={noop} width={150} borderless />
            </div>
          ))}
        </div>
      </div>
    );
  }

  private scheduleUpdateValues = () => {
    this.jobId = requestAnimationFrame(this.updateValues);
  };

  private updateValues = () => {
    this.setState({ values: this.getValues() }, () => {
      this.scheduleUpdateValues();
    });
  };

  private getValues = () => {
    return new Array(this.props.count).fill('').map((s, i) => getRandom(i));
  };
}

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
  })
  .add('Auto-updating inputs (Input, 200)', () => <InputsUpdater count={200} component={ControlledInput} />)
  .add('Auto-updating inputs (StyledInput, 200)', () => (
    <ThemeProvider theme={getDefaultTheme()}>
      <InputsUpdater count={200} component={ControlledStyledInput} />
    </ThemeProvider>
  ))
  .add('Auto-updating inputs (input, 200)', () => <InputsUpdater component={NativeInput} count={200} />);

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
