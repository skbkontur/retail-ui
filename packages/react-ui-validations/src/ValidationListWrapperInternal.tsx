import React, { ReactInstance } from 'react';
import warning from 'warning';

import { Nullable } from '../typings/Types';

import { getRootNode } from './utils/getRootNode';
import { isBrowser } from './utils/utils';
import { smoothScrollIntoView } from './smoothScrollIntoView';
import { getLevel, getVisibleValidation, isEqual } from './ValidationHelper';
import { ValidationContext, ValidationContextType } from './ValidationContextWrapper';
import { Validation } from './ValidationWrapperInternal';
import { ValidationInfo } from './ValidationWrapper';

if (isBrowser && typeof HTMLElement === 'undefined') {
  const w = window as any;
  w.HTMLElement = w.Element;
}

export type ValidationBehaviour = 'immediate' | 'lostfocus' | 'submit';

export type ValidationLevel = 'error' | 'warning';

export interface ValidationListInternalProps {
  children?: React.ReactElement<any>;
  onValidation?: (index: number | null, validation: Nullable<ValidationInfo>) => void;
  validationInfos: Array<Nullable<ValidationInfo>>;
  scrollToElement?: (index: number) => void;
  'data-tid'?: string;
}

interface ValidationListInternalState {
  validation: Nullable<Validation>;
}

interface Point {
  x: number;
  y: number;
}

export class ValidationListWrapperInternal extends React.Component<
  ValidationListInternalProps,
  ValidationListInternalState
> {
  public state: ValidationListInternalState = {
    validation: null,
  };

  private child: any; // todo type
  private rootNode: Nullable<Element>;

  public static contextType = ValidationContext;
  public context: ValidationContextType = this.context;
  public validationIndex: number | null = null;

  public componentDidMount() {
    warning(
      this.context,
      'ValidationListWrapper should appears as child of ValidationContainer.\n' +
        'https://tech.skbkontur.ru/react-ui-validations/#/getting-started',
    );
    if (this.context) {
      this.context.registerVirtual(this);
    }
    this.validationIndex = this.props.validationInfos.findIndex((x) => !!x);
    this.applyValidation(
      this.validationIndex !== null ? this.toValidation(this.props.validationInfos[this.validationIndex]) : null,
    );
  }

  public componentWillUnmount() {
    this.context.unregisterVirtual(this);
  }

  public componentDidUpdate() {
    this.validationIndex = this.props.validationInfos.findIndex((x) => !!x);
    this.applyValidation(
      this.validationIndex !== null ? this.toValidation(this.props.validationInfos[this.validationIndex]) : null,
    );
  }

  public async focus(): Promise<void> {
    const htmlElement = this.getRootNode();
    if (htmlElement instanceof HTMLElement) {
      const { disableSmoothScroll, scrollOffset } = this.context.getSettings();
      if (this.props.scrollToElement && this.validationIndex !== null) {
        this.props.scrollToElement(this.validationIndex);
      }
      if (!disableSmoothScroll) {
        await smoothScrollIntoView(htmlElement, scrollOffset);
      }
      if (this.child && typeof this.child.focus === 'function') {
        this.child.focus();
      }
    }
  }

  public render() {
    const { children, 'data-tid': dataTid } = this.props;

    return children ? (
      React.cloneElement(children, {
        ref: this.customRef,
        'data-tid': dataTid,
      })
    ) : (
      <span ref={this.setRootNode} />
    );
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

  private toValidation(info: Nullable<ValidationInfo>): Nullable<Validation> {
    if (!info) {
      return null;
    }
    return {
      level: info.level || 'error',
      independent: info.independent || false,
      message: info.message || '',
      behaviour: info.type || 'submit',
    };
  }

  public getControlPosition(): Nullable<Point> {
    const htmlElement = this.getRootNode();
    if (htmlElement instanceof HTMLElement) {
      const rect = htmlElement.getBoundingClientRect();
      return { x: rect.top, y: rect.left };
    }
    return null;
  }

  public async processSubmit(): Promise<void> {
    return this.setValidation(
      this.validationIndex !== null ? this.toValidation(this.props.validationInfos[this.validationIndex]) : null,
    );
  }

  public hasError(): boolean {
    return getLevel(this.state.validation) === 'error';
  }

  public hasWarning(): boolean {
    return getLevel(this.state.validation) === 'warning';
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
      this.setState({ validation }, () => {
        if (Boolean(current) !== Boolean(validation)) {
          if (this.props.onValidation) {
            this.props.onValidation(this.validationIndex, validation);
          }
          this.context.onValidationUpdated(this, !validation);
        }
        resolve();
      });
    });
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
