import React, { ComponentType } from 'react';

import { FileUploaderControlProvider, FileUploaderControlProviderProps } from './FileUploaderControlProvider';

export const withFileUploaderControlProvider = <TProps extends object, TRef extends object>(
  Component: ComponentType<Pick<TProps & FileUploaderControlProviderProps, Exclude<keyof TProps, keyof FileUploaderControlProviderProps>>>,
) =>
  React.forwardRef<TRef, TProps & FileUploaderControlProviderProps>((props: TProps & FileUploaderControlProviderProps, ref) => {
    const {onRemove, onValueChange, onReadSuccess, ...rest} = props;
    return (
      <FileUploaderControlProvider {...props}>
        <Component ref={ref} {...rest} />
      </FileUploaderControlProvider>
    );
  });
