// @flow
import React from 'react';
import type { IValidationContext } from './ValidationWrapper';
import ValidationWrapper from './ValidationWrapper';

type ValidationContextProps = {
    children?: any;
};

export default class ValidationContext extends React.Component {
    static childContextTypes = {
        validationContext: React.PropTypes.any,
    };

    props: ValidationContextProps;
    childWrappers: ValidationWrapper[] = [];

    getChildContext(): { validationContext: IValidationContext } {
        return {
            validationContext: this,
        };
    }

    register(wrapper: ValidationWrapper) {
        this.childWrappers.push(wrapper);
    }

    unregister(wrapper: ValidationWrapper) {
        this.childWrappers.splice(this.childWrappers.indexOf(wrapper), 1);
    }

    async submit(withoutFocus: boolean): Promise<void> {
        await Promise.all(this.childWrappers.map(x => x.processSubmit()));
        const firstInvalid = this.childWrappers.find(x => x.hasError());
        if (firstInvalid) {
            if (!withoutFocus) {
                firstInvalid.focus();
            }
            firstInvalid.activateValidationMessageIfNeed();
        }
    }

    render(): React.Element<*> {
        const { children } = this.props;
        return (
            <span>
                {children}
            </span>
        );
    }
}
