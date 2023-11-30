import React from 'react';

import {
  ValidationsFeatureFlags,
  ValidationsFeatureFlagsContext,
  getFullValidationsFlagsContext,
} from '../lib/featureFlagsContext';
import { Nullable } from '../typings/Types';

import { tooltip } from './ErrorRenderer';
import {
  RenderErrorMessage,
  Validation,
  ValidationBehaviour,
  ValidationLevel,
  ValidationWrapperInternal,
  ValidationWrapperInternalProps,
} from './ValidationWrapperInternal';
import { ReactUiDetection } from './ReactUiDetection';

export interface ValidationInfo {
  type?: Nullable<ValidationBehaviour>;
  level?: Nullable<ValidationLevel>;
  message: React.ReactNode;
  independent?: boolean;
}

export interface ValidationWrapperProps extends Pick<ValidationWrapperInternalProps, 'data-tid'> {
  children?: React.ReactElement<any>;
  validationInfo: Nullable<ValidationInfo>;
  renderMessage?: Nullable<RenderErrorMessage>;
}

export class ValidationWrapper extends React.Component<ValidationWrapperProps> {
  public static __KONTUR_REACT_UI__ = 'ValidationWrapper';

  public render() {
    const { children, validationInfo, renderMessage, 'data-tid': datTid } = this.props;
    const validation: Nullable<Validation> = validationInfo
      ? {
          level: validationInfo.level || 'error',
          behaviour: validationInfo.type || 'lostfocus',
          message: validationInfo.message,
          independent: validationInfo.independent || false,
        }
      : null;

    let featureFlags: ValidationsFeatureFlags;

    const onlyChild = React.Children.only(children);
    const child = onlyChild && onlyChild.props ? onlyChild.props.children : null;
    return (
      <ValidationsFeatureFlagsContext.Consumer>
        {(flags) => {
          featureFlags = getFullValidationsFlagsContext(flags);
          return (
            <ValidationWrapperInternal
              data-tid={datTid}
              errorMessage={renderMessage || tooltip('right top')}
              validation={validation}
            >
              {featureFlags.ValidationsWrapperAndContainerRemoveExtraSpan &&
              (ReactUiDetection.isRadioGroup(child) ||
                ReactUiDetection.isTokenInput(child) ||
                ReactUiDetection.isSwitcher(child)) ? (
                <div> {children} </div>
              ) : (
                children
              )}
            </ValidationWrapperInternal>
          );
        }}
      </ValidationsFeatureFlagsContext.Consumer>
    );
  }
}
