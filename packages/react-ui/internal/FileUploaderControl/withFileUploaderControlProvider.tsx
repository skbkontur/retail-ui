/* eslint-disable react/display-name */
import React, { ComponentType } from 'react';

import { FileUploaderControlProvider, FileUploaderControlProviderProps } from './FileUploaderControlProvider';

export const withFileUploaderControlProvider = <TProps extends Record<string, any>, TRef extends Record<string, any>>(
  Component: ComponentType<
    Pick<TProps & FileUploaderControlProviderProps, Exclude<keyof TProps, keyof FileUploaderControlProviderProps>>
  >,
) => {
  return React.memo(
    React.forwardRef<TRef, TProps & FileUploaderControlProviderProps>(
      (props: TProps & FileUploaderControlProviderProps, ref) => {
        const { onRemove, onValueChange, onAttach, ...rest } = props;
        return (
          <FileUploaderControlProvider {...props}>
            <Component ref={ref} {...rest} />
          </FileUploaderControlProvider>
        );
      },
    ),
  );
};
