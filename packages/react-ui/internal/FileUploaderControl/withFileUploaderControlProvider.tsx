import React, { ComponentType } from 'react';

import { FileUploaderControlProvider } from './FileUploaderControlProvider';

export const withFileUploaderControlProvider = <TProps extends object, TRef extends object>(
  Component: ComponentType<TProps>,
) =>
  React.forwardRef<TRef, TProps>((props: TProps, ref) => (
    <FileUploaderControlProvider {...props}>
      <Component ref={ref} {...props} />
    </FileUploaderControlProvider>
  ));
