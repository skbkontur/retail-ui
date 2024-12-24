import React from 'react';

import { Nullable } from '../typings/Types';

import { Validation } from './ValidationWrapperInternal';
import {
  ValidationBehaviour,
  ValidationLevel,
  ValidationWrapperVirtualizedInternal,
  ValidationWrapperVirtualizedInternalProps,
} from './ValidationWrapperVirtualizedInternal';
import { ValidationReader } from './Validations';

export interface ValidationWrapperVirtualizedProps extends Pick<ValidationWrapperVirtualizedInternalProps, 'data-tid'> {
  children?: React.ReactElement<any>;
  validationInfos: ValidationReader<any[]>;
  onValidation?: (index: number | null, validation: Nullable<Validation>) => void;
  level?: ValidationLevel;
  behaviour?: ValidationBehaviour;
  independent?: boolean;
  scrollToElement?: (index: number) => void;
}

export class ValidationWrapperVirtualized extends React.Component<ValidationWrapperVirtualizedProps> {
  public static __KONTUR_REACT_UI__ = 'ValidationWrapperVirtualized';
  public static displayName = 'ValidationWrapperVirtualized';

  public render() {
    const {
      children,
      onValidation,
      behaviour,
      level,
      independent,
      scrollToElement,
      validationInfos,
      'data-tid': datTid,
    } = this.props;

    return (
      <ValidationWrapperVirtualizedInternal
        data-tid={datTid}
        onValidation={onValidation}
        validationInfos={validationInfos}
        scrollToElement={scrollToElement}
        behaviour={behaviour}
        independent={independent}
        level={level}
      >
        {children}
      </ValidationWrapperVirtualizedInternal>
    );
  }
}
