import React, { useEffect } from 'react';
import propTypes from 'prop-types';

import { isFunction } from '../../lib/utils';
import { CommonWrapper } from '../../internal/CommonWrapper';

import { MediaQueriesType, ResponsiveLayoutFlags } from './types';
import { useResponsiveLayout } from './useResponsiveLayout';

interface ResponsiveLayoutProps<T extends Record<string, string>> {
  onLayoutChange?: (layout: ResponsiveLayoutFlags<T>) => void;
  children?: React.ReactNode | ((currentLayout: ResponsiveLayoutFlags<T>) => React.ReactNode);
  customMediaQueries?: MediaQueriesType;
}

/**
 * Компонент для определения текущего лэйаута.
 */

export function ResponsiveLayout<T extends Record<string, string>>(props: ResponsiveLayoutProps<T>) {
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
