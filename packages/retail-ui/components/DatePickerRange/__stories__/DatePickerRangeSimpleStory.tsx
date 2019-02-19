import {DatePickerRange, DatePickerRangeProps} from "../DatePickerRange";
import * as React from "react";
import {CSSProperties} from "react";

interface WrapperProps {
  rangeProps?: Partial<DatePickerRangeProps>;
  name?: string
  disableWrapperStyles?: boolean;
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
      <div style={this.props.disableWrapperStyles ? {} : styles}>
        {this.props.name && <div style={{marginBottom: 5}}>{this.props.name}</div>}
        <DatePickerRange {...datePickerRangeProps}/>
      </div>
    );
  }
}

export const DatePickerRangeSimpleStory = () => {
  const renderHorizontalWithCustomSeparator = (): JSX.Element => {
    const separator = <div style={{marginLeft: 10}}>to:&nbsp;</div>;

    return (
      <div style={{margin: 20, border: '1px solid #f1f1f1', padding: 10, display: 'inline-block'}}>
        <div style={{marginBottom: 5}}>With custom separator</div>
        <span>from:&nbsp;</span>
        <div style={{display: 'inline-block'}}>
          <Wrapper disableWrapperStyles
                   rangeProps={{separator}}/>
        </div>
      </div>
    )
  }

  const renderVerticalWithCustomSeparator = (): JSX.Element => {
    const separator = <div style={{marginTop: 10}}>to:</div>;

    return (
      <div style={{margin: 20, border: '1px solid #f1f1f1', padding: 10, display: 'inline-block'}}>
        <div style={{marginBottom: 5}}>Vertical with custom separator</div>
        <div>from:&nbsp;</div>
        <div style={{display: 'inline-block'}}>
          <Wrapper disableWrapperStyles
                   rangeProps={{separator, vertical: true}}/>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Wrapper name='Simple with default separator'/>

      <Wrapper name='Without range (min / max) and with custom width'
               rangeProps={{disableRange: true, startWidth: 180, endWidth: 110}}/>

      <Wrapper name='With custom horizontal margin' rangeProps={{horizontalMargin: 10, disableDefaultSeparator: true}}/>

      <Wrapper name='Without separator'
               rangeProps={{disableDefaultSeparator: true}}/>

      {renderHorizontalWithCustomSeparator()}

      <Wrapper name='Vertical simple'
               rangeProps={{vertical: true}}/>

      <Wrapper name='Vertical with margin'
               rangeProps={{vertical: true, verticalMargin: 10}}/>

      {renderVerticalWithCustomSeparator()}
    </div>
  );
}
