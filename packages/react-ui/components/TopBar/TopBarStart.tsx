import React from 'react';
import cn from 'classnames';

import { CommonProps } from '../../typings/common';

import { jsStyles } from './TopBar.styles';

export type TopBarStartProps = CommonProps;

/**
 * Контейнер для сдвига к началу
 *
 * @visibleName TopBar.Start
 */

export const TopBarStart: React.FC<TopBarStartProps> = ({ className, children, ...rest }) => (
  <div className={cn(className, jsStyles.startItems())} {...rest}>
    {children}
  </div>
);
(TopBarStart as any).__KONTUR_REACT_UI__ = 'TopBarStart';
