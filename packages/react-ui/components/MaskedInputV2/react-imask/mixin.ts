import React from 'react';

import { IMask } from './imask/core/holder.js';
import { type InputMask, type InputMaskElement, type FactoryOpts, type UpdateOpts } from './imask/index.js';
import { type MaskedPatternOptions } from './imask/masked/pattern.js';

type AnyProps = Record<string, unknown>;

export type Falsy = false | 0 | '' | null | undefined;

// Плоский (не union) тип для публичного API — устраняет union-распределение в JSX.
// Опирается только на MaskedPatternOptions, т.к. проект использует исключительно строковые маски.
export type ReactMaskOpts = MaskedPatternOptions & { unmask?: 'typed' | boolean };

export type UnmaskValue<Opts extends ReactMaskOpts> = Opts['unmask'] extends 'typed'
  ? InputMask<Opts>['typedValue']
  : Opts['unmask'] extends Falsy
    ? InputMask<Opts>['value']
    : InputMask<Opts>['unmaskedValue'];

export type ExtractReactMaskOpts<
  MaskElement extends InputMaskElement,
  Props extends IMaskInputProps<MaskElement>,
> = Extract<Props, ReactMaskOpts>;

export interface ReactMaskProps<
  MaskElement extends InputMaskElement,
  Props extends IMaskInputProps<MaskElement> = AnyProps,
> {
  onAccept?: (
    value: UnmaskValue<ExtractReactMaskOpts<MaskElement, Props>>,
    maskRef: InputMask<ExtractMaskOpts<MaskElement, Props>>,
    e?: InputEvent,
  ) => void;
  onComplete?: (
    value: UnmaskValue<ExtractReactMaskOpts<MaskElement, Props>>,
    maskRef: InputMask<ExtractMaskOpts<MaskElement, Props>>,
    e?: InputEvent,
  ) => void;
  unmask?: ExtractReactMaskOpts<MaskElement, Props>['unmask'];
  value?: UnmaskValue<ExtractReactMaskOpts<MaskElement, Props>>;
  inputRef?: React.Ref<MaskElement>;
  ref?: React.Ref<React.ComponentType<Props>>;
}

const MASK_PROPS_NAMES = [
  // common
  'mask',
  'unmask',
  'prepare',
  'prepareChar',
  'validate',
  'commit',
  'overwrite',
  'eager',
  'skipInvalid',
  'autofix',

  // events
  'onAccept',
  'onComplete',

  // pattern
  'placeholderChar',
  'displayChar',
  'lazy',
  'definitions',
  'blocks',

  // ref
  'inputRef',
] as const;
const NON_MASK_OPTIONS_NAMES = ['value', 'unmask', 'onAccept', 'onComplete', 'inputRef'] as const;

export type ReactElementProps<MaskElement extends InputMaskElement> = Omit<
  React.HTMLProps<MaskElement>,
  (typeof MASK_PROPS_NAMES)[number] | 'value' | (typeof NON_MASK_OPTIONS_NAMES)[number] | 'ref'
>;

type NonMaskProps<MaskElement extends InputMaskElement, Props extends IMaskMixinProps<MaskElement> = AnyProps> = Omit<
  Props,
  keyof FactoryOpts
>;

export type ReactMixinComponent<
  MaskElement extends InputMaskElement,
  Props extends IMaskMixinProps<MaskElement> = AnyProps,
> = React.ComponentType<
  ReactElementProps<MaskElement> & { inputRef: React.Ref<MaskElement> } & NonMaskProps<MaskElement, Props>
>;

export type MaskPropsKeys = Exclude<(typeof MASK_PROPS_NAMES)[number], (typeof NON_MASK_OPTIONS_NAMES)[number]>;
const MASK_OPTIONS_NAMES = MASK_PROPS_NAMES.filter(
  (pName) => NON_MASK_OPTIONS_NAMES.indexOf(pName as (typeof NON_MASK_OPTIONS_NAMES)[number]) < 0,
) as MaskPropsKeys[];

export type ExtractMaskOpts<MaskElement extends InputMaskElement, Props extends IMaskInputProps<MaskElement>> = Extract<
  Props,
  FactoryOpts
>;

export type IMaskMixinProps<MaskElement extends InputMaskElement> = Omit<ReactMaskProps<MaskElement>, 'ref'> &
  MaskedPatternOptions;

export type IMaskInputProps<MaskElement extends InputMaskElement> = ReactElementProps<MaskElement> &
  IMaskMixinProps<MaskElement>;

export function IMaskMixin<MaskElement extends InputMaskElement, Props extends IMaskInputProps<MaskElement> = AnyProps>(
  ComposedComponent: ReactMixinComponent<MaskElement, Props>,
): React.ComponentType<Props> {
  const MaskedComponent = class extends React.Component<Props> {
    static displayName: string;

    element!: MaskElement;
    maskRef?: InputMask<ExtractMaskOpts<MaskElement, Props>>;
    private prevMaskProp?: unknown;
    private prevUnmaskProp?: unknown;

    constructor(props: Props) {
      super(props);
      this._inputRef = this._inputRef.bind(this);
      this.prevMaskProp = props.mask;
      this.prevUnmaskProp = props.unmask;
    }

    componentDidMount() {
      if (!this.props.mask) {
        return;
      }

      this.initMask();
    }

    componentDidUpdate() {
      const props = this.props;
      const maskOptions = this._extractMaskOptionsFromProps(props);
      if (maskOptions.mask) {
        if (this.maskRef) {
          const maskPropChanged = this.prevMaskProp !== props.mask || this.prevUnmaskProp !== props.unmask;
          const elementAsUnknown = this.element as unknown;
          const isNativeInputField =
            elementAsUnknown instanceof HTMLInputElement || elementAsUnknown instanceof HTMLTextAreaElement;
          const shouldKeepSelection = maskPropChanged && isNativeInputField && document.activeElement === this.element;
          const prevSelection = shouldKeepSelection
            ? {
                start: (this.element as HTMLInputElement | HTMLTextAreaElement).selectionStart ?? 0,
                end: (this.element as HTMLInputElement | HTMLTextAreaElement).selectionEnd ?? 0,
                direction: (this.element as HTMLInputElement | HTMLTextAreaElement).selectionDirection ?? 'none',
              }
            : null;

          this.maskRef.updateOptions(maskOptions as unknown as UpdateOpts<ExtractMaskOpts<MaskElement, Props>>);
          if ('value' in props && props.value !== undefined) {
            const nextValue = props.value as UnmaskValue<ExtractReactMaskOpts<MaskElement, Props>>;
            if (this.maskValue !== nextValue) {
              this.maskValue = nextValue;
            }
          }

          if (prevSelection && isNativeInputField) {
            const inputElement = this.element as HTMLInputElement | HTMLTextAreaElement;
            const restoreSelection = () => {
              if (!inputElement.isConnected) {
                return;
              }
              const valueLength = inputElement.value.length;
              const nextStart = Math.min(prevSelection.start, valueLength);
              const nextEnd = Math.min(prevSelection.end, valueLength);
              inputElement.setSelectionRange(nextStart, nextEnd, prevSelection.direction);
            };
            restoreSelection();
            setTimeout(restoreSelection, 0);
          }
        } else {
          this.initMask(maskOptions);
        }
      } else {
        this.destroyMask();
        if ('value' in props && props.value !== undefined) {
          if (
            (this.element as HTMLElement)?.isContentEditable &&
            (this.element as HTMLElement).tagName !== 'INPUT' &&
            (this.element as HTMLElement).tagName !== 'TEXTAREA'
          ) {
            (this.element as HTMLElement).textContent = props.value;
          } else {
            (this.element as HTMLInputElement).value = props.value;
          }
        }
      }

      // Keep prev props in sync for next update
      this.prevMaskProp = (this.props as Props).mask;
      this.prevUnmaskProp = (this.props as Props).unmask;
    }

    componentWillUnmount() {
      this.destroyMask();
    }

    _inputRef(el: MaskElement) {
      this.element = el;
      if (this.props.inputRef) {
        if (Object.prototype.hasOwnProperty.call(this.props.inputRef, 'current')) {
          (this.props.inputRef as React.MutableRefObject<MaskElement>).current = el;
        } else {
          (this.props.inputRef as React.RefCallback<MaskElement>)(el);
        }
      }
    }

    initMask(maskOptions: ExtractMaskOpts<MaskElement, Props> = this._extractMaskOptionsFromProps(this.props)) {
      // eslint-disable-next-line new-cap
      this.maskRef = IMask(this.element, maskOptions)
        .on('accept', this._onAccept.bind(this))
        .on('complete', this._onComplete.bind(this));

      if ('value' in this.props && this.props.value !== undefined) {
        this.maskValue = this.props.value;
      }
    }

    destroyMask() {
      if (this.maskRef) {
        this.maskRef.destroy();
        delete this.maskRef;
      }
    }

    _extractMaskOptionsFromProps(props: Readonly<Props>): ExtractMaskOpts<MaskElement, Props> {
      const { ...cloneProps }: Readonly<Props> = props;

      // keep only mask options
      (Object.keys(cloneProps) as Array<keyof Props>)
        .filter((prop) => MASK_OPTIONS_NAMES.indexOf(prop as MaskPropsKeys) < 0)
        .forEach((nonMaskProp) => {
          delete cloneProps[nonMaskProp];
        });

      return cloneProps as ExtractMaskOpts<MaskElement, Props>;
    }

    _extractNonMaskProps(props: Readonly<Props>): NonMaskProps<MaskElement, Props> {
      const { ...cloneProps } = props as Props;

      (MASK_PROPS_NAMES as unknown as Array<keyof Props>).forEach((maskProp) => {
        delete cloneProps[maskProp];
      });
      if (!('defaultValue' in cloneProps)) {
        cloneProps.defaultValue = props.mask ? '' : cloneProps.value;
      }
      delete cloneProps.value;

      return cloneProps as NonMaskProps<MaskElement, Props>;
    }

    get maskValue(): UnmaskValue<ExtractReactMaskOpts<MaskElement, Props>> {
      if (!this.maskRef) {
        return '' as UnmaskValue<ExtractReactMaskOpts<MaskElement, Props>>;
      }

      if (this.props.unmask === 'typed') {
        return this.maskRef.typedValue;
      }
      if (this.props.unmask) {
        return this.maskRef.unmaskedValue;
      }
      return this.maskRef.value;
    }

    set maskValue(value: UnmaskValue<ExtractReactMaskOpts<MaskElement, Props>>) {
      if (!this.maskRef) {
        return;
      }

      // eslint-disable-next-line no-param-reassign, eqeqeq
      value = (value == null && this.props.unmask !== 'typed' ? '' : value) as UnmaskValue<
        ExtractReactMaskOpts<MaskElement, Props>
      >;
      if (this.props.unmask === 'typed') {
        this.maskRef.typedValue = value;
      } else if (this.props.unmask) {
        this.maskRef.unmaskedValue = value;
      } else {
        this.maskRef.value = value;
      }
    }

    _onAccept(e?: InputEvent) {
      if (this.props.onAccept && this.maskRef) {
        this.props.onAccept(this.maskValue, this.maskRef, e);
      }
    }

    _onComplete(e?: InputEvent) {
      if (this.props.onComplete && this.maskRef) {
        this.props.onComplete(this.maskValue, this.maskRef, e);
      }
    }

    render() {
      return React.createElement(ComposedComponent, {
        ...this._extractNonMaskProps(this.props),
        inputRef: this._inputRef,
      });
    }
  };

  const nestedComponentName = ComposedComponent.displayName || ComposedComponent.name || 'Component';
  MaskedComponent.displayName = `IMask(${nestedComponentName})`;

  return React.forwardRef<InstanceType<typeof MaskedComponent>, Props>((props, ref) =>
    React.createElement(MaskedComponent, { ...(props as Props), ref }),
  ) as unknown as React.ComponentType<Props>;
}
