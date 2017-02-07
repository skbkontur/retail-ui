// @flow
import React from 'react';
import ReactDom from 'react-dom';
import isEqual from 'lodash.isequal';

require('smoothscroll-polyfill').polyfill();

export type Validation = {
    error: boolean;
    behaviour: 'immediate' | 'lostfocus' | 'submit';
};

export interface IValidationContext {
    register(wrapper: ValidationWrapper): void;
    unregister(wrapper: ValidationWrapper): void;
    onValidationUpdated(index: number, isValid: boolean): void;
}

export type RenderErrorMessage =
    (control: React.Element<*>, hasError: boolean, validation: ?Validation) => React.Element<*>;

type ValidationWrapperProps = {
    children?: any;
    validations: Validation[];
    errorMessage: RenderErrorMessage;
};

type ValidationState = {
    visible?: boolean;
};

type ValidationWrapperState = {
    validationStates: ValidationState[];
};

type ValidationWrapperContext = {
    validationContext: IValidationContext;
};

export default class ValidationWrapper extends React.Component {
    props: ValidationWrapperProps;
    state: ValidationWrapperState = {
        validationStates: [],
    };
    context: ValidationWrapperContext;

    static contextTypes = {
        validationContext: React.PropTypes.any,
    };

    child: React.Component<*, *, *>;
    isChanging: boolean = false;

    componentWillMount() {
        this.syncWithState(this.props);
    }

    componentDidMount() {
        if (this.context.validationContext) {
            this.context.validationContext.register(this);
        }
    }

    componentWillUnmount() {
        if (this.context.validationContext) {
            this.context.validationContext.unregister(this);
        }
    }

    componentWillReceiveProps(nextProps: ValidationWrapperProps) {
        if (!isEqual(this.props.validations, nextProps.validations)) {
            this.syncWithState(nextProps);
        }
    }

    syncWithState(props: ValidationWrapperProps) {
        this.setState({
            validationStates: props.validations.map(x => this.createState(x)),
        });
    }

    createState(validation: Validation): ValidationState {
        if (validation.behaviour === 'immediate') {
            return {};
        }
        else if (validation.behaviour === 'lostfocus') {
            return { visible: false };
        }
        else if (validation.behaviour === 'submit') {
            return { visible: false };
        }
        throw new Error(`Unknown behaviour: ${validation.behaviour}`);
    }

    handleBlur() {
        const { validations } = this.props;
        validations.forEach((x, i) => this.processBlur(x, this.state.validationStates[i], i));
        this.isChanging = false;
    }

    async processSubmit(): Promise<void> {
        this.isChanging = false;
        const { validations } = this.props;
        await Promise.all(
            validations.map(
                (x, i) => this.processValidationSubmit(x, this.state.validationStates[i], i)));
    }

    async processValidationSubmit(
        validation: Validation, validationState: ValidationState, index: number): Promise<void> {
        return new Promise(resolve => {
            if (validation.behaviour !== 'immediate') {
                this.setState({
                    validationStates: [
                        ...this.state.validationStates.slice(0, index),
                        { ...validationState, visible: true },
                        ...this.state.validationStates.slice(index + 1),
                    ],
                }, resolve);
            }
            else {
                resolve();
            }
        });
    }

    processBlur(validation: Validation, validationState: ValidationState, index: number) {
        this.isChanging = false;
        if (validation.behaviour === 'lostfocus') {
            if (validation.error) {
                this.setState({
                    validationStates: [
                        ...this.state.validationStates.slice(0, index),
                        { ...validationState, visible: true },
                        ...this.state.validationStates.slice(index + 1),
                    ],
                });
            }
            if (!validation.error) {
                this.setState({
                    validationStates: [
                        ...this.state.validationStates.slice(0, index),
                        { ...validationState, visible: false },
                        ...this.state.validationStates.slice(index + 1),
                    ],
                });
            }
            this.context.validationContext.onValidationUpdated(index, !validation.error);
        }
    }

    activateValidationMessageIfNeed() {
        if (this.refs.errorMessage && this.refs.errorMessage.setOpened) {
            this.refs.errorMessage.setOpened(true);
        }
    }

    focus() {
        if (this.child && (typeof this.child.focus === 'function')) {
            ReactDom.findDOMNode(this.child).scrollIntoView({ behavior: 'smooth' });
            if (typeof this.child.focus === 'function') {
                this.child.focus();
            }
            this.isChanging = false;
        }
    }

    isError(validation: Validation, index: number): boolean {
        if (validation.behaviour === 'immediate') {
            return validation.error;
        }
        return Boolean(validation.error && this.state.validationStates[index].visible);
    }

    hasError(): boolean {
        const { validations } = this.props;
        const validation = validations.find((x, i) => this.isError(x, i));
        return Boolean(validation && validation.error);
    }

    render(): React.Element<*> {
        const { children, validations, errorMessage } = this.props;
        const validation = validations.find((x, i) => this.isError(x, i));

        const clonedChild =
            children
                ? React.cloneElement(
                    children, {
                        ref: x => {
                            if (children && children.ref) {
                                children.ref(x);
                            }
                            this.child = x;
                        },
                        error: this.isChanging ? false : Boolean(validation && validation.error),
                        onBlur: () => {
                            this.handleBlur();
                            if (children && children.props && children.props.onBlur) {
                                children.props.onBlur();
                            }
                        },
                        onChange: (...args) => {
                            this.isChanging = true;
                            if (children && children.props && children.props.onChange) {
                                children.props.onChange(...args);
                            }
                        },
                    })
                : <span />;
        const childWithError = React.cloneElement(
            errorMessage(clonedChild, Boolean(validation && validation.error), validation),
            { ref: 'errorMessage' });
        return (
            <span>
                {childWithError}
            </span>
        );
    }
}
