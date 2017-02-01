// @flow
import React from 'react';
import type { IValidationContext } from './ValidationWrapper';
import ValidationWrapper from './ValidationWrapper';

type ValidationContextProps = {
    children?: any;
    onValidationUpdated?: (index?: int, isValid?: boolean) => void;
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

    onValidationUpdated(index, isValid) {
        if (this.props.onValidationUpdated) {
            let isValidResult;
            if (index !== undefined && isValid !== undefined) {
                isValidResult = !this.childWrappers.filter((v, i) => i !== index).find(x => x.hasError()) && isValid;
            } else {
                isValidResult = !this.childWrappers.find(x => x.hasError());
            }
            this.props.onValidationUpdated(isValidResult);
        }
    }

    async validate(withoutFocus: boolean): Promise<boolean> {
        await Promise.all(this.childWrappers.map(x => x.processSubmit()));
        const firstInvalid = this.childWrappers.find(x => x.hasError());
        if (firstInvalid) {
            if (!withoutFocus) {
                firstInvalid.focus();
            }
            firstInvalid.activateValidationMessageIfNeed();
        }
        this.onValidationUpdated();
        return !firstInvalid;
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
