import * as React from 'react';
import { Nullable } from '../typings/Types';
import { tooltip } from './ErrorRenderer';
import ValidationWrapperInternal, {
  RenderErrorMessage,
  Validation,
  ValidationBehaviour,
  ValidationLevel,
} from './ValidationWrapperInternal';

export interface ValidationInfo {
  type?: Nullable<ValidationBehaviour>;
  level?: Nullable<ValidationLevel>;
  message: React.ReactNode;
}

export interface ValidationWrapperV1Props {
  children: React.ReactElement<any>;
  validationInfo: Nullable<ValidationInfo>;
  renderMessage?: Nullable<RenderErrorMessage>;
}

export default class ValidationWrapperV1 extends React.Component<ValidationWrapperV1Props> {
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
