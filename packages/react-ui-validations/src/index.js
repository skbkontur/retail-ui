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
import {tooltip} from './utils';

type ValidationContainerProps = {
    children?: any;
};

export class ValidationContainer extends React.Component {
    props: ValidationContainerProps;

    async submit(withoutFocus: boolean = false): Promise<void> {
        await this.refs.childContext.submit(withoutFocus);
    }

    render(): React.Element<*> {
        const { children } = this.props;
        return (
            <ValidationContext ref='childContext'>
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
