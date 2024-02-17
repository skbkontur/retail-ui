import React from 'react';

import {
  ValidationsFeatureFlags,
  ValidationsFeatureFlagsContext,
  getFullValidationsFlagsContext,
} from './utils/featureFlagsContext';
import { ValidationWrapperInternal } from './ValidationWrapperInternal';
import { FocusMode, ScrollOffset, ValidateArgumentType } from './ValidationContainer';
import { isNullable } from './utils/isNullable';

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

  public async validate(withoutFocusOrValidationSettings: ValidateArgumentType): Promise<boolean> {
    const focusMode = ValidationContextWrapper.getFocusMode(withoutFocusOrValidationSettings);

    await Promise.all(this.childWrappers.map((x) => x.processSubmit()));

    const childrenWrappersSortedByPosition = this.getChildWrappersSortedByPosition();
    const firstError = childrenWrappersSortedByPosition.find((x) => x.hasError());
    if (focusMode === FocusMode.ErrorsAndWarnings) {
      childrenWrappersSortedByPosition.find((x) => x.hasError() || x.hasWarning())?.focus();
    }
    if (focusMode === FocusMode.Errors) {
      firstError?.focus();
    }
    if (this.props.onValidationUpdated) {
      this.props.onValidationUpdated(!firstError);
    }
    return !firstError;
  }

  private static getFocusMode(withoutFocusOrValidationSettings: ValidateArgumentType) {
    if (typeof withoutFocusOrValidationSettings === 'object' && 'focusMode' in withoutFocusOrValidationSettings) {
      return withoutFocusOrValidationSettings.focusMode;
    } else if (!withoutFocusOrValidationSettings) {
      return FocusMode.Errors;
    }
    return FocusMode.None;
  }

  private featureFlags!: ValidationsFeatureFlags;

  public render() {
    return (
      <ValidationsFeatureFlagsContext.Consumer>
        {(flags) => {
          this.featureFlags = getFullValidationsFlagsContext(flags);
          return (
            <ValidationContext.Provider value={this}>
              {this.featureFlags.validationsRemoveExtraSpans ? this.props.children : <span>{this.props.children}</span>}
            </ValidationContext.Provider>
          );
        }}
      </ValidationsFeatureFlagsContext.Consumer>
    );
  }
}
