import React, { useEffect } from 'react';

import { isFunction } from '../../lib/utils';
import { CommonWrapper } from '../../internal/CommonWrapper';

import { EmptyObject, MediaQueriesType, ResponsiveLayoutFlags } from './types';
import { useResponsiveLayout } from './useResponsiveLayout';

interface ResponsiveLayoutProps<T extends MediaQueriesType = EmptyObject> {
  /** Задает функцию, которая вызывается при изменении лейаута. */
  onLayoutChange?: (layout: ResponsiveLayoutFlags<T>) => void;

  /** @ignore */
  children?: React.ReactNode | ((currentLayout: ResponsiveLayoutFlags<T>) => React.ReactNode);

  /** Позволяет кастомизировать возвращаемые флаги. */
  customMediaQueries?: T;
}

/**
 * Компонент `ResponsiveLayout` для определения текущего лэйаута.
 */
export function ResponsiveLayout<T extends MediaQueriesType = EmptyObject>(props: ResponsiveLayoutProps<T>) {
  const layoutFlags = useResponsiveLayout<T>({ customMediaQueries: props.customMediaQueries });

  useEffect(() => {
    if (props.onLayoutChange) {
      props.onLayoutChange(layoutFlags);
    }
  }, [layoutFlags]);

  return (
    <CommonWrapper {...props}>
      {isFunction(props.children) ? props.children(layoutFlags) ?? null : props.children ?? null}
    </CommonWrapper>
  );
}

ResponsiveLayout.__KONTUR_REACT_UI__ = 'ResponsiveLayout';
ResponsiveLayout.displayName = 'ResponsiveLayout';
