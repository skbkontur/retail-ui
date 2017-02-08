// @flow
/* eslint-disable react/no-multi-comp */
import React from 'react';

import ValidationTooltip from './Tooltips/ValidationTooltip';
export { ValidationTooltip };

import ValidationTooltipContext from './Tooltips/ValidationTooltipContext';
export { ValidationTooltipContext };

import ValidationContext from './Behaviour/ValidationContext';
export { ValidationContext };

import ValidationWrapper from './Behaviour/ValidationWrapper';
export { ValidationWrapper };

import type { RenderErrorMessage } from './Behaviour/ValidationWrapper';

type ValidationContainerProps = {
    children?: any;
    onValidationUpdated?: (isValid?: ?boolean) => void;
};

export class ValidationContainer extends React.Component {
    props: ValidationContainerProps;

    async submit(withoutFocus: boolean = false): Promise<void> {
        await this.refs.childContext.validate(withoutFocus);
    }

    async validate(withoutFocus: boolean = false): Promise<boolean> {
        return await this.refs.childContext.validate(withoutFocus);
    }

    render(): React.Element<*> {
        const { children } = this.props;
        const contextProps = {};
        if (this.props.onValidationUpdated) {
            contextProps.onValidationUpdated = this.props.onValidationUpdated;
        }
        return (
            <ValidationContext ref='childContext' {...contextProps}>
                <ValidationTooltipContext ref='childTooltipContext'>
                    {children}
                </ValidationTooltipContext>
            </ValidationContext>
        );
    }
}

export type ValidationInfo = {
    type?: 'immediate' | 'lostfocus' | 'submit';
    message: string;
};

type ValidationWrapperV1Props = {
    children?: React.Element<*>;
    validationInfo: ?ValidationInfo;
    renderMessage?: RenderErrorMessage;
};

export class ValidationWrapperV1 extends React.Component {
    props: ValidationWrapperV1Props;

    render(): React.Element<*> {
        const { children, validationInfo, renderMessage } = this.props;

        return (
            <ValidationWrapper
                errorMessage={renderMessage || tooltip('right middle')}
                validations={[
                    {
                        error: Boolean(validationInfo),
                        behaviour: (validationInfo && validationInfo.type) || 'lostfocus',
                        message: (validationInfo && validationInfo.message),
                    },
                ]}>
                {children}
            </ValidationWrapper>
        );
    }
}

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
                    <span style={{ marginLeft: '10px', color: '#d43517' }}>
                        {validation && validation.message || ''}
                    </span>
                </span>
            );
    }
    // TODO так нормально писать вроде
    // eslint-disable-next-line react/display-name
    return (control, hasError, validation) =>
        (
            <span style={{ position: 'relative', display: 'inline-block' }}>
                {control}
                <span style={{ position: 'absolute', bottom: 0, left: 0, height: 0 }}>
                    <span style={{
                        color: '#d43517',
                        overflow: 'visible',
                        whiteSpace: 'nowrap',
                        position: 'absolute',
                        top: '2px',
                        left: 0,
                    }}>{validation && validation.message || ''}</span>
                </span>
            </span>
        );
}
