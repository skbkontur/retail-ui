import React, { ReactNode, useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';

import { jsStyles } from './SidePage.styles';

export interface SidePageContainerProps {
  children?: ReactNode;
}

/**
 * Контейнер с отступами
 *
 * @visibleName SidePage.Container
 */
const SidePageContainer = ({ children }: SidePageContainerProps) => {
  const theme = useContext(ThemeContext);
  return <div className={jsStyles.bodyContainer(theme)}>{children}</div>;
};

export { SidePageContainer };
