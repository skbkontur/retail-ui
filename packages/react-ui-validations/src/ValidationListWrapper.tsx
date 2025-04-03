import React from 'react';

import { Nullable } from '../typings/Types';

import { ValidationListInternalProps, ValidationListWrapperInternal } from './ValidationListWrapperInternal';
import { ValidationInfo } from './ValidationWrapper';

export interface ValidationListProps extends Pick<ValidationListInternalProps, 'data-tid'> {
  children?: React.ReactElement<any>;
  validationInfos: Array<Nullable<ValidationInfo>>;
  onValidation?: (index: number | null, validation: Nullable<ValidationInfo>) => void;
  scrollToElement?: (index: number) => void;
}

export class ValidationListWrapper extends React.Component<ValidationListProps> {
  public static __KONTUR_REACT_UI__ = 'ValidationListWrapper';
  public static displayName = 'ValidationListWrapper';

  public render() {
    const { children, onValidation, scrollToElement, validationInfos, 'data-tid': datTid } = this.props;

    return (
      <ValidationListWrapperInternal
        data-tid={datTid}
        onValidation={onValidation}
        validationInfos={validationInfos}
        scrollToElement={scrollToElement}
      >
        {children}
      </ValidationListWrapperInternal>
    );
  }
}
