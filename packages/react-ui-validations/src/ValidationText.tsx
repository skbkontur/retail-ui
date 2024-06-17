import React, { useContext } from 'react';

import { Nullable } from '../typings/Types';
import { ThemeValidations } from '../typings/theme-context';

import { TextPosition, Validation } from './ValidationWrapperInternal';
import { getValidationTextColor } from './utils/getValidationTextColor';
import { ThemeContext } from './ReactUiDetection';

export interface ValidationTextProps {
  pos: TextPosition;
  children: React.ReactNode;
  validation: Nullable<Validation>;
  'data-tid'?: string;
}

export const ValidationText = ({ pos, children, validation, 'data-tid': dataTid }: ValidationTextProps) => {
  const theme = useContext<ThemeValidations>(ThemeContext);
  const color = getValidationTextColor(theme, validation?.level);

  if (pos === 'right') {
    const childrenAndValidationText = (
      <>
        {children}
        <span data-tid={dataTid} data-validation-message="text" style={{ marginLeft: '10px', color }}>
          {(validation && validation.message) || ''}
        </span>
      </>
    );

    return <span style={{ display: 'inline-block' }}>{childrenAndValidationText}</span>;
  }

  const validationText = (
    <span
      data-tid={dataTid}
      data-validation-message="text"
      style={{
        color,
        overflow: 'visible',
        whiteSpace: 'nowrap',
        position: 'absolute',
        top: '2px',
        left: 0,
      }}
    >
      {(validation && validation.message) || ''}
    </span>
  );

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <span style={{ position: 'absolute', bottom: 0, left: 0, height: 0 }}>{validationText}</span>
    </span>
  );
};

ValidationText.__KONTUR_REACT_UI__ = 'ValidationText';
ValidationText.displayName = 'ValidationText';
