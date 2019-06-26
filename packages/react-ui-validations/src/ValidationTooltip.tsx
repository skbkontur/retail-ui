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
    if (ReactUiDetection.isRadioGroup(onlyChild)) {
      const prevRenderItem = onlyChild.props.renderItem;
      const items = onlyChild.props.items;
      const renderItem = (value: any, data: any, ...rest: any[]) => {
        return items[0] === value ? (
          <Tooltip pos={this.props.pos} render={this.props.error && this.props.render} trigger={'hover&focus'}>
            {React.cloneElement(prevRenderItem(value, data, ...rest))}
          </Tooltip>
        ) : (
          prevRenderItem(value, data, ...rest)
        );
      };
      return React.cloneElement(onlyChild, { renderItem });
    }
    return (
      <Tooltip pos={this.props.pos} render={this.props.error && this.props.render} trigger={'hover&focus'}>
        {this.props.children}
      </Tooltip>
    );
  }
}
