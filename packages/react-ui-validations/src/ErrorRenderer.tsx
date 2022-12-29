/* eslint-disable react/display-name */
import React from 'react';

import { TooltipPosition, ValidationTooltip } from './ValidationTooltip';
import { RenderErrorMessage } from './ValidationWrapperInternal';

export interface ErrorRendererOptions {
  dataTid: string;
}

export function tooltip(pos: TooltipPosition, options?: ErrorRendererOptions): RenderErrorMessage {
  return (control, hasError, validation) => {
    return (
      <ValidationTooltip
        data-tid={options?.dataTid}
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

// eslint-disable-next-line default-param-last
export function text(pos: 'bottom' | 'right' = 'right', options?: ErrorRendererOptions): RenderErrorMessage {
  if (pos === 'right') {
    return (control, _hasError, validation) => {
      return (
        <span data-tid={options?.dataTid} style={{ display: 'inline-block' }}>
          {control}
          <span data-validation-message="text" style={{ marginLeft: '10px', color: '#d43517' }}>
            {(validation && validation.message) || ''}
          </span>
        </span>
      );
    };
  }
  return (control, _hasError, validation) => {
    return (
      <span data-tid={options?.dataTid} style={{ position: 'relative', display: 'inline-block' }}>
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
