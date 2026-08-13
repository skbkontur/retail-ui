import type { TooltipProps } from '@skbkontur/react-ui/components/Tooltip/Tooltip';
import { getElementRef } from '@skbkontur/react-ui/lib/getElementRef';
import { mergeRefs } from '@skbkontur/react-ui/lib/mergeRefs';
import React from 'react';
import type { ReactInstance } from 'react';
import warning from 'warning';

import type { Nullable } from '../typings/Types.js';
import { getRootNode, Tooltip } from './ReactUiDetection.js';
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

interface ValidationTooltipState {
  anchorElement: Nullable<HTMLElement>;
}

export class ValidationTooltip extends React.Component<ValidationTooltipProps, ValidationTooltipState> {
  public static __KONTUR_REACT_UI__ = 'ValidationTooltip';
  public static displayName = 'ValidationTooltip';

  public state: ValidationTooltipState = {
    anchorElement: null,
  };

  public render(): React.JSX.Element {
    const { children, pos, error, render, ...rest } = this.props;

    return (
      <ValidationsFeatureFlagsContext.Consumer>
        {(flags) => {
          const featureFlags = getFullValidationsFlagsContext(flags);
          const { validationTooltipExtendedPositions } = featureFlags;

          if (pos && !isStandardTooltipPosition(pos) && !validationTooltipExtendedPositions) {
            warning(
              false,
              `Extended tooltip position '${pos}' requires validationTooltipExtendedPositions feature flag.`,
            );
          }

          const onlyChild = React.Children.only(children);
          const controlWrapper = React.cloneElement(onlyChild, {
            ref: mergeRefs(getElementRef(onlyChild) as React.Ref<ReactInstance>, this.setControlWrapper),
          });

          return (
            <>
              {controlWrapper}
              {this.state.anchorElement && (
                <Tooltip
                  useWrapper={false}
                  anchorElement={this.state.anchorElement}
                  pos={pos}
                  render={error ? render : undefined}
                  trigger={'hover&focus'}
                  {...rest}
                />
              )}
            </>
          );
        }}
      </ValidationsFeatureFlagsContext.Consumer>
    );
  }

  private setControlWrapper = (instance: Nullable<ReactInstance>) => {
    const wrapper = getRootNode(instance);
    const anchorElement = wrapper?.firstElementChild ?? wrapper;
    if (anchorElement instanceof HTMLElement && anchorElement !== this.state.anchorElement) {
      this.setState({ anchorElement });
    }
  };
}
