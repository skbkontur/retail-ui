import React, { ReactInstance } from 'react';
import warning from 'warning';
import { getRootNode } from '@skbkontur/react-ui/lib/rootNode';

import { Nullable } from '../typings/Types';

import { isBrowser } from './utils/utils';
import { smoothScrollIntoView } from './smoothScrollIntoView';
import { getIndependent, getLevel, getType, getVisibleValidation, isEqual } from './ValidationHelper';
import { ReactUiDetection } from './ReactUiDetection';
import { ValidationContext, ValidationContextType } from './ValidationContextWrapper';

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
  independent: boolean;
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
  public state: ValidationWrapperInternalState = {
    validation: null,
  };

  public isChanging = false;
  private child: any; // todo type
  private rootNode: Nullable<HTMLElement>;

  public static contextType = ValidationContext;
  public context: ValidationContextType = this.context;

  public componentDidMount() {
    warning(
      this.context,
      'ValidationWrapper should appears as child of ValidationContainer.\n' +
        'https://tech.skbkontur.ru/react-ui-validations/#/getting-started',
    );
    if (this.context) {
      this.context.register(this);
    }
    this.applyValidation(this.props.validation);
  }

  public componentWillUnmount() {
    this.context.unregister(this);
  }

  public componentDidUpdate() {
    this.applyValidation(this.props.validation);
  }

  public async focus(): Promise<void> {
    const htmlElement = this.getRootNode();
    if (htmlElement instanceof HTMLElement) {
      const { disableSmoothScroll, scrollOffset } = this.context.getSettings();
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
        ref: this.customRef,
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
      <span ref={this.setRootNode} />
    );
    if (ReactUiDetection.isComboBox(clonedChild)) {
      clonedChild = React.cloneElement(clonedChild, {
        ref: this.customRef,
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

  private customRef = (instance: Nullable<ReactInstance>) => {
    const { children } = this.props;

    this.setRootNode(instance);
    const child = children as any; // todo type or maybe React.Children.only
    if (child && child.ref) {
      if (typeof child.ref === 'function') {
        child.ref(instance);
      }
      if (Object.prototype.hasOwnProperty.call(child.ref, 'current')) {
        child.ref.current = instance;
      }
    }
    this.child = instance;
  };

  private setRootNode = (element: Nullable<ReactInstance>) => {
    this.rootNode = getRootNode(element);
  };

  public getRootNode = () => {
    return this.rootNode;
  };

  public getControlPosition(): Nullable<Point> {
    const htmlElement = this.getRootNode();
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

  public hasWarning(): boolean {
    return getLevel(this.state.validation) === 'warning';
  }

  public isIndependent(): boolean {
    return getIndependent(this.state.validation || this.props.validation) === true;
  }

  private handleBlur() {
    setTimeout(() => {
      this.processBlur();
      if (!this.isIndependent()) {
        this.context.instanceProcessBlur(this);
      }
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
        this.context.onValidationUpdated(this, !validation);
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
    const changing = this.context.isAnyWrapperInChangingMode();
    return getVisibleValidation(visible, actual, changing);
  }
}
