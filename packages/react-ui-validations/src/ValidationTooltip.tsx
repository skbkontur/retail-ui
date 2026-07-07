import type { TooltipProps } from '@skbkontur/react-ui/components/Tooltip/Tooltip';
import React from 'react';
import warning from 'warning';

import { ReactUiDetection, Tooltip } from './ReactUiDetection.js';
import { getFullValidationsFlagsContext } from './utils/featureFlagsContext/FeatureFlagsHelpers.js';
import { ValidationsFeatureFlagsContext } from './utils/featureFlagsContext/ValidationsFeatureFlagsContext.js';
import { isStandardTooltipPosition } from './utils/tooltipPositions.js';

export type TooltipExtendedPosition = NonNullable<TooltipProps['pos']>;

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
  pos?: TooltipExtendedPosition;
  render?: () => React.ReactNode;
  'data-tid'?: string;
}

export class ValidationTooltip extends React.Component<ValidationTooltipProps> {
  public static __KONTUR_REACT_UI__ = 'ValidationTooltip';
  public static displayName = 'ValidationTooltip';

  public render(): React.JSX.Element {
    const { children, pos, error, render, ...rest } = this.props;

    return (
      <ValidationsFeatureFlagsContext.Consumer>
        {(flags) => {
          const { validationTooltipExtendedPositions } = getFullValidationsFlagsContext(flags);

          if (pos && !isStandardTooltipPosition(pos) && !validationTooltipExtendedPositions) {
            warning(
              false,
              `Extended tooltip position '${pos}' requires validationTooltipExtendedPositions feature flag.`,
            );
          }

          const onlyChild = React.Children.only(children);
          const child = onlyChild && onlyChild.props ? onlyChild.props.children : null;

          return ReactUiDetection.isRadioGroup(child) ||
            ReactUiDetection.isTokenInput(child) ||
            ReactUiDetection.isSwitcher(child) ? (
            <Tooltip useWrapper={false} pos={pos} render={error ? render : undefined} trigger={'hover&focus'} {...rest}>
              {child}
            </Tooltip>
          ) : (
            <Tooltip pos={pos} render={error ? render : undefined} trigger={'hover&focus'} {...rest}>
              {children}
            </Tooltip>
          );
        }}
      </ValidationsFeatureFlagsContext.Consumer>
    );
  }
}
