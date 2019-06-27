import * as PropTypes from 'prop-types';
import * as React from 'react';
import ValidationWrapperInternal, { Point } from './ValidationWrapperInternal';
import { ScrollOffset } from './ValidationContainer';
import { Nullable } from '../typings/Types';

export interface IValidationContextSettings {
  scrollOffset: ScrollOffset;
}

export interface IValidationContext {
  register(wrapper: ValidationWrapperInternal): void;
  unregister(wrapper: ValidationWrapperInternal): void;
  instanceProcessBlur(wrapper: ValidationWrapperInternal): void;
  onValidationUpdated(wrapper: ValidationWrapperInternal): void;
  getSettings(): IValidationContextSettings;
  isAnyWrapperInChangingMode(): boolean;
}

export interface ValidationContextProps {
  children?: React.ReactNode;
  onValidationUpdated?: (isValid: boolean) => void;
  scrollOffset?: number | ScrollOffset;
}

export default class ValidationContext extends React.Component<ValidationContextProps> implements IValidationContext {
  public static childContextTypes = {
    validationContext: PropTypes.any,
  };
  private wrappers: ValidationWrapperInternal[] = [];
  private requestedUpdate: Nullable<Promise<void>> = null;
  private lastIsValid: boolean = true;

  public getChildContext(): { validationContext: IValidationContext } {
    return {
      validationContext: this,
    };
  }

  public render() {
    return this.props.children;
  }

  public getSettings(): IValidationContextSettings {
    const offset = this.props.scrollOffset;

    const scrollOffset: ScrollOffset = typeof offset === 'number' ? { top: offset } : offset || {};

    const { top = 50, bottom = 0 } = scrollOffset;
    return { scrollOffset: { top, bottom } };
  }

  public register(wrapper: ValidationWrapperInternal): void {
    this.wrappers.push(wrapper);
    this.requestUpdate();
  }

  public unregister(wrapper: ValidationWrapperInternal): void {
    const index = this.wrappers.indexOf(wrapper);
    this.wrappers.splice(index, 1);
    this.requestUpdate();
  }

  public onValidationUpdated(wrapper: ValidationWrapperInternal): void {
    this.requestUpdate();
  }

  public instanceProcessBlur(instance: ValidationWrapperInternal): void {
    for (const wrapper of this.wrappers) {
      if (wrapper !== instance) {
        wrapper.processBlur();
      }
    }
  }

  public hasError(): boolean {
    return this.wrappers.some(x => x.hasError());
  }

  public isValid(): boolean {
    return !this.hasError();
  }

  public isAnyWrapperInChangingMode(): boolean {
    return this.wrappers.some(x => x.isChanging);
  }

  public async validate(withoutFocus: boolean): Promise<boolean> {
    await Promise.all(this.wrappers.map(x => x.processSubmit()));

    if (withoutFocus) {
      return this.isValid();
    }

    const wrapper = this.getFirstInvalidWrapper();
    if (wrapper) {
      wrapper.focus();
    }

    return !wrapper;
  }

  private getFirstInvalidWrapper(): Nullable<ValidationWrapperInternal> {
    let result: Nullable<ValidationWrapperInternal> = null;
    let minCoordinates: Nullable<Point> = null;

    for (const wrapper of this.wrappers) {
      if (!wrapper.hasError()) {
        continue;
      }
      const coordinates = wrapper.getControlPosition();
      if (!coordinates) {
        continue;
      }
      if (!minCoordinates || this.lessThen(coordinates, minCoordinates)) {
        result = wrapper;
        minCoordinates = coordinates;
      }
    }
    return result;
  }

  private lessThen(a: Point, b: Point): boolean {
    return a.y < b.y || (a.y === b.y && a.x < b.x);
  }

  private requestUpdate(): Promise<void> {
    if (!this.requestedUpdate) {
      this.requestedUpdate = new Promise(resolve => {
        setImmediate(() => {
          resolve();
          if (this.props.onValidationUpdated) {
            const isValid = this.isValid();
            if (isValid !== this.lastIsValid) {
              this.lastIsValid = isValid;
              this.props.onValidationUpdated(isValid);
            }
          }
          this.requestedUpdate = null;
        });
      });
    }
    return this.requestedUpdate;
  }
}
