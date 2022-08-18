import React, { useEffect } from 'react';
import propTypes from 'prop-types';

import { isFunction } from '../../lib/utils';
import { CommonWrapper } from '../../internal/CommonWrapper';

import { EmptyObject, MediaQueriesType, ResponsiveLayoutFlags } from './types';
import { useResponsiveLayout } from './useResponsiveLayout';

interface ResponsiveLayoutProps<T extends MediaQueriesType> {
  onLayoutChange?: (layout: ResponsiveLayoutFlags<T>) => void;
  children?: React.ReactNode | ((currentLayout: ResponsiveLayoutFlags<T>) => React.ReactNode);
  customMediaQueries?: T;
}

/**
 * Компонент для определения текущего лэйаута.
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

ResponsiveLayout.propTypes = {
  onLayoutChange: propTypes.func,
  children: propTypes.oneOfType([propTypes.node, propTypes.func]),
};
