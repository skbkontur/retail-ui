import React, { useEffect } from 'react';

import { isFunction } from '../../lib/utils';

import { ResponsiveLayoutFlags } from './types';
import { useResponsiveLayout } from './useResponsiveLayout';

interface ResponsiveLayoutProps {
  onLayoutChange?: (layout: ResponsiveLayoutFlags) => void;
  children?: React.ReactNode | ((currentLayout: ResponsiveLayoutFlags) => React.ReactNode);
}

/**
 * Компонент для определения текущего лэйаута (мобильный или нет).
 */

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = (props) => {
  const layoutFlags = useResponsiveLayout();

  useEffect(() => {
    if (props.onLayoutChange) {
      props.onLayoutChange(layoutFlags);
    }
  }, [layoutFlags]);

  if (isFunction(props.children)) {
    return (props.children(layoutFlags) ?? null) as React.ReactElement;
  }

  return (props.children ?? null) as React.ReactElement;
};
