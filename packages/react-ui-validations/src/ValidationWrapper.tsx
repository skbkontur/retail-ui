import React from 'react';

import type { Nullable } from '../typings/Types.js';
import { tooltip } from './ErrorRenderer.js';
import type {
  RenderErrorMessage,
  Validation,
  ValidationBehaviour,
  ValidationLevel,
  ValidationWrapperInternalProps,
} from './ValidationWrapperInternal.js';
import { ValidationWrapperInternal } from './ValidationWrapperInternal.js';

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
  public static displayName = 'ValidationWrapper';

  public render(): React.JSX.Element {
    const { children, validationInfo, renderMessage, 'data-tid': datTid } = this.props;
    const validation: Nullable<Validation> = validationInfo
      ? {
          level: validationInfo.level || 'error',
          behaviour: validationInfo.type || 'lostfocus',
          message: validationInfo.message,
          independent: validationInfo.independent || false,
        }
      : null;

    return (
      <ValidationWrapperInternal
        data-tid={datTid}
        errorMessage={renderMessage || tooltip('right top')}
        validation={validation}
      >
        {children}
      </ValidationWrapperInternal>
    );
  }
}
