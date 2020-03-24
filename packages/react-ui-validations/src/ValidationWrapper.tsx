import React from 'react';

import { Nullable } from '../typings/Types';

import { tooltip } from './ErrorRenderer';
import {
  RenderErrorMessage,
  Validation,
  ValidationBehaviour,
  ValidationLevel,
  ValidationWrapperInternal,
} from './ValidationWrapperInternal';

export interface ValidationInfo {
  type?: Nullable<ValidationBehaviour>;
  level?: Nullable<ValidationLevel>;
  message: React.ReactNode;
}

export interface ValidationWrapperProps {
  children?: React.ReactElement<any>;
  validationInfo: Nullable<ValidationInfo>;
  renderMessage?: Nullable<RenderErrorMessage>;
}

export class ValidationWrapper extends React.Component<ValidationWrapperProps> {
  public static __KONTUR_REACT_UI__ = 'ValidationWrapper';

  public render() {
    const { children, validationInfo, renderMessage } = this.props;
    const validation: Nullable<Validation> = validationInfo
      ? {
          level: validationInfo.level || 'error',
          behaviour: validationInfo.type || 'lostfocus',
          message: validationInfo.message,
        }
      : null;
    return (
      <ValidationWrapperInternal errorMessage={renderMessage || tooltip('right top')} validation={validation}>
        {children}
      </ValidationWrapperInternal>
    );
  }
}
