import React, { useContext } from 'react';

import type { Nullable } from '../typings/Types';
import type { ThemeValidations } from '../typings/theme-context';

import type { TextPosition, Validation } from './ValidationWrapperInternal';
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
    return <div style={{ display: 'inline-block' }}>{childrenAndValidationText}</div>;
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

  const childrenAndValidationText = (
    <>
      {children}
      <span style={{ position: 'absolute', bottom: 0, left: 0, height: 0 }}>{validationText}</span>
    </>
  );

  return <div style={{ position: 'relative', display: 'inline-block' }}>{childrenAndValidationText}</div>;
};

ValidationText.__KONTUR_REACT_UI__ = 'ValidationText';
ValidationText.displayName = 'ValidationText';
