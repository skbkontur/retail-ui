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
        <DatePickerRange {...datePickerRangeProps}/>
      </div>
    )

    /*return (
      <ValidationContainer>
        <ValidationWrapperV1 validationInfo={this.getValidationInfo()}>
          <DatePickerRange {...datePickerRangeProps}/>
        </ValidationWrapperV1>
      </ValidationContainer>
    )*/
  }

  private getValidationInfo(){
    return {
      level: this.props.errorLevel,
      message: 'ololo',
      type: 'immediate'
    }
  }
}

export const DatePickerRangeWithErrorsStory = () => {
  return (
    <div>
      <Wrapper rangeProps={{warning: true}}/>

      <Wrapper rangeProps={{error: true}}/>
    </div>
  );
}
