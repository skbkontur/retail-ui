import * as React from 'react';
import {DatePickerRange, DatePickerRangeProps} from "../DatePickerRange";
import {CSSProperties} from "react";

interface WrapperProps {
  rangeProps?: Partial<DatePickerRangeProps>;
  name?: string
  disableWrapperStyles?: boolean;
  errorLevel?: "error" | "warning";
}

class Wrapper extends React.Component<WrapperProps, {startValue?: string, endValue?: string}> {
  state = {startValue: '', endValue: ''};

  render(): JSX.Element {
    const styles: CSSProperties = {
      display: 'inline-block',
      border: '1px solid #f1f1f1',
      margin: 20,
      padding: 10
    }

    const datePickerRangeProps: DatePickerRangeProps = {
      startValue: this.state.startValue,
      endValue: this.state.endValue,
      onStartChange: (e, v) => this.setState({startValue: v}),
      onEndChange: (e, v) => this.setState({endValue: v}),
      ...this.props.rangeProps
    }

    return (
      <div style={styles}>
        {this.props.name && <div style={{marginBottom: 5}}>{this.props.name}</div>}
        <DatePickerRange {...datePickerRangeProps}/>
      </div>
    )

    //TODO: заготовка для истории с валидациями
    /*return (
      <ValidationContainer>
        <ValidationWrapperV1 validationInfo={this.getValidationInfo()}>
          <DatePickerRange {...datePickerRangeProps}/>
        </ValidationWrapperV1>
      </ValidationContainer>
    )*/
  }

  /*private _getValidationInfo(){
    return {
      level: this.props.errorLevel,
      message: 'error message'
    }
  }*/
}

export const DatePickerRangeWithErrorsStory = () => {
  return (
    <div>
      <Wrapper rangeProps={{warning: true}} name="With warning"/>

      <Wrapper rangeProps={{error: true}} name="With error"/>
    </div>
  );
}
