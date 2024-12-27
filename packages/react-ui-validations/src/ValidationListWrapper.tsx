import React from 'react';

import { Nullable } from '../typings/Types';

import { Validation } from './ValidationWrapperInternal';
import {
  ValidationBehaviour,
  ValidationLevel,
  ValidationListWrapperInternal,
  ValidationListInternalProps,
} from './ValidationListWrapperInternal';
import { ValidationReader } from './Validations';

export interface ValidationListProps extends Pick<ValidationListInternalProps, 'data-tid'> {
  children?: React.ReactElement<any>;
  validationInfos: ValidationReader<any[]>;
  onValidation?: (index: number | null, validation: Nullable<Validation>) => void;
  level?: ValidationLevel;
  behaviour?: ValidationBehaviour;
  independent?: boolean;
  scrollToElement?: (index: number) => void;
}

export class ValidationListWrapper extends React.Component<ValidationListProps> {
  public static __KONTUR_REACT_UI__ = 'ValidationListWrapper';
  public static displayName = 'ValidationListWrapper';

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
      <ValidationListWrapperInternal
        data-tid={datTid}
        onValidation={onValidation}
        validationInfos={validationInfos}
        scrollToElement={scrollToElement}
        behaviour={behaviour}
        independent={independent}
        level={level}
      >
        {children}
      </ValidationListWrapperInternal>
    );
  }
}
