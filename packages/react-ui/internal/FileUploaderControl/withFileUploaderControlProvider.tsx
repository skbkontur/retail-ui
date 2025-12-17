import type { ComponentType } from 'react';
import React from 'react';

import type { FileUploaderControlProviderProps } from './FileUploaderControlProvider';
import { FileUploaderControlProvider } from './FileUploaderControlProvider';

export const withFileUploaderControlProvider = <TProps extends Record<string, any>, TRef extends Record<string, any>>(
  Component: ComponentType<
    Omit<
      React.PropsWithoutRef<TProps & FileUploaderControlProviderProps>,
      'onAttach' | 'onRemove' | 'onValueChange' | 'initialFiles'
    >
  >,
) => {
  return React.forwardRef<TRef, TProps & FileUploaderControlProviderProps>((props, ref) => {
    const { onRemove, onValueChange, onAttach, initialFiles, ...rest } = props;
    return (
      <FileUploaderControlProvider {...props}>
        <Component ref={ref} {...rest} />
      </FileUploaderControlProvider>
    );
  });
};
