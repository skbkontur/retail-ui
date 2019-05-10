import * as React from 'react';
import Gapped from '../../Gapped';
import Input from '../../Input';

export interface IVariableValueProps {
  onChange: (variable: string, value: string) => void;
  value: string;
  variable: string;
}
export interface IVariableValueState {
  value: string;
}

export class VariableValue extends React.Component<IVariableValueProps, IVariableValueState> {
  public state = {
    value: this.props.value,
  };

  public render() {
    return (
      <Gapped verticalAlign={'middle'} gap={10}>
        <span>{`${this.props.variable}: `}</span>
        <Input value={this.state.value} onChange={this.handleChange} onBlur={this.handleBlur} />
      </Gapped>
    );
  }

  public componentDidUpdate(prevProps: IVariableValueProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    this.setState({
      value,
    });
  };

  private handleBlur = () => {
    const { variable, value, onChange } = this.props;
    if (this.state.value !== value) {
      onChange(variable, this.state.value);
    }
  };
}
