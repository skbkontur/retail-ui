import React from 'react';

import { ValidationText } from './ValidationText';
import { TooltipPosition, ValidationTooltip } from './ValidationTooltip';
import { RenderErrorMessage, TextPosition } from './ValidationWrapperInternal';

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

export function text(pos: TextPosition = 'right'): RenderErrorMessage {
  return (control, _hasError, validation, width?) => {
    return (
      <ValidationText pos={pos} validation={validation} childrenWidth={width}>
        {control}
      </ValidationText>
    );
  };
}
