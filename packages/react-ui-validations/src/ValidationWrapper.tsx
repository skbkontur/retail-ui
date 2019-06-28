import * as React from 'react';
import { Nullable } from '../typings/Types';
import { tooltip } from './ErrorRenderer';
import ValidationWrapperInternal, {
  RenderErrorMessage,
  Validation,
  ValidationBehaviour,
  ValidationLevel,
} from './ValidationWrapperInternal';

interface ValidationInfoInternal {
  type?: Nullable<ValidationBehaviour>;
  level?: Nullable<ValidationLevel>;
  message: React.ReactNode;
}

export type ValidationInfo =
  | {
      pending: true;
    } & Partial<ValidationInfoInternal>
  | {
      pending?: false;
    } & ValidationInfoInternal;

export interface ValidationWrapperProps {
  children: React.ReactElement<any>;
  validationInfo: Nullable<ValidationInfo>;
  renderMessage?: Nullable<RenderErrorMessage>;
}

export default class ValidationWrapper extends React.Component<ValidationWrapperProps> {
  public render() {
    const { children, validationInfo, renderMessage } = this.props;
    const pending = (validationInfo && validationInfo.pending) || false;
    const validation: Nullable<Validation> =
      !pending && validationInfo
        ? {
            level: validationInfo.level || 'error',
            behaviour: validationInfo.type || 'lostfocus',
            message: validationInfo.message,
          }
        : null;
    return (
      <ValidationWrapperInternal
        errorMessage={renderMessage || tooltip('right top')}
        validation={validation}
        pending={pending}
      >
        {children}
      </ValidationWrapperInternal>
    );
  }
}
