// @flow
import React from 'react';
import ReactDom from 'react-dom';
import isEqual from 'lodash.isequal';
import Events from 'add-event-listener';

require('smoothscroll-polyfill').polyfill();

export type Validation = {
    error: boolean;
    behaviour: 'immediate' | 'lostfocus' | 'submit';
};

export interface IValidationContextSettings {
    scroll: { horizontalOffset: number; verticalOffset: number };
}

export interface IValidationContext {
    register(wrapper: ValidationWrapper): void;
    unregister(wrapper: ValidationWrapper): void;
    onValidationUpdated(wrapper: ValidationWrapper, isValid: boolean): void;
    getSettings(): IValidationContextSettings;
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

    _scrollTimer = null;

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
            let validationStates;
            if (validation.error) {
                validationStates = [
                    ...this.state.validationStates.slice(0, index),
                    { ...validationState, visible: true },
                    ...this.state.validationStates.slice(index + 1),
                ];
            }
            else {
                validationStates = [
                    ...this.state.validationStates.slice(0, index),
                    { ...validationState, visible: false },
                    ...this.state.validationStates.slice(index + 1),
                ];
            }
            this.setState({
                validationStates,
            });
            const isValid = !validationStates.find(x => x.visible);
            this.context.validationContext.onValidationUpdated(this, isValid);
        }
    }

    activateValidationMessageIfNeed() {
        if (this.refs.errorMessage && this.refs.errorMessage.setOpened) {
            this.refs.errorMessage.setOpened(true);
        }
    }

    getWindowRect(): { width: number; height: number } {
        const result = { width: 0, height: 0 };
        if (window.innerHeight) {
            result.height = window.innerHeight;
        }
        else if (document.documentElement) {
            result.height = document.documentElement.clientHeight;
        }
        if (window.innerWidth) {
            result.width = window.innerWidth;
        }
        else if (document.documentElement) {
            result.width = document.documentElement.clientWidth;
        }
        return result;
    }

    getScrollOffsets(domElement: Element): ?{ top: number; left: number } {
        const elementRect = domElement.getBoundingClientRect();
        const windowReact = this.getWindowRect();
        const scrollSettings = this.context.validationContext.getSettings().scroll;
        let top = 0;
        let left = 0;

        if (elementRect.top < scrollSettings.horizontalOffset) {
            top = elementRect.top - scrollSettings.horizontalOffset;
        }
        else if (elementRect.bottom > windowReact.height - scrollSettings.horizontalOffset) {
            top = elementRect.bottom - windowReact.height + scrollSettings.horizontalOffset;
        }

        if (elementRect.left < scrollSettings.verticalOffset) {
            left = elementRect.left - scrollSettings.verticalOffset;
        }
        else if (elementRect.right > windowReact.width - scrollSettings.verticalOffset) {
            left = elementRect.right - windowReact.width + scrollSettings.verticalOffset;
        }

        if (!top && !left) {
            return null;
        }

        return {
            top,
            left,
        };
    }

    async focus(): Promise<void> {
        if (this.child && (typeof this.child.focus === 'function')) {
            const childDomElement = ReactDom.findDOMNode(this.child);
            const scrollOffsets = this.getScrollOffsets(childDomElement);
            if (scrollOffsets) {
                await this.smoothScrollBy(scrollOffsets);
            }
            if (typeof this.child.focus === 'function') {
                this.child.focus();
            }
            this.isChanging = false;
        }
    }

    smoothScrollBy(scrollOffsets: { top: number; left: number }): Promise<void> {
        // используем EventListener'ы, т.к. в Firefox скролл асинхронный, и идующий за ним фокус сам прокручивает страницу по какой-то своей логике
        return new Promise(resolve => {
            const _handleScroll = () => {
                if (this._scrollTimer !== null) {
                    clearTimeout(this._scrollTimer);
                }
                this._scrollTimer = setTimeout(() => {
                    Events.removeEventListener(window, 'scroll', _handleScroll);
                    resolve();
                }, 300);
            };

            Events.addEventListener(window, 'scroll', _handleScroll);
            window.scrollBy({ ...scrollOffsets, behavior: 'smooth' });
        });
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
        return childWithError;
    }
}
