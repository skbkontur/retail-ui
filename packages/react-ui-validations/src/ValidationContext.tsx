import * as PropTypes from 'prop-types';
import React from 'react';

import { ValidationWrapperInternal } from './ValidationWrapperInternal';
import { ScrollOffset } from './ValidationContainer';

export interface ValidationContextSettings {
  scrollOffset: ScrollOffset;
  disableSmoothScroll: boolean;
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IValidationContext {
  register(wrapper: ValidationWrapperInternal): void;
  unregister(wrapper: ValidationWrapperInternal): void;
  instanceProcessBlur(wrapper: ValidationWrapperInternal): void;
  onValidationUpdated(wrapper: ValidationWrapperInternal, isValid: boolean): void;
  getSettings(): ValidationContextSettings;
  isAnyWrapperInChangingMode(): boolean;
}

export interface ValidationContextProps {
  children?: React.ReactNode;
  onValidationUpdated?: (isValid?: boolean) => void;
  scrollOffset?: number | ScrollOffset;
  disableSmoothScroll: boolean;
}

export class ValidationContext extends React.Component<ValidationContextProps> implements IValidationContext {
  public static childContextTypes = {
    validationContext: PropTypes.any,
  };
  public childWrappers: ValidationWrapperInternal[] = [];

  public getChildContext(): { validationContext: IValidationContext } {
    return {
      validationContext: this,
    };
  }

  public getSettings(): ValidationContextSettings {
    let scrollOffset: ScrollOffset = {};

    if (typeof this.props.scrollOffset === 'number') {
      scrollOffset = { top: this.props.scrollOffset };
    } else {
      scrollOffset = this.props.scrollOffset == null ? {} : this.props.scrollOffset;
    }

    const { top = 50, bottom = 0 } = scrollOffset;
    return {
      scrollOffset: {
        top,
        bottom,
      },
      disableSmoothScroll: this.props.disableSmoothScroll
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
    for (const wrapper of this.childWrappers.filter(x => x !== instance)) {
      wrapper.processBlur();
    }
  }

  public onValidationUpdated(wrapper: ValidationWrapperInternal, isValid?: boolean) {
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

  public getChildWrappersSortedByPosition(): ValidationWrapperInternal[] {
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
