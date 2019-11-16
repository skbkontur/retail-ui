import * as React from 'react';
import ReactUiDetection, { Tooltip } from './ReactUiDetection';

export type TooltipPosition =
  | 'top left'
  | 'top center'
  | 'top right'
  | 'bottom left'
  | 'bottom center'
  | 'bottom right'
  | 'left top'
  | 'left middle'
  | 'left bottom'
  | 'right top'
  | 'right middle'
  | 'right bottom';

export interface ValidationTooltipProps {
  children: React.ReactElement<any>;
  error: boolean;
  pos?: TooltipPosition;
  render?: () => React.ReactNode;
}

export default class ValidationTooltip extends React.Component<ValidationTooltipProps> {
  public render() {
    const onlyChild = React.Children.only(this.props.children);
    const radioChild = onlyChild && onlyChild.props ? onlyChild.props.children : null;
    if (ReactUiDetection.isRadioGroup(radioChild)) {
      return (
        <Tooltip
          useWrapper={false}
          pos={this.props.pos}
          render={this.props.error && this.props.render}
          trigger={'hover&focus'}
        >
          {radioChild}
        </Tooltip>
      );
    }
    return (
      <Tooltip pos={this.props.pos} render={this.props.error && this.props.render} trigger={'hover&focus'}>
        {this.props.children}
      </Tooltip>
    );
  }
}
