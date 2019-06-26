import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import warning from 'warning';
import { Nullable } from '../typings/Types';
import smoothScrollIntoView from './smoothScrollIntoView';
import { IValidationContext } from './ValidationContext';

const isEqual = require('lodash.isequal');

if (typeof HTMLElement === 'undefined') {
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
  visible: boolean;
}

interface Point {
  x: number;
  y: number;
}

export default class ValidationWrapperInternal extends React.Component<
  ValidationWrapperInternalProps,
  ValidationWrapperInternalState
> {
  public static contextTypes = {
    validationContext: PropTypes.any,
  };
  public state: ValidationWrapperInternalState = {
    visible: false,
  };
  public context!: {
    validationContext: IValidationContext;
  };

  public isChanging: boolean = false;
  private child: any; // todo type

  public componentWillMount() {
    this.syncWithState(this.props.validation);
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

  public componentWillReceiveProps(nextProps: ValidationWrapperInternalProps) {
    if (!isEqual(this.props.validation, nextProps.validation)) {
      this.syncWithState(nextProps.validation);
    }
  }

  public async focus(): Promise<void> {
    const htmlElement = ReactDom.findDOMNode(this);
    if (htmlElement instanceof HTMLElement) {
      await smoothScrollIntoView(htmlElement, this.context.validationContext.getSettings().scrollOffset);
      if (this.child && typeof this.child.focus === 'function') {
        this.child.focus();
      }
    }
    this.isChanging = false;
  }

  public render() {
    const { children } = this.props;

    const clonedChild: React.ReactElement<any> = children ? (
      React.cloneElement(children, {
        ref: (x: any) => {
          const child = children as any; // todo type or maybe React.Children.only
          if (child && child.ref) {
            if (typeof child.ref === 'function') {
              child.ref(x);
            }
            if (child.ref.hasOwnProperty('current')) {
              child.ref.current = x;
            }
          }
          this.child = x;
        },
        error: !this.isChanging && this.hasValidation('error'),
        warning: !this.isChanging && this.hasValidation('warning'),
        onBlur: () => {
          this.handleBlur();
          if (children.props && children.props.onBlur) {
            children.props.onBlur();
          }
        },
        onChange: (...args: any[]) => {
          this.isChanging = true;
          if (children.props && children.props.onChange) {
            children.props.onChange(...args);
          }
        },
      })
    ) : (
      <span />
    );
    const hasValidation = this.hasValidation();
    const span = (
      <span>
        {clonedChild}
      </span>
    );
    return this.props.errorMessage(span, hasValidation, hasValidation ? this.props.validation : null);
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
    this.isChanging = false;
    const { validation } = this.props;
    if (validation && validation.behaviour === 'lostfocus') {
      this.setVisible(true);
    }
  }

  public async processSubmit(): Promise<void> {
    this.isChanging = false;
    return this.setVisible(true);
  }

  public hasError(): boolean {
    return this.hasValidation('error');
  }

  private hasValidation(level?: Nullable<ValidationLevel>): boolean {
    const { validation } = this.props;
    return !!validation && (!level || validation.level === level) && this.state.visible;
  }

  private handleBlur() {
    this.processBlur();
    this.context.validationContext.instanceProcessBlur(this);
    this.setState({});
  }

  private syncWithState(validation: Nullable<Validation>) {
    const visible = this.shouldBeValidationVisible(validation);
    this.setVisible(visible);
  }

  private setVisible(visible: boolean): Promise<void> {
    return new Promise(resolve => {
      if (this.state.visible === visible) {
        resolve();
        return;
      }
      this.setState({ visible }, resolve);
      this.context.validationContext.onValidationUpdated(this, !visible);
    });
  }

  private shouldBeValidationVisible(validation: Nullable<Validation>): boolean {
    if (!validation) {
      return false;
    }
    switch (validation.behaviour) {
      case 'immediate':
        return true;
      case 'lostfocus':
        if (this.isChanging) {
          return false;
        }
        if (this.context.validationContext.isAnyWrapperInChangingMode() && !this.state.visible) {
          return false;
        }
        return true;
      case 'submit':
        return false;
      default:
        throw new Error(`Unknown behaviour: ${validation.behaviour}`);
    }
  }
}
