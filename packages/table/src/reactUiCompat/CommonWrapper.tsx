import {
  CommonWrapper as ReactUiCommonWrapper,
  type CommonProps,
  type CommonPropsWithRootNodeRef,
  type CommonWrapperRestProps,
} from '@skbkontur/react-ui/internal/CommonWrapper';
import React from 'react';

type CommonWrapperPropsCompat<P extends CommonProps> = Omit<P, 'children'> &
  Pick<CommonPropsWithRootNodeRef, 'rootNodeRef'> & {
    children?: React.ReactNode | ((rest: CommonWrapperRestProps<P>) => React.ReactNode);
  };

/**
 * Обёртка над react-ui CommonWrapper для React 19.
 * В peer-пакете `CommonWrapperProps = P & { children: ReactNode | fn }` даёт пересечение
 * children и ломает render-prop; в будущем нужно править в react-ui.
 */
export function CommonWrapper<P extends CommonProps>(props: CommonWrapperPropsCompat<P>): React.ReactElement {
  return <ReactUiCommonWrapper {...(props as React.ComponentProps<typeof ReactUiCommonWrapper>)} />;
}

export type { CommonProps, CommonWrapperRestProps };
