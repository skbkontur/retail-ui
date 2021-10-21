import * as PropTypes from 'prop-types';
import React from 'react';
import * as ReactDom from 'react-dom';
import warning from 'warning';

import { Nullable } from '../typings/Types';

import { isBrowser } from './utils';
import { smoothScrollIntoView } from './smoothScrollIntoView';
import { IValidationContext } from './ValidationContext';
import { getLevel, getType, getVisibleValidation, isEqual } from './ValidationHelper';
import { ReactUiDetection } from './ReactUiDetection';

if (isBrowser && typeof HTMLElement === 'undefined') {
  const w = window as any;
  w.HTMLElement = w.Element;
}

export type ValidationBehaviour = 'immediate' | 'lostfocus' | 'submit';

export type ValidationLevel = 'error' | 'warning';

export interface Validation {
  level: ValidationLevel;
  behaviour: ValidationBehaviour;
  message: React.ReactNode;
}

export type RenderErrorMessage = (
  control: React.ReactElement<any>,
  hasError: boolean,
  validation: Nullable<Validation>,
) => React.ReactElement<any>;

export interface ValidationWrapperInternalProps {
  children?: React.ReactElement<any>;
  validation: Nullable<Validation>;
  errorMessage: RenderErrorMessage;
}

interface ValidationWrapperInternalState {
  validation: Nullable<Validation>;
}

interface Point {
  x: number;
  y: number;
}

export class ValidationWrapperInternal extends React.Component<
  ValidationWrapperInternalProps,
  ValidationWrapperInternalState
> {
  public static contextTypes = {
    validationContext: PropTypes.any,
  };
  public state: ValidationWrapperInternalState = {
    validation: null,
  };
  public context!: {
    validationContext: IValidationContext;
  };

  public isChanging = false;
  private child: any; // todo type

  public UNSAFE_componentWillMount() {
    this.applyValidation(this.props.validation);
  }

  public componentDidMount() {
    warning(
      this.context.validationContext,
      'ValidationWrapper should appears as child of ValidationContext.\n' +
        'http://tech.skbkontur.ru/react-ui-validations/#/getting-started',
    );
    if (this.context.validationContext) {
      this.context.validationContext.register(this);
    }
  }

  public componentWillUnmount() {
    if (this.context.validationContext) {
      this.context.validationContext.unregister(this);
    }
  }

  public UNSAFE_componentWillReceiveProps(nextProps: ValidationWrapperInternalProps) {
    this.applyValidation(nextProps.validation);
  }

  public async focus(): Promise<void> {
    const htmlElement = ReactDom.findDOMNode(this);
    if (htmlElement instanceof HTMLElement) {
      const { disableSmoothScroll, scrollOffset } = this.context.validationContext.getSettings();
      if (!disableSmoothScroll) {
        await smoothScrollIntoView(htmlElement, scrollOffset);
      }
      if (this.child && typeof this.child.focus === 'function') {
        this.child.focus();
      }
    }
    this.isChanging = false;
  }

  public render() {
    const { children } = this.props;
    const { validation } = this.state;

    let clonedChild: React.ReactElement<any> = children ? (
      React.cloneElement(children, {
        ref: (x: any) => {
          const child = children as any; // todo type or maybe React.Children.only
          if (child && child.ref) {
            if (typeof child.ref === 'function') {
              child.ref(x);
            }
            if (Object.prototype.hasOwnProperty.call(child.ref, 'current')) {
              child.ref.current = x;
            }
          }
          this.child = x;
        },
        error: !this.isChanging && getLevel(validation) === 'error',
        warning: !this.isChanging && getLevel(validation) === 'warning',
        onBlur: (...args: any[]) => {
          this.handleBlur();
          if (children.props && children.props.onBlur) {
            children.props.onBlur(...args);
          }
        },
        onChange: (...args: any[]) => {
          this.isChanging = true;
          if (children.props && children.props.onChange) {
            children.props.onChange(...args);
          }
        },
        onValueChange: (...args: any[]) => {
          this.isChanging = true;
          if (children.props && children.props.onValueChange) {
            children.props.onValueChange(...args);
          }
        },
      })
    ) : (
      <span />
    );
    if (ReactUiDetection.isComboBox(clonedChild)) {
      clonedChild = React.cloneElement(clonedChild, {
        onInputValueChange: (...args: any[]) => {
          this.isChanging = true;
          this.forceUpdate();
          if (children && children.props && children.props.onInputValueChange) {
            children.props.onInputValueChange(...args);
          }
        },
      });
    }
    return this.props.errorMessage(<span>{clonedChild}</span>, !!validation, validation);
  }

  public getControlPosition(): Nullable<Point> {
    const htmlElement = ReactDom.findDOMNode(this);
    if (htmlElement instanceof HTMLElement) {
      const rect = htmlElement.getBoundingClientRect();
      return { x: rect.top, y: rect.left };
    }
    return null;
  }

  public processBlur() {
    const touched = this.isChanging;
    this.isChanging = false;
    const validation = this.getOnBlurValidation(touched);
    return this.setValidation(validation);
  }

  public async processSubmit(): Promise<void> {
    this.isChanging = false;
    return this.setValidation(this.props.validation);
  }

  public hasError(): boolean {
    return getLevel(this.state.validation) === 'error';
  }

  private handleBlur() {
    setTimeout(() => {
      this.processBlur();
      this.setState({});
    });
  }

  private applyValidation(actual: Nullable<Validation>) {
    const visible = this.getVisibleValidation(actual);
    this.setValidation(visible);
  }

  private setValidation(validation: Nullable<Validation>): Promise<void> {
    const current = this.state.validation;

    if (current === validation) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      this.setState({ validation }, resolve);
      if (Boolean(current) !== Boolean(validation)) {
        this.context.validationContext.onValidationUpdated(this, !validation);
      }
    });
  }

  private getOnBlurValidation(touched: boolean): Nullable<Validation> {
    const actual = this.props.validation;
    if (getType(actual) === 'submit') {
      const visible = this.state.validation;
      return !touched && getType(visible) === 'submit' ? visible : null;
    }
    return actual;
  }

  private getVisibleValidation(actual: Nullable<Validation>): Nullable<Validation> {
    const visible = this.state.validation;
    if (isEqual(visible, actual)) {
      return visible;
    }
    const changing = this.context.validationContext.isAnyWrapperInChangingMode();
    return getVisibleValidation(visible, actual, changing);
  }
}
