// @flow

type Location = {
  coordinates: {
    left: number,
    top: number
  },
  position: string
};

export class PopupRenderingState<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  static Unmounted = class extends PopupRenderingState<void> {};

  static UnknownSize = class extends PopupRenderingState<HTMLElement> {};

  static Calculated = class extends PopupRenderingState<Location> {};
}
