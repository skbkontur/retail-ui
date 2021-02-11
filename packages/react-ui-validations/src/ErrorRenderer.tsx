import React from 'react';

import { TooltipPosition, ValidationTooltip } from './ValidationTooltip';
import { RenderErrorMessage } from './ValidationWrapperInternal';

export function tooltip(pos: TooltipPosition): RenderErrorMessage {
  return (control, hasError, validation) => {
    return (
      <ValidationTooltip
        pos={pos}
        error={hasError}
        render={() => {
          if (!validation || !validation.message) {
            return null;
          }
          return (validation && validation.message) || '';
        }}
      >
        {control}
      </ValidationTooltip>
    );
  };
}

export function text(pos: 'bottom' | 'right' = 'right'): RenderErrorMessage {
  if (pos === 'right') {
    return (control, hasError, validation) => {
      return (
        <span style={{ display: 'inline-block' }}>
          {control}
          <span data-validation-message="text" style={{ marginLeft: '10px', color: '#d43517' }}>
            {(validation && validation.message) || ''}
          </span>
        </span>
      );
    };
  }
  return (control, hasError, validation) => {
    return (
      <span style={{ position: 'relative', display: 'inline-block' }}>
        {control}
        <span style={{ position: 'absolute', bottom: 0, left: 0, height: 0 }}>
          <span
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
}
