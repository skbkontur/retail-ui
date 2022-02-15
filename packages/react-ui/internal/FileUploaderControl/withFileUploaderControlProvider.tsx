import React, { ComponentType } from 'react';

import { FileUploaderControlProvider, FileUploaderControlProviderProps } from './FileUploaderControlProvider';

export const withFileUploaderControlProvider = <TProps extends object, TRef extends object>(
  Component: ComponentType<
    Pick<TProps & FileUploaderControlProviderProps, Exclude<keyof TProps, keyof FileUploaderControlProviderProps>>
  >,
) =>
  React.memo(
    React.forwardRef<TRef, TProps & FileUploaderControlProviderProps>(
      (props: TProps & FileUploaderControlProviderProps, ref) => {
        // TODO: Find a way to enable the rule below.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { onRemove, onValueChange, onAttach, ...rest } = props;
        return (
          <FileUploaderControlProvider {...props}>
            <Component ref={ref} {...rest} />
          </FileUploaderControlProvider>
        );
      },
    ),
  );
