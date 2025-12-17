import type { ComponentType } from 'react';
import React from 'react';

import type { FileUploaderControlProviderProps } from './FileUploaderControlProvider';
import { FileUploaderControlProvider } from './FileUploaderControlProvider';

export const withFileUploaderControlProvider = <TProps extends Record<string, any>, TRef extends Record<string, any>>(
  Component: ComponentType<
    Pick<TProps & FileUploaderControlProviderProps, Exclude<keyof TProps, keyof FileUploaderControlProviderProps>>
  >,
) => {
  return React.memo(
    React.forwardRef<TRef, TProps & FileUploaderControlProviderProps>(
      (props: TProps & FileUploaderControlProviderProps, ref) => {
        const { onRemove, onValueChange, onAttach, initialFiles, ...rest } = props;
        return (
          <FileUploaderControlProvider {...props}>
            <Component ref={ref} {...rest} />
          </FileUploaderControlProvider>
        );
      },
    ),
  );
};
