import React from 'react';

import { Nullable } from '../typings/Types';

import { Validation, ValidationWrapperInternal } from './ValidationWrapperInternal';
import { ScrollOffset } from './ValidationContainer';
import { isNullable } from './utils/isNullable';
import { isEqual } from './ValidationHelper';

export interface ValidationContextSettings {
  scrollOffset: ScrollOffset;
  disableSmoothScroll: boolean;
}

export interface ValidationContextWrapperProps {
  children?: React.ReactNode;
  onValidationUpdated?: (isValid?: boolean) => void;
  scrollOffset?: number | ScrollOffset;
  disableSmoothScroll: boolean;
}

export interface ValidationContextType {
  register: (wrapper: ValidationWrapperInternal) => void;
  unregister: (wrapper: ValidationWrapperInternal) => void;
  instanceProcessBlur: (wrapper: ValidationWrapperInternal) => void;
  onValidationUpdated: (wrapper: ValidationWrapperInternal, isValid: boolean) => void;
  getSettings: () => ValidationContextSettings;
  isAnyWrapperInChangingMode: () => boolean;
}

export const ValidationContext = React.createContext<ValidationContextType>({
  register: () => undefined,
  unregister: () => undefined,
  instanceProcessBlur: () => undefined,
  onValidationUpdated: () => undefined,
  getSettings: () => ({
    scrollOffset: {},
    disableSmoothScroll: false,
  }),
  isAnyWrapperInChangingMode: () => false,
});

ValidationContext.displayName = 'ValidationContext';

export class ValidationContextWrapper extends React.Component<ValidationContextWrapperProps> {
  public childWrappers: ValidationWrapperInternal[] = [];
  private previousValidation: Array<Nullable<Validation>> = [];

  public getSettings(): ValidationContextSettings {
    let scrollOffset: ScrollOffset = {};

    if (typeof this.props.scrollOffset === 'number') {
      scrollOffset = { top: this.props.scrollOffset };
    } else {
      scrollOffset = isNullable(this.props.scrollOffset) ? {} : this.props.scrollOffset;
    }

    const { top = 50, bottom = 0 } = scrollOffset;
    return {
      scrollOffset: {
        top,
        bottom,
      },
      disableSmoothScroll: this.props.disableSmoothScroll,
    };
  }

  public register(wrapper: ValidationWrapperInternal) {
    this.childWrappers.push(wrapper);
  }

  public unregister(wrapper: ValidationWrapperInternal) {
    this.childWrappers.splice(this.childWrappers.indexOf(wrapper), 1);
    this.onValidationRemoved();
  }

  public instanceProcessBlur(instance: ValidationWrapperInternal) {
    for (const wrapper of this.childWrappers.filter((x) => x !== instance && !x.isIndependent())) {
      wrapper.processBlur();
    }
  }

  public onValidationUpdated(wrapper: ValidationWrapperInternal, isValid?: boolean) {
    const { onValidationUpdated } = this.props;
    if (onValidationUpdated) {
      const isValidResult = !this.childWrappers.find((x) => {
        if (x === wrapper) {
          return !isValid;
        }
        return x.hasError();
      });
      onValidationUpdated(isValidResult);
    }
  }

  public isAnyWrapperInChangingMode(): boolean {
    return this.childWrappers.some((x) => x.isChanging);
  }

  public onValidationRemoved() {
    const { onValidationUpdated } = this.props;
    if (onValidationUpdated) {
      const isValidResult = !this.childWrappers.find((x) => x.hasError());
      onValidationUpdated(isValidResult);
    }
  }

  public getChildWrappersSortedByPosition(): ValidationWrapperInternal[] {
    const wrappersWithPosition = [...this.childWrappers].map((x) => ({
      target: x,
      position: x.getControlPosition(),
    }));
    wrappersWithPosition.sort((x, y) => {
      const xPosition = x.position;
      const yPosition = y.position;
      if (isNullable(xPosition) && isNullable(yPosition)) {
        return 0;
      }

      if (isNullable(xPosition)) {
        return 1;
      }
      if (isNullable(yPosition)) {
        return -1;
      }
      if (Math.sign(xPosition.x - yPosition.x) !== 0) {
        return Math.sign(xPosition.x - yPosition.x);
      }
      return Math.sign(xPosition.y - yPosition.y);
    });
    return wrappersWithPosition.map((x) => x.target);
  }

  public async validate(withoutFocus: boolean): Promise<boolean> {
    const currentValidation = this.childWrappers.map((x) => x.props.validation);
    const validationHasNotChanged = this.validationsArraysEqual(this.previousValidation, currentValidation);

    await Promise.all(this.childWrappers.map((x) => x.processSubmit()));

    const firstInvalid = this.getChildWrappersSortedByPosition().find((x) => {
      const hasWarning = x.hasWarning();
      const hasError = x.hasError();
      if (validationHasNotChanged && hasWarning && !hasError) {
        return false;
      }
      return hasError || hasWarning;
    });
    if (firstInvalid) {
      if (!withoutFocus) {
        firstInvalid.focus();
      }
    }

    if (this.props.onValidationUpdated) {
      this.props.onValidationUpdated(!firstInvalid);
    }

    this.previousValidation = currentValidation;
    return !firstInvalid;
  }

  public render() {
    return (
      <ValidationContext.Provider value={this}>
        <span>{this.props.children}</span>
      </ValidationContext.Provider>
    );
  }

  private validationsArraysEqual = (a1: Array<Nullable<Validation>>, a2: Array<Nullable<Validation>>): boolean =>
    a1.length === a2.length && a1.every((o, idx) => isEqual(o, a2[idx]));
}
