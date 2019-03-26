import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import warning from 'warning';
import { Nullable } from '../typings/Types';
import ReactUiDetection from './ReactUiDetection';
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
  error: boolean;
  level: ValidationLevel;
  behaviour: ValidationBehaviour;
  message: React.ReactNode;
}

export type RenderErrorMessage = (
  control: React.ReactElement<any>,
  hasError: boolean,
  validation: Nullable<Validation>,
) => React.ReactElement<any>;

export interface ValidationWrapperProps {
  children?: React.ReactElement<any>;
  validations: Validation[];
  errorMessage: RenderErrorMessage;
}

interface ValidationState {
  visible?: boolean;
}

interface ValidationWrapperState {
  validationStates: ValidationState[];
}

interface Point {
  x: number;
  y: number;
}

export default class ValidationWrapper extends React.Component<ValidationWrapperProps, ValidationWrapperState> {
  public static contextTypes = {
    validationContext: PropTypes.any,
  };
  public state: ValidationWrapperState = {
    validationStates: [],
  };
  public context!: {
    validationContext: IValidationContext;
  };

  public child: any; // todo type
  public isChanging: boolean = false;

  public componentWillMount() {
    this.syncWithState(this.props);
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

  public componentWillReceiveProps(nextProps: ValidationWrapperProps) {
    if (!isEqual(this.props.validations, nextProps.validations)) {
      this.syncWithState(nextProps);
    }
  }

  public syncWithState(props: ValidationWrapperProps) {
    const nextValidationStates = props.validations.map(x => this.createState(x));
    this.setState({
      validationStates: nextValidationStates,
    });
    const isValid = !nextValidationStates.find(x => x.visible === true);
    this.context.validationContext.onValidationUpdated(this, isValid);
  }

  public createState(validation: Validation): ValidationState {
    if (validation.behaviour === 'immediate') {
      return {};
    } else if (validation.behaviour === 'lostfocus') {
      if (this.isChanging) {
        return { visible: false };
      }
      if (
        this.context.validationContext.isAnyWrapperInChangingMode() &&
        this.state.validationStates.every(x => x.visible === false)
      ) {
        return { visible: false };
      }

      return { visible: true };
    } else if (validation.behaviour === 'submit') {
      return { visible: false };
    }
    throw new Error(`Unknown behaviour: ${validation.behaviour}`);
  }

  public emulateBlur() {
    const { validations } = this.props;
    validations.forEach((x, i) => this.processBlur(x, this.state.validationStates[i], i));
    this.isChanging = false;
  }

  public handleBlur() {
    const { validations } = this.props;
    validations.forEach((x, i) => this.processBlur(x, this.state.validationStates[i], i));
    this.context.validationContext.instanceProcessBlur(this);
    this.isChanging = false;
    this.setState({});
  }

  public async processSubmit(): Promise<void> {
    this.isChanging = false;
    const { validations } = this.props;
    await Promise.all(validations.map((x, i) => this.processValidationSubmit(x, this.state.validationStates[i], i)));
  }

  public processValidationSubmit(
    validation: Validation,
    validationState: ValidationState,
    index: number,
  ): Promise<void> {
    return new Promise(resolve => {
      if (validation.behaviour !== 'immediate') {
        this.setState(
          {
            validationStates: [
              ...this.state.validationStates.slice(0, index),
              { ...validationState, visible: true },
              ...this.state.validationStates.slice(index + 1),
            ],
          },
          resolve,
        );
      } else {
        resolve();
      }
    });
  }

  public processBlur(validation: Validation, validationState: ValidationState, index: number) {
    this.isChanging = false;
    if (validation.behaviour === 'lostfocus') {
      let { validationStates } = this.state;
      if (validation.error && (!validationStates[index] || validationStates[index].visible === false)) {
        validationStates = [
          ...validationStates.slice(0, index),
          { ...validationState, visible: true },
          ...validationStates.slice(index + 1),
        ];
        this.setState({ validationStates });
        const isValid = !validationStates.find(x => x.visible === true);
        this.context.validationContext.onValidationUpdated(this, isValid);
      } else if (!validation.error && (!validationStates[index] || validationStates[index].visible === true)) {
        validationStates = [
          ...validationStates.slice(0, index),
          { ...validationState, visible: false },
          ...validationStates.slice(index + 1),
        ];
        this.setState({ validationStates });
        const isValid = !validationStates.find(x => x.visible === true);
        this.context.validationContext.onValidationUpdated(this, isValid);
      }
    }
  }

  public async focus(): Promise<void> {
    const childDomElement = ReactDom.findDOMNode(this);
    if (childDomElement != null && childDomElement instanceof HTMLElement) {
      await smoothScrollIntoView(
        childDomElement,
        this.context.validationContext.getSettings().scroll.verticalOffset || 50,
      );
      if (this.child != null && typeof this.child.focus === 'function') {
        this.child.focus();
      }
    }
    this.isChanging = false;
  }

  public getControlPosition(): Nullable<Point> {
    const childDomElement = ReactDom.findDOMNode(this);
    if (childDomElement != null && childDomElement instanceof HTMLElement) {
      const rect = childDomElement.getBoundingClientRect();
      return {
        x: rect.top,
        y: rect.left,
      };
    }
    return null;
  }

  public isErrorOrWarning(validation: Validation, index: number): boolean {
    if (validation.behaviour === 'immediate') {
      return validation.error;
    }
    return Boolean(validation.error && this.state.validationStates[index].visible);
  }

  public isError(validation: Validation, index: number): boolean {
    if (validation.behaviour === 'immediate') {
      return validation.error && validation.level === 'error';
    }
    return Boolean(validation.error && validation.level === 'error' && this.state.validationStates[index].visible);
  }

  public hasError(): boolean {
    const { validations } = this.props;
    const validation = validations.find((x, i) => this.isError(x, i));
    return Boolean(validation && validation.error);
  }

  public render() {
    const { children, validations, errorMessage } = this.props;
    const validation = validations.find((x, i) => this.isErrorOrWarning(x, i));

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
        error: this.isChanging ? false : Boolean(validation && validation.error && validation.level === 'error'),
        warning: this.isChanging ? false : Boolean(validation && validation.error && validation.level === 'warning'),
        onBlur: () => {
          this.handleBlur();
          if (children && children.props && children.props.onBlur) {
            children.props.onBlur();
          }
        },
        onInput: (...args: any[]) => {
          if (ReactUiDetection.isDatePicker(children)) {
            this.isChanging = true;
            this.setState({});
          }
          if (children && children.props && children.props.onInput) {
            children.props.onInput(...args);
          }
        },
        onChange: (...args: any[]) => {
          if (ReactUiDetection.isDatePicker(children)) {
            const nextValue = args[1];
            if (nextValue !== children.props.value && !(nextValue == null && children.props.value == null)) {
              this.isChanging = true;
              this.handleBlur();
            }
          } else {
            this.isChanging = true;
          }
          if (children && children.props && children.props.onChange) {
            children.props.onChange(...args);
          }
        },
      })
    ) : (
      <span />
    );
    const childWithError = React.cloneElement(
      errorMessage(clonedChild, Boolean(validation && validation.error), validation),
      { ref: 'errorMessage' },
    );
    return childWithError;
  }
}
