import React from 'react';

import { ReactUiDetection, Tooltip } from './ReactUiDetection';

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

export class ValidationTooltip extends React.Component<ValidationTooltipProps> {
  public render() {
    const { children, pos, error, render, ...rest } = this.props;

    const onlyChild = React.Children.only(children);
    const child = onlyChild && onlyChild.props ? onlyChild.props.children : null;

    if (
      ReactUiDetection.isRadioGroup(child) ||
      ReactUiDetection.isTokenInput(child) ||
      ReactUiDetection.isSwitcher(child)
    ) {
      return (
        <Tooltip useWrapper={false} pos={pos} render={error && render} trigger={'hover&focus'} {...rest}>
          {child}
        </Tooltip>
      );
    }

    return (
      <Tooltip pos={pos} render={error && render} trigger={'hover&focus'} {...rest}>
        {children}
      </Tooltip>
    );
  }
}
