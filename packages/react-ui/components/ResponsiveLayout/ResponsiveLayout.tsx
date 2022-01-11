import React, { useEffect } from 'react';

import { isFunction } from '../../lib/utils';
import { CommonWrapper } from '../../internal/CommonWrapper';

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

  return (
    <CommonWrapper {...props}>
      {isFunction(props.children) ? props.children(layoutFlags) ?? null : props.children ?? null}
    </CommonWrapper>
  );
};
