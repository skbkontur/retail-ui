// @flow
import React from 'react';

import ValidationTooltip from './Tooltips/ValidationTooltip';

import type { RenderErrorMessage } from './Behaviour/ValidationWrapper';

import cn from './Validations.less';

export function tooltip(pos: string): RenderErrorMessage {
    // TODO так нормально писать вроде
    // eslint-disable-next-line react/display-name
    return (control, hasError, validation) =>
        (
            <ValidationTooltip
                pos={pos}
                error={hasError}
                render={() => validation && validation.message || ''}>
                {control}
            </ValidationTooltip>
        );
}

export function text(pos: string = 'right'): RenderErrorMessage {
    if (pos === 'right') {
        // TODO так нормально писать вроде
        // eslint-disable-next-line react/display-name
        return (control, hasError, validation) =>
            (
                <span>
                    {control}
                    <span className={cn('error-message')}>{validation && validation.message || ''}</span>
                </span>
            );
    }
    // TODO так нормально писать вроде
    // eslint-disable-next-line react/display-name
    return (control, hasError, validation) =>
        (
            <span className={cn('control-with-error-message')}>
                {control}
                <span className={cn('bottom-error-message-container')}>
                    <span className={cn('bottom-error-message')}>{validation && validation.message || ''}</span>
                </span>
            </span>
        );
}