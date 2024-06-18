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
  'data-tid'?: string;
}

export class ValidationTooltip extends React.Component<ValidationTooltipProps> {
  public static __KONTUR_REACT_UI__ = 'ValidationTooltip';
  public static displayName = 'ValidationTooltip';

  public render() {
    const { children, pos, error, render, ...rest } = this.props;

    const onlyChild = React.Children.only(children);
    const child = onlyChild && onlyChild.props ? onlyChild.props.children : null;

    return ReactUiDetection.isRadioGroup(child) ||
      ReactUiDetection.isTokenInput(child) ||
      ReactUiDetection.isSwitcher(child) ? (
      <Tooltip useWrapper={false} pos={pos} render={error && render} trigger={'hover&focus'} {...rest}>
        {child}
      </Tooltip>
    ) : (
      <Tooltip pos={pos} render={error && render} trigger={'hover&focus'} {...rest}>
        {children}
      </Tooltip>
    );
  }
}
