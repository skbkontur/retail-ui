import React from 'react';

import { Nullable } from '../typings/Types';

import { TextPosition, Validation } from './ValidationWrapperInternal';

export interface ValidationTextProps {
  pos: TextPosition;
  children: React.ReactNode;
  validation: Nullable<Validation>;
  'data-tid'?: string;
}

export const ValidationText = ({ pos, children, validation, 'data-tid': dataTid }: ValidationTextProps) => {
  if (pos === 'right') {
    return (
      <span style={{ display: 'inline-block' }}>
        {children}
        <span data-tid={dataTid} data-validation-message="text" style={{ marginLeft: '10px', color: '#d43517' }}>
          {(validation && validation.message) || ''}
        </span>
      </span>
    );
  }

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <span style={{ position: 'absolute', bottom: 0, left: 0, height: 0 }}>
        <span
          data-tid={dataTid}
          data-validation-message="text"
          style={{
            color: '#d43517',
            overflow: 'visible',
            whiteSpace: 'nowrap',
            position: 'absolute',
            top: '2px',
            left: 0,
          }}
        >
          {(validation && validation.message) || ''}
        </span>
      </span>
    </span>
  );
};
