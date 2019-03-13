import * as PropTypes from 'prop-types';
import * as React from 'react';
import ValidationWrapper from './ValidationWrapper';

export interface IValidationContextSettings {
  scroll: {
    horizontalOffset: number;
    verticalOffset: number;
  };
}

export interface IValidationContext {
  register(wrapper: ValidationWrapper): void;
  unregister(wrapper: ValidationWrapper): void;
  instanceProcessBlur(wrapper: ValidationWrapper): void;
  onValidationUpdated(wrapper: ValidationWrapper, isValid: boolean): void;
  getSettings(): IValidationContextSettings;
  isAnyWrapperInChangingMode(): boolean;
}

export interface ValidationContextProps {
  children?: React.ReactNode;
  onValidationUpdated?: (isValid?: boolean) => void;
  horizontalOffset?: number;
  verticalOffset?: number;
}

export default class ValidationContext extends React.Component<ValidationContextProps> {
  public static childContextTypes = {
    validationContext: PropTypes.any,
  };
  public childWrappers: ValidationWrapper[] = [];

  public getChildContext(): { validationContext: IValidationContext } {
    return {
      validationContext: this,
    };
  }

  public getSettings(): IValidationContextSettings {
    return {
      scroll: {
        horizontalOffset: this.props.horizontalOffset || 0,
        verticalOffset: this.props.verticalOffset || 0,
      },
    };
  }

  public register(wrapper: ValidationWrapper) {
    this.childWrappers.push(wrapper);
  }

  public unregister(wrapper: ValidationWrapper) {
    this.childWrappers.splice(this.childWrappers.indexOf(wrapper), 1);
    this.onValidationRemoved();
  }

  public instanceProcessBlur(instance: ValidationWrapper) {
    for (const wrapper of this.childWrappers.filter(x => x !== instance)) {
      wrapper.emulateBlur();
    }
  }

  public onValidationUpdated(wrapper: ValidationWrapper, isValid?: boolean) {
    const { onValidationUpdated } = this.props;
    if (onValidationUpdated) {
      const isValidResult = !this.childWrappers.find(x => {
        if (x === wrapper) {
          return !isValid;
        }
        return x.hasError();
      });
      onValidationUpdated(isValidResult);
    }
  }

  public isAnyWrapperInChangingMode(): boolean {
    return this.childWrappers.some(x => x.isChanging);
  }

  public onValidationRemoved() {
    const { onValidationUpdated } = this.props;
    if (onValidationUpdated) {
      const isValidResult = !this.childWrappers.find(x => x.hasError());
      onValidationUpdated(isValidResult);
    }
  }

  public getChildWrappersSortedByPosition(): ValidationWrapper[] {
    const wrappersWithPosition = [...this.childWrappers].map(x => ({
      target: x,
      position: x.getControlPosition(),
    }));
    wrappersWithPosition.sort((x, y) => {
      const xPosition = x.position;
      const yPosition = y.position;
      if (xPosition == null && yPosition == null) {
        return 0;
      }
      if (xPosition == null) {
        return 1;
      }
      if (yPosition == null) {
        return -1;
      }
      if (Math.sign(xPosition.x - yPosition.x) !== 0) {
        return Math.sign(xPosition.x - yPosition.x);
      }
      return Math.sign(xPosition.y - yPosition.y);
    });
    return wrappersWithPosition.map(x => x.target);
  }

  public async validate(withoutFocus: boolean): Promise<boolean> {
    await Promise.all(this.childWrappers.map(x => x.processSubmit()));
    const firstInvalid = this.getChildWrappersSortedByPosition().find(x => x.hasError());
    if (firstInvalid) {
      if (!withoutFocus) {
        firstInvalid.focus();
      }
    }

    if (this.props.onValidationUpdated) {
      this.props.onValidationUpdated(!firstInvalid);
    }

    return !firstInvalid;
  }

  public render() {
    return <span>{this.props.children}</span>;
  }
}
