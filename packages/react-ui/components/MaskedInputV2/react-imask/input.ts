import React from 'react';

import { IMaskMixin, type IMaskInputProps } from './mixin.js';

// eslint-disable-next-line new-cap
const IMaskInputClass = IMaskMixin(
  ({ inputRef, ...props }: { inputRef: React.Ref<HTMLInputElement> } & React.HTMLProps<HTMLInputElement>) =>
    React.createElement('input', {
      ...props,
      ref: inputRef,
    }),
);

const IMaskInputFn = <Props extends IMaskInputProps<HTMLInputElement>>(
  props: Props,
  ref: React.Ref<React.ComponentType<Props>>,
) =>
  React.createElement(IMaskInputClass as React.ComponentType<Props & { ref?: React.Ref<React.ComponentType<Props>> }>, {
    ...props,
    ref,
  });
const IMaskInput = React.forwardRef(
  IMaskInputFn as unknown as <Props extends IMaskInputProps<HTMLInputElement>>(
    props: Props & { ref?: React.Ref<React.ComponentType<Props>> },
  ) => React.ReactElement<Props>,
);

export { IMaskInput };
